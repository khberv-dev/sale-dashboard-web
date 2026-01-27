import { Avatar, Label, Progress, Table, Text } from '@gravity-ui/uikit'
import { formatNumber } from '@/utils/formatter.js'
import { getAvatarUrl } from '@/utils/url-resolver.js'

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
            return <Avatar
                text={ item.firstName }
                imgUrl={ getAvatarUrl(item.avatar) }
            />
        },
        width: 30
    },
    {
        id: 'fullName',
        name: 'Ism',
        width: 120,
        template: (item) => <>
            <div>{ item.firstName }</div>
            <div>{ item.lastName }</div>
        </>
    },
    {
        id: 'sale',
        name: 'Sotuv',
        width: 60,
        template: (item) => <Text
            color={ item.sale < 20000000 ? 'danger' : 'positive' }>{ formatNumber(item.sale) + " so'm" }</Text>
    },
    {
        id: 'conversion',
        name: 'Konversiya',
        width: 60,
        template: (item) => item.leadCount > 0 ?
            <Label theme={ 'info' }>{ (item.saleCount / item.leadCount * 100).toFixed(2) + '%' }</Label> : '-'
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

            return <div>
                <Progress
                    theme={ isPlanCompleted ? 'success' : 'info' }
                    loading={ !isPlanCompleted }
                    text={ item.plan > 0 ? progress.toFixed(2) + '%' : 'Plan belgilanmagan' }
                    value={ progress }/>
                {/*{ !isPlanCompleted ? <Text>{ formatNumber(item.plan - item.sale) } qoldi</Text> : '' }*/ }
            </div>
        }
    }
]

function ManagersResultTable({ data }) {
    const sortedData = data.sort((a, b) => b.sale - a.sale)

    return (
        <Table
            width={ 'max' }
            data={ sortedData }
            columns={ columns }/>
    )
}

export default ManagersResultTable