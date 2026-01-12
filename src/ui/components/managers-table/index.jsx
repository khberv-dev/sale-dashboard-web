import { Avatar, Icon, Label, Table, withTableActions } from '@gravity-ui/uikit'
import { formatDate } from '@/utils/formatter.js'
import { Pencil } from '@gravity-ui/icons'
import { getAvatarUrl } from '@/utils/url-resolver.js'

const columns = [
    {
        id: 'index',
        name: '#',
        template: (_, index) => (index + 1).toString(),
        width: 40
    },
    {
        id: 'avatar',
        name: '',
        template: (item) => {
            return <Avatar
                text={ item.firstName + ' ' + (item.lastName ? item.lastName : '') }
                imgUrl={ getAvatarUrl(item.avatar) }
            />
        },
        width: 40
    },
    {
        id: 'firstName',
        name: 'Ism'
    },
    {
        id: 'lastName',
        name: 'Familiya'
    },
    {
        id: 'username',
        name: 'Login'
    },
    {
        id: 'status',
        name: 'Status',
        template: (item) => {
            return item.isActive ? <Label theme={ 'success' }>Faol</Label> : <Label theme={ 'danger' }>Nofaol</Label>
        }
    },
    {
        id: 'createdAt',
        name: "Yaratilgan vaqt",
        template: (item) => formatDate(item.createdAt)
    }
]

const TableWithActions = withTableActions(Table)

function ManagersTable({ data, onItemEdit }) {
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

export default ManagersTable