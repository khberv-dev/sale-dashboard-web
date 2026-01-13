import { Avatar, Label, Table, Text } from '@gravity-ui/uikit'
import { formatNumber } from '@/utils/formatter.js'

const columns = [
    {
        id: 'index',
        name: '',
        width: 40,
        template: (item, index) => (index + 1).toString()
    },
    {
        id: 'avatar',
        name: '',
        template: item => {
            return <Avatar text={ item.firstName }/>
        },
        width: 40
    },
    {
        id: 'fullName',
        name: 'Ism',
        template: item => item.firstName + ' ' + (item.lastName ? item.lastName : '')
    },
    {
        id: 'sale',
        name: 'Sotuv',
        template: item => <Text
            color={ item.sale < 20000000 ? 'danger' : 'positive' }>{ formatNumber(item.sale) + " so'm" }</Text>
    },
    {
        id: 'salary',
        name: 'Maosh',
        template: item => <Label theme={ 'success' }>{ formatNumber(item.salary) + " so'm" }</Label>
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