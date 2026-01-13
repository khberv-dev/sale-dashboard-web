import st from './main.module.scss'
import TotalSaleCard from '@/ui/components/total-sale-card/index.jsx'
import TopManagersCard from '@/ui/components/top-managers-card/index.jsx'
import ManagersResultTable from '@/ui/components/managers-result-table/index.jsx'
import { useGetSaleStatsQuery } from '@/services/sale/query.js'
import { Spin } from '@gravity-ui/uikit'
import useSocket from '@/services/socket.js'
import { useEffect, useState } from 'react'
import NewSaleDialog from '@/ui/layouts/new-sale-dialog/index.jsx'
import DailySaleChart from '@/ui/components/daily-sale-chart/index.jsx'
import MonthlySaleChart from '@/ui/components/monthly-sale-chart/index.jsx'
import FloatingButton from '@/ui/components/floating-button/index.jsx'
import { VolumeFill, VolumeSlashFill } from '@gravity-ui/icons'

function HomePage() {
    const { data: saleStats, isLoading } = useGetSaleStatsQuery()
    const socket = useSocket()
    const [newSaleData, setNewSaleData] = useState(null)
    const [isSoundEnable, setIsSoundEnable] = useState(false)

    useEffect(() => {
        const queueAudio = new Audio('src/assets/queue.mp3')

        if (!socket) {
            return
        }

        socket.on('new-sale', data => {
            if (isSoundEnable) {
                queueAudio.play()
            }
            setNewSaleData(data)

            setTimeout(() => {
                setNewSaleData(null)
            }, 5000)
        })

        return () => {
            socket.off('new-sale')
        }
    }, [socket])

    const onToggleSoundClick = () => {
        setIsSoundEnable(old => !old)
    }

    return (
        <div className={ st.container }>
            { isLoading ? <Spin/> :
                <>
                    <div className={ st.totalResultContainer }>
                        <TotalSaleCard
                            dailySale={ saleStats.dailyAmount }
                            totalSale={ saleStats.totalAmount }
                            dailyPlan={ 24000000 }
                            monthlySale={ 65000000 }
                            monthlyPlan={ 500000000 }/>
                        <TopManagersCard
                            topManagers={ saleStats.total }
                        />
                    </div>
                    <div className={ st.detailContainer }>
                        <div className={ st.managersResultContainer }>
                            <ManagersResultTable data={ saleStats.total }/>
                        </div>
                        <div className={ st.summaryContainer }>
                            <DailySaleChart saleData={ saleStats.dailyStats }/>
                            <MonthlySaleChart saleData={ saleStats.monthlyStats }/>
                        </div>
                    </div>
                    <FloatingButton
                        icon={ isSoundEnable ? VolumeFill : VolumeSlashFill }
                        onClick={ onToggleSoundClick }/>
                    <NewSaleDialog
                        saleData={ newSaleData }
                        open={ !!newSaleData }
                        onClose={ () => setNewSaleData(null) }
                    />
                </>
            }
        </div>
    )
}

export default HomePage