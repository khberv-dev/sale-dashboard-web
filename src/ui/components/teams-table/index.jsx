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
        <div style={ { border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' } }>
            <Table
                data={ data }
                columns={ columns }
                width={ 'max' }/>
        </div>
    )
}

export default TeamsTable