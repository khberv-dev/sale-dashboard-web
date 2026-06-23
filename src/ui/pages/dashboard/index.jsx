import st from './main.module.scss'
import AuthContextProvider from "@/providers/auth/index.jsx"
import { useGetSaleStatsQuery } from "@/services/sale/query.js"
import { Switch } from "@gravity-ui/uikit"
import { DashboardSkeleton } from '@/ui/components/skeleton/index.jsx'
import SummaryCard from "@/ui/pages/dashboard/elements/summary-card/index.jsx"
import { ClockIcon, DateIcon, HeartBeatIcon, PeopleIcon } from "@/ui/pages/dashboard/elements/icons.jsx"
import LineChart from "@/ui/pages/dashboard/elements/line-chart/index.jsx"
import dayjs from "dayjs"
import ManagersResult from "@/ui/pages/dashboard/elements/managers-result/index.jsx"
import NewSaleDialog from "@/ui/layouts/new-sale-dialog/index.jsx"
import { useEffect, useState } from "react"
import queueSound from "@/assets/queue.mp3"
import confetti from "canvas-confetti"
import useSocket from "@/services/socket.js"
import { useQueryClient } from "@tanstack/react-query"
import { RangeDatePicker } from "@gravity-ui/date-components"
import { dateTimeParse } from "@gravity-ui/date-utils"

function DashboardPage() {
    const [byTeam, setByTeam] = useState(false)
    const [dateRange, setDateRange] = useState(() => ({
        start: dateTimeParse(dayjs().startOf('month').format('YYYY-MM-DD')),
        end: dateTimeParse(dayjs().endOf('month').format('YYYY-MM-DD')),
    }))

    const startDate = dateRange.start?.format('YYYY-MM-DD') ?? null
    const endDate = dateRange.end?.format('YYYY-MM-DD') ?? null

    const { data: saleData, isLoading } = useGetSaleStatsQuery(byTeam, startDate, endDate)
    const dateTime = dayjs().format('DD MMM. YYYY - HH:mm')
    const [newSaleData, setNewSaleData] = useState(null)
    const socket = useSocket()
    const queryClient = useQueryClient()

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
    }, [socket, queryClient])

    if (isLoading) {
        return <DashboardSkeleton/>
    }

    return (
        <AuthContextProvider>
            <div className={ st.container }>
                <div className={ st.head }>
                    <div>
                        <div className={ st.title }>
                            Sotuv natijalari
                        </div>
                        <div className={ st.liveMonth }>
                            { dayjs().format('MMM YYYY') }
                        </div>
                    </div>
                    <div style={ { display: 'flex', alignItems: 'center', gap: '20px' } }>
                        <div style={ { color: '#ffffff' } }>
                            <span>Umumiy</span>
                            &nbsp;
                            <Switch
                                checked={ byTeam }
                                onUpdate={ setByTeam }/>
                            &nbsp;
                            <span>Jamoa</span>
                        </div>
                        <div className={ st.liveDateTime }>
                            { dateTime }
                        </div>
                    </div>
                </div>
                <div className={ st.summary }>
                    <SummaryCard
                        icon={ ClockIcon }
                        headTitle={ 'BUGUNGI SOTUV' }
                        summary={ saleData.dailyAmount }
                        headlineColor={ '#4f8ef7' }
                        flex={ 1 }/>
                    <SummaryCard
                        icon={ DateIcon }
                        headTitle={ 'OYLIK SOTUV' }
                        summary={ saleData.totalAmount }
                        headlineColor={ '#2dd4bf' }
                        flex={ 1 }
                        subSummary={ saleData.totalSaleAmount }
                        subTitle={ 'Qayta sotuv' }/>
                    <SummaryCard
                        icon={ HeartBeatIcon }
                        headTitle={ 'OYLIK PLAN' }
                        summary={ saleData.monthPlan }
                        headlineColor={ '#f97316' }
                        currentProgress={ saleData.totalAmount }
                        progressLimit={ saleData.monthPlan }
                        remainingLimit={ dayjs().endOf('month').diff(dayjs(), 'day') }
                        flex={ 1 }/>
                    <SummaryCard
                        icon={ PeopleIcon }
                        headTitle={ 'TOP SOTUVCHILAR' }
                        managerList={ saleData.total.slice(0, 3) }
                        width={ 350 }
                    />
                </div>

                <div className={ st.charts }>
                    <div className={ st.chart }>
                        <LineChart
                            saleData={ saleData.dailyStats }
                            color={ '#4f8ef7' }/>
                    </div>
                    <div className={ st.chart }>
                        <LineChart
                            saleData={ saleData.monthlyStats }
                            color={ '#2dd4bf' }/>
                    </div>
                </div>
                <div className={ st.filterRow }>
                    <span className={ st.filterLabel }>Muddat:</span>
                    <RangeDatePicker
                        value={ dateRange }
                        onUpdate={ setDateRange }
                        format="DD MMM YYYY"
                        size="m"
                        pin="round-round"
                    />
                </div>

                <ManagersResult
                    total={ saleData.total }/>
            </div>

            <NewSaleDialog
                saleData={ newSaleData }
                open={ !!newSaleData }
                onClose={ () => setNewSaleData(null) }
            />
        </AuthContextProvider>
    )
}

export default DashboardPage
