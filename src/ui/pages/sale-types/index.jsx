import { useGetSaleTypesQuery } from '@/services/sale/query.js'
import { useState } from 'react'
import st from '@/ui/pages/sales/main.module.scss'
import { Spin } from '@gravity-ui/uikit'
import FloatingButton from '@/ui/components/floating-button/index.jsx'
import { Plus } from '@gravity-ui/icons'
import SaleTypesTable from '@/ui/components/sale-types-table/index.jsx'
import CreateSaleTypeDialog from '@/ui/layouts/create-sale-type-dialog/index.jsx'

function SaleTypesPage() {
    const { data: saleTypes, isLoading } = useGetSaleTypesQuery()
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const onCreateSaleClick = () => {
        setIsDialogOpen(true)
    }

    return (
        <div className={ st.container }>
            { isLoading ? <Spin/> :
                <>
                    <div className={ st.salesList }>
                        <SaleTypesTable data={ saleTypes }/>
                    </div>
                    <FloatingButton
                        icon={ Plus }
                        onClick={ onCreateSaleClick }/>
                    <CreateSaleTypeDialog
                        open={ isDialogOpen }
                        onClose={ () => setIsDialogOpen(false) }/>
                </>
            }
        </div>
    )
}

export default SaleTypesPage