import { Icon, Table, withTableActions } from '@gravity-ui/uikit'
import { formatDate, formatNumber } from '@/utils/formatter.js'
import { TrashBin } from '@gravity-ui/icons'

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

const TableWithActions = withTableActions(Table)

function SalesTable({ data, onItemDelete }) {
    const actions = (item) => [
        {
            text: "O'chirish",
            icon: <Icon data={ TrashBin }/>,
            theme: 'danger',
            handler: () => {
                onItemDelete(item.id)
            }
        }
    ]

    const rowDescriptor = () => ({
        interactive: true
    })

    return (
        <TableWithActions
            width={ 'max' }
            data={ data }
            columns={ columns }
            getRowActions={ actions }
            getRowDescriptor={ rowDescriptor }/>
    )
}

export default SalesTable