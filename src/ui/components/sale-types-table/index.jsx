import { Table } from '@gravity-ui/uikit'

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
    }
]

function SaleTypesTable({ data }) {
    return (
        <Table
            width={ 'max' }
            data={ data }
            columns={ columns }/>
    )
}

export default SaleTypesTable