import st from './main.module.scss'
import { Card } from '@gravity-ui/uikit'
import TopManagerItem from '@/ui/components/top-managers-card/top-manager-item.jsx'

function TopManagersCard({ data }) {
    const sortedFilteredData = data.sort((a, b) => b.sale - a.sale).slice(0, 3)

    return (
        <Card className={ st.card }>
            <div className={ st.resultContainer }>
                { sortedFilteredData.map((manager, index) =>
                    <TopManagerItem
                        key={ index }
                        colorIndex={ index }
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