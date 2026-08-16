import { Icon, Label, Table, withTableActions } from '@gravity-ui/uikit'
import { GraduationCap, PaperPlane } from '@gravity-ui/icons'

const columns = [
    {
        id: 'index',
        name: '',
        width: 30,
        template: (item, index) => (index + 1).toString()
    },
    {
        id: 'studentName',
        name: 'Talaba',
        template: (item) => item.firstName + ' ' + (item.lastName ? item.lastName : '')
    },
    {
        id: 'phoneNumber',
        name: 'Telefon raqami'
    },
    {
        id: 'level',
        name: 'Daraja',
        template: (item) => item.level ? <Label theme={ 'info' }>{ item.level }</Label> : ''
    }
]

const TableWithActions = withTableActions(Table)

function StudentsTable({ data, onItemEnroll, onItemRequest }) {
    const actions = (item) => [
        {
            text: 'Kursga yozish',
            icon: <Icon data={ GraduationCap }/>,
            handler: () => {
                onItemEnroll(item)
            }
        },
        {
            text: "So'rov yuborish",
            icon: <Icon data={ PaperPlane }/>,
            handler: () => {
                onItemRequest(item)
            }
        }
    ]

    return (
        <div style={ { border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' } }>
            <TableWithActions
                width={ 'max' }
                data={ data }
                columns={ columns }
                getRowActions={ actions }/>
        </div>
    )
}

export default StudentsTable
