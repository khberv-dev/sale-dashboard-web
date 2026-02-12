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
import queueSound from '@/assets/queue.mp3'
import confetti from 'canvas-confetti'
import { useQueryClient } from "@tanstack/react-query";

function HomePage() {
    const queryClient = useQueryClient()
    const { data: saleData, isLoading } = useGetSaleStatsQuery()
    const socket = useSocket()
    const [newSaleData, setNewSaleData] = useState(null)
    const [isSoundEnable, setIsSoundEnable] = useState(false)

    useEffect(() => {
        const queueAudio = new Audio(queueSound)

        if (!socket) {
            return
        }

        socket.on('new-sale', data => {
            queueAudio.play()
            setNewSaleData(data)

            if (data.is100MPassed) {
                confetti({
                    particleCount: 450,
                    spread: 180,
                    origin: { y: 0.2 }
                })
            }

            setTimeout(() => {
                setNewSaleData(null)
                queryClient.invalidateQueries({ queryKey: ['sale-stats'] })
            }, 5000)
        })

        return () => {
            socket.off('new-sale')
        }
    }, [socket, isSoundEnable, queryClient])

    const onToggleSoundClick = () => {
        setIsSoundEnable(true)
    }

    return (
        <div className={ st.container }>
            { isLoading ? <Spin/> :
                <>
                    <div className={ st.totalResultContainer }>
                        <TotalSaleCard
                            dailySale={ saleData.dailyAmount }
                            totalSale={ saleData.totalAmount }
                            monthlySale={ saleData.totalAmount }
                            monthPlan={ saleData.monthPlan }
                            saleRate={ saleData.saleRate }/>
                        <TopManagersCard
                            data={ saleData.total }
                        />
                    </div>
                    <div className={ st.detailContainer }>
                        <div className={ st.managersResultContainer }>
                            <ManagersResultTable data={ saleData.total }/>
                        </div>
                        <div className={ st.summaryContainer }>
                            <DailySaleChart saleData={ saleData.dailyStats }/>
                            <MonthlySaleChart saleData={ saleData.monthlyStats }/>
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