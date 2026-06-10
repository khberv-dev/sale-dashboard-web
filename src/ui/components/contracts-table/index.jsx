import { Table } from '@gravity-ui/uikit'
import { formatDate } from '@/utils/formatter.js'

const columns = [
    {
        id: 'index',
        name: '',
        template: (item, index) => (index + 1).toString()
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
        id: 'phoneNumber',
        name: 'Telefon raqam'
    },
    {
        id: 'date',
        name: 'Sana',
        template: (item) => formatDate(item.createdAt)
    }
]

function ContractsTable({ data }) {
    return (
        <div style={ { border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' } }>
            <Table
                data={ data }
                columns={ columns }
                width={ 'max' }/>
        </div>
    )
}

export default ContractsTable