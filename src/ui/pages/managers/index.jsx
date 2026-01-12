import st from './main.module.scss'
import { useGetAllManagersQuery } from '@/services/manager/query.js'
import { Spin } from '@gravity-ui/uikit'
import ManagersTable from '@/ui/components/managers-table/index.jsx'
import EditManagerDialog from '@/ui/layouts/edit-manager-dialog/index.jsx'
import { useState } from 'react'

function ManagersPage() {
    const managers = useGetAllManagersQuery()
    const [managerToEdit, setManagerToEdit] = useState(null)

    const onEditManagerClick = (manager) => {
        setManagerToEdit(manager)
    }

    return (
        <div className={ st.container }>
            { managers.isLoading ? <Spin/> :
                <>
                    <ManagersTable
                        data={ managers.data }
                        onItemEdit={ onEditManagerClick }
                    />
                    <EditManagerDialog
                        open={ !!managerToEdit }
                        onClose={ () => setManagerToEdit(null) }
                        manager={ managerToEdit }/>
                </>
            }
        </div>
    )
}

export default ManagersPage