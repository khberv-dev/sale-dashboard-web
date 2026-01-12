import st from './main.module.scss'
import { Card, Text } from '@gravity-ui/uikit'
import { formatNumber } from '@/utils/formatter.js'

function TotalSaleCard({ dailySale, totalSale, monthlySale, dailyPlan, monthlyPlan }) {
    return (
        <Card className={ st.card }>
            <div>
                <Text variant={ 'header-1' }>Bugun: </Text>
                &nbsp;&nbsp;&nbsp;
                <Text variant={ 'header-1' } color={ 'positive' }>{ formatNumber(dailySale) } so'm</Text>
            </div>
            <div>
                <Text variant={ 'body-2' }>Umumiy: </Text>
                &nbsp;&nbsp;
                <Text variant={ 'body-2' } color={ 'positive' }>{ formatNumber(totalSale) } so'm</Text>
            </div>
            {/*<div className={ st.progressContainer }>*/ }
            {/*    <Label>{ formatNumber(dailySale) }/kuniga</Label>*/ }
            {/*    <Label>Oylik { Math.floor(monthlySale / monthlyPlan * 100) }% bajarildi</Label>*/ }
            {/*</div>*/ }
        </Card>
    )
}

export default TotalSaleCard