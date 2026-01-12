import { Table } from '@gravity-ui/uikit'
import { formatDate, formatNumber } from '@/utils/formatter.js'

const columns = [
    {
        id: 'index',
        name: '',
        width: 30,
        template: (item, index) => (index + 1).toString()
    },
    {
        id: 'managerName',
        name: 'Sotuvchi',
        template: (item) => item.firstName + ' ' + (item.lastName ? item.lastName : '')
    },
    {
        id: 'saleAmount',
        name: 'Summa',
        template: (item) => formatNumber(item.amount) + " so'm"
    },
    {
        id: 'saleType',
        name: 'Sotuv turi'
    },
    {
        id: 'saleAt',
        name: 'Sotuv vaqti',
        template: (item) => formatDate(item.saleAt)
    }
]

function SalesTable({ data }) {
    return (
        <Table
            width={ 'max' }
            data={ data }
            columns={ columns }/>
    )
}

export default SalesTable