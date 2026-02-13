import st from './main.module.scss'
import { useGetAllManagersQuery } from '@/services/manager/query.js'
import { Spin } from '@gravity-ui/uikit'
import ManagersTable from '@/ui/components/managers-table/index.jsx'
import EditManagerDialog from '@/ui/layouts/edit-manager-dialog/index.jsx'
import { useState } from 'react'
import CreateManagerDialog from '@/ui/layouts/create-manager-dialog/index.jsx'
import { Plus } from '@gravity-ui/icons'
import FloatingButton from '@/ui/components/floating-button/index.jsx'
import AddCallDialog from "@/ui/layouts/add-call-dialog/index.jsx";

function ManagersPage() {
    const managers = useGetAllManagersQuery()
    const [managerToEdit, setManagerToEdit] = useState(null)
    const [isCreateManagerDialogOpen, setIsCreateManagerDialogOpen] = useState(false)
    const [isEditManagerDialogOpen, setIsEditManagerDialogOpen] = useState(false)
    const [isAddCallDialogOpen, setIsAddCallDialogOpen] = useState(false)

    const onEditManagerClick = (manager) => {
        setManagerToEdit(manager)
        setIsEditManagerDialogOpen(true)
    }

    const onCreateManagerClick = () => {
        setIsCreateManagerDialogOpen(true)
    }

    const onAddCallClick = (manager) => {
        setIsAddCallDialogOpen(true)
        setManagerToEdit(manager)
    }

    return (
        <div className={ st.container }>
            { managers.isLoading ? <Spin/> :
                <>
                    <ManagersTable
                        data={ managers.data }
                        onItemEdit={ onEditManagerClick }
                        onAddCall={ onAddCallClick }
                    />
                    <FloatingButton
                        icon={ Plus }
                        onClick={ onCreateManagerClick }/>
                    <EditManagerDialog
                        open={ isEditManagerDialogOpen }
                        onClose={ () => setIsEditManagerDialogOpen(false) }
                        manager={ managerToEdit }/>
                    <CreateManagerDialog
                        open={ isCreateManagerDialogOpen }
                        onClose={ () => setIsCreateManagerDialogOpen(false) }
                    />
                    <AddCallDialog
                        open={ isAddCallDialogOpen }
                        onClose={ () => setIsAddCallDialogOpen(false) }
                        manager={ managerToEdit }/>
                </>
            }
        </div>
    )
}

export default ManagersPage