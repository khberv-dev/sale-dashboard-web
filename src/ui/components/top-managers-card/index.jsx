import st from './main.module.scss'
import { Button, Card, Label } from '@gravity-ui/uikit'
import TopManagerItem from '@/ui/components/top-managers-card/top-manager-item.jsx'
import { useNavigate } from "react-router-dom"

function TopManagersCard({ data }) {
    const navigate = useNavigate()
    const sortedFilteredData = data.sort((a, b) => b.sale - a.sale)
        .filter((manager, index) => index < 3)

    const onNewDashboardClick = () => {
        navigate('dashboard')
    }

    return (
        <Card className={ st.card }>
            <div className={ st.top3Label }>
                <Label size={ 'm' }>TOP 3 SOTUVCHI</Label>
                <Button view={ 'action' } onClick={ onNewDashboardClick }>NEW</Button>
            </div>
            <div className={ st.resultContainer }>
                { sortedFilteredData.map((manager, index) =>
                    <TopManagerItem
                        key={ index }
                        firstName={ manager.firstName }
                        lastName={ manager.lastName ? manager.lastName : '' }
                        sale={ manager.sale }
                        avatar={ manager.avatar }/>
                ) }
            </div>
        </Card>
    )
}

export default TopManagersCard