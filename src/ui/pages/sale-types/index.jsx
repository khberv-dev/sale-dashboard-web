import { useGetSaleTypesQuery } from '@/services/sale/query.js'
import { useState } from 'react'
import st from '@/ui/pages/sales/main.module.scss'
import { Spin } from '@gravity-ui/uikit'
import FloatingButton from '@/ui/components/floating-button/index.jsx'
import { Plus } from '@gravity-ui/icons'
import SaleTypesTable from '@/ui/components/sale-types-table/index.jsx'
import CreateSaleTypeDialog from '@/ui/layouts/create-sale-type-dialog/index.jsx'
import EditSaleTypeDialog from '@/ui/layouts/edit-sale-type-dialog/index.jsx'

function SaleTypesPage() {
    const { data: saleTypes, isLoading } = useGetSaleTypesQuery()
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [saleTypeToEdit, setSaleTypeToEdit] = useState(null)

    const onCreateSaleTypeClick = () => {
        setIsDialogOpen(true)
    }

    const handleItemEdit = (saleType) => {
        setSaleTypeToEdit(saleType)
    }

    return (
        <div className={ st.container }>
            { isLoading ? <Spin/> :
                <>
                    <div className={ st.salesList }>
                        <SaleTypesTable
                            data={ saleTypes }
                            onItemEdit={ handleItemEdit }/>
                    </div>
                    <FloatingButton
                        icon={ Plus }
                        onClick={ onCreateSaleTypeClick }/>
                    <CreateSaleTypeDialog
                        open={ isDialogOpen }
                        onClose={ () => setIsDialogOpen(false) }/>
                    <EditSaleTypeDialog
                        saleType={ saleTypeToEdit }
                        open={ !!saleTypeToEdit }
                        onClose={ () => setSaleTypeToEdit(null) }
                    />
                </>
            }
        </div>
    )
}

export default SaleTypesPage