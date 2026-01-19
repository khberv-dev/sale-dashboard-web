import st from './main.module.scss'
import { Card, Label, Text } from '@gravity-ui/uikit'
import { formatNumber } from '@/utils/formatter.js'

function TotalSaleCard({ dailySale, totalSale, monthlySale, dailyPlan, monthPlan }) {
    return (
        <Card className={ st.card }>
            <div>
                <Text variant={ 'header-1' }>Bugun: </Text>
                &nbsp;&nbsp;&nbsp;
                <Text variant={ 'header-1' } color={ 'positive' }>{ formatNumber(dailySale) } so'm</Text>
            </div>
            <div>
                <div>
                    <Text variant={ 'subheader-1' }>Umumiy: </Text>
                    <br/>
                    <Text variant={ 'header-2' } color={ 'positive' }>{ formatNumber(totalSale) } so'm</Text>
                </div>
                <div className={ st.planContainer }>
                    <Text variant={ 'subheader-1' } color={ 'info' }>Maqsad: </Text>
                    <Text variant={ 'subheader-1' } color={ 'positive-heavy' }>{ formatNumber(monthPlan) } so'm</Text>
                </div>
            </div>
            <div className={ st.progressContainer }>
                <Label>{ (monthPlan / 30 / 1_000_000).toFixed(2) } mln/kuniga</Label>
                <Label>Plan { Math.floor(monthlySale / monthPlan * 100) }% bajarildi</Label>
            </div>
        </Card>
    )
}

export default TotalSaleCard