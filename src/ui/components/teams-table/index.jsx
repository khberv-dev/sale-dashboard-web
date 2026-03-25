import { formatDate } from "@/utils/formatter.js"
import { Table } from "@gravity-ui/uikit"

const columns = [
    {
        id: 'index',
        name: '',
        template: (item, index) => (index + 1).toString()
    },
    {
        id: 'name',
        name: 'Nomi'
    },
    {
        id: 'memberCount',
        name: 'Sotuvchilar',
        template: (item) => item.members.length
    },
    {
        id: 'date',
        name: 'Sana',
        template: (item) => formatDate(item.createdAt)
    }
]

function TeamsTable({ data }) {
    return (
        <Table
            data={ data }
            columns={ columns }
            width={ 'max' }/>
    )
}

export default TeamsTable