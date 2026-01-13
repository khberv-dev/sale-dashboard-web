import { Avatar, Icon, Label, Table, withTableActions } from '@gravity-ui/uikit'
import { formatDate, formatNumber } from '@/utils/formatter.js'
import { TrashBin } from '@gravity-ui/icons'
import { getAvatarUrl } from '@/utils/url-resolver.js'

const columns = [
    {
        id: 'index',
        name: '',
        width: 30,
        template: (item, index) => (index + 1).toString()
    },
    {
        id: 'managerAvatar',
        name: '',
        width: 20,
        template: (item) => <Avatar
            text={ item.firstName }
            imgUrl={ getAvatarUrl(item.avatar) }/>
    },
    {
        id: 'managerName',
        name: 'Sotuvchi',
        template: (item) => item.firstName + ' ' + (item.lastName ? item.lastName : '')
    },
    {
        id: 'saleAmount',
        name: 'Summa',
        template: (item) => <Label theme={ 'success' }>{ formatNumber(item.amount) + " so'm" }</Label>
    },
    {
        id: 'saleType',
        name: 'Sotuv turi',
        template: (item) => <Label theme={ 'info' }>{ item.saleType }</Label>
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