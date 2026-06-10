import { Avatar, Icon, Label, Table, withTableActions } from "@gravity-ui/uikit";
import { getAvatarUrl } from "@/utils/url-resolver.js";
import dayjs from "dayjs";
import { ArrowRightToSquare } from "@gravity-ui/icons";

const columns = [
    {
        id: 'index',
        name: '',
        template: (item, index) => index + 1,
        width: 30
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
        id: 'attendanceDateTime',
        name: 'Vaqti',
        template: (item) => item.attendanceDate ? dayjs(item.attendanceDate).format('HH:mm DD-MM-YYYY') :
            <Label theme={ 'warning' }>Kelmagan</Label>
    }
]

const AttendanceTable = withTableActions(Table)

function ManagerAttendanceTable({ data, onAttendanceRegisterClick }) {
    const actions = (item) => [
        {
            text: 'Keldi',
            icon: <Icon data={ ArrowRightToSquare }/>,
            handler: () => {
                onAttendanceRegisterClick(item.id)
            }
        }
    ]

    return (
        <div style={ { border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' } }>
            <AttendanceTable
                width={ "max" }
                data={ data }
                columns={ columns }
                getRowActions={ actions }/>
        </div>
    )
}

export default ManagerAttendanceTable