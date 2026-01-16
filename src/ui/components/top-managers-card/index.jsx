import st from './main.module.scss'
import { Card, Label } from '@gravity-ui/uikit'
import TopManagerItem from '@/ui/components/top-managers-card/top-manager-item.jsx'

function TopManagersCard({ data }) {
    const sortedFilteredData = data.sort((a, b) => b.sale - a.sale)
        .filter((manager, index) => index < 3)

    return (
        <Card className={ st.card }>
            <div>
                <Label size={ 'm' }>TOP 3 SOTUVCHI</Label>
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