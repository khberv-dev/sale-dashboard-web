import { Icon, Label, Table, withTableActions } from '@gravity-ui/uikit'
import { formatDate } from '@/utils/formatter.js'
import { Pencil } from '@gravity-ui/icons'

const columns = [
    {
        id: 'index',
        name: '',
        width: 30,
        template: (item, index) => (index + 1).toString()
    },
    {
        id: 'name',
        name: 'Nomi'
    },
    {
        id: 'status',
        name: 'Status',
        template: item => {
            return item.isActive ?
                <Label theme={ 'success' }>Faol</Label> :
                <Label theme={ 'danger' }>Nofaol</Label>
        }
    },
    {
        id: 'created_at',
        name: "Qo'shilgan vaqti",
        template: item => formatDate(item.createdAt)
    }
]

const TableWithActions = withTableActions(Table)

function SaleTypesTable({ data, onItemEdit }) {
    const actions = (item) => [
        {
            text: 'Tahrirlash',
            icon: <Icon data={ Pencil }/>,
            handler: () => {
                onItemEdit(item)
            }
        }
    ]

    return (
        <TableWithActions
            width={ 'max' }
            data={ data }
            columns={ columns }
            getRowActions={ actions }/>
    )
}

export default SaleTypesTable