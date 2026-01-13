import st from './main.module.scss'
import { useDeleteSaleMutation, useGetSalesQuery } from '@/services/sale/query.js'
import { Pagination, Spin } from '@gravity-ui/uikit'
import SalesTable from '@/ui/components/sales-table/index.jsx'
import FloatingButton from '@/ui/components/floating-button/index.jsx'
import { Plus } from '@gravity-ui/icons'
import CreateSaleDialog from '@/ui/layouts/create-sale-dialog/index.jsx'
import { useState } from 'react'

function SalesPage() {
    const [page, setPage] = useState(1)
    const { data: sales, isLoading } = useGetSalesQuery({ page })
    const deleteSale = useDeleteSaleMutation()
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const onCreateSaleClick = () => {
        setIsDialogOpen(true)
    }

    const handleDeleteSale = (id) => {
        deleteSale.mutate({ id })
    }

    const handlePaginationUpdate = (page) => {
        setPage(page)
    }

    return (
        <div className={ st.container }>
            { isLoading ? <Spin/> :
                <>
                    <div className={ st.salesList }>
                        <SalesTable
                            data={ sales.data }
                            onItemDelete={ handleDeleteSale }/>
                    </div>
                    <div className={ st.paginationContainer }>
                        <Pagination
                            page={ page }
                            pageSize={ sales.pageSize }
                            total={ sales.count }
                            onUpdate={ handlePaginationUpdate }/>
                    </div>
                    <FloatingButton
                        icon={ Plus }
                        onClick={ onCreateSaleClick }/>
                    <CreateSaleDialog
                        open={ isDialogOpen }
                        onClose={ () => setIsDialogOpen(false) }/>
                </>
            }
        </div>
    )
}

export default SalesPage