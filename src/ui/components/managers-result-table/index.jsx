import { Avatar, Label, Progress, Table, Text } from '@gravity-ui/uikit'
import { formatNumber } from '@/utils/formatter.js'

const columns = [
    {
        id: 'index',
        name: '',
        width: 20,
        template: (item, index) => (index + 1).toString()
    },
    {
        id: 'avatar',
        name: '',
        template: (item) => {
            return <Avatar text={ item.firstName }/>
        },
        width: 30
    },
    {
        id: 'fullName',
        name: 'Ism',
        width: 200,
        template: (item) => item.firstName + ' ' + (item.lastName ? item.lastName : '')
    },
    {
        id: 'sale',
        name: 'Sotuv',
        width: 60,
        template: (item) => <Text
            color={ item.sale < 20000000 ? 'danger' : 'positive' }>{ formatNumber(item.sale) + " so'm" }</Text>
    },
    {
        id: 'plan',
        name: 'Plan',
        width: 60,
        template: (item) => Number(item.plan) / 1_000_000 + " mln so'm"
    },
    {
        id: 'salary',
        name: 'Maosh',
        width: 60,
        template: (item) => <Label theme={ 'success' }>{ formatNumber(item.salary) + " so'm" }</Label>
    },
    {
        id: 'progress',
        name: '',
        template: (item) => {
            const progress = item.sale / item.plan * 100
            const isPlanCompleted = progress >= 100

            return <Progress
                theme={ isPlanCompleted ? 'success' : 'info' }
                loading={ !isPlanCompleted }
                value={ progress }/>
        }
    }
]

function ManagersResultTable({ data }) {
    return (
        <Table
            width={ 'max' }
            data={ data }
            columns={ columns }/>
    )
}

export default ManagersResultTable