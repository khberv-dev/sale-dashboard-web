import st from './main.module.scss'
import { useGetAllManagersQuery } from '@/services/manager/query.js'
import { Spin } from '@gravity-ui/uikit'
import ManagersTable from '@/ui/components/managers-table/index.jsx'
import EditManagerDialog from '@/ui/layouts/edit-manager-dialog/index.jsx'
import { useState } from 'react'
import CreateManagerDialog from '@/ui/layouts/create-manager-dialog/index.jsx'
import { Plus } from '@gravity-ui/icons'
import FloatingButton from '@/ui/components/floating-button/index.jsx'

function ManagersPage() {
    const managers = useGetAllManagersQuery()
    const [managerToEdit, setManagerToEdit] = useState(null)
    const [isCreateManagerDialogOpen, setIsCreateManagerDialogOpen] = useState(false)

    const onEditManagerClick = (manager) => {
        setManagerToEdit(manager)
    }

    const onCreateManagerClick = () => {
        setIsCreateManagerDialogOpen(true)
    }

    return (
        <div className={ st.container }>
            { managers.isLoading ? <Spin/> :
                <>
                    <ManagersTable
                        data={ managers.data }
                        onItemEdit={ onEditManagerClick }
                    />
                    <FloatingButton
                        icon={ Plus }
                        onClick={ onCreateManagerClick }/>
                    <EditManagerDialog
                        open={ !!managerToEdit }
                        onClose={ () => setManagerToEdit(null) }
                        manager={ managerToEdit }/>
                    <CreateManagerDialog
                        open={ isCreateManagerDialogOpen }
                        onClose={ () => setIsCreateManagerDialogOpen(false) }
                    />
                </>
            }
        </div>
    )
}

export default ManagersPage