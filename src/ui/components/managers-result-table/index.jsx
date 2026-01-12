import { Avatar, Table } from '@gravity-ui/uikit'
import { formatNumber } from '@/utils/formatter.js'

const columns = [
    {
        id: 'index',
        name: '',
        width: 40
    },
    {
        id: 'avatar',
        name: '',
        template: (item, index) => {
            return <Avatar text={ item.fullName }/>
        },
        width: 40
    },
    {
        id: 'fullName',
        name: 'Ism'
    },
    {
        id: 'sale',
        name: 'Sotuv',
        template: (item, index) => formatNumber(item.sale)
    }
]

function ManagersResultTable({ data }) {
    const tableData = data.map((manager, index) => {
        return {
            index: index + 1,
            fullName: manager.firstName + ' ' + (manager.lastName ? manager.lastName : ''),
            sale: manager.sale
        }
    })

    return (
        <Table
            width={ 'max' }
            data={ tableData }
            columns={ columns }/>
    )
}

export default ManagersResultTable