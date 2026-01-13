import { Avatar, Table } from '@gravity-ui/uikit'
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
        template: item => formatNumber(item.sale) + " so'm"
    },
    {
        id: 'salary',
        name: 'Maosh',
        template: item => formatNumber(item.salary) + " so'm"
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