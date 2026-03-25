import st from './main.module.scss'
import TeamsTable from "@/ui/components/teams-table/index.jsx"
import { useGetTeams } from "@/services/team/query.js"
import { useState } from "react"
import CreateTeamDialog from "@/ui/layouts/create-team-dialog/index.jsx"
import { Plus } from "@gravity-ui/icons"
import FloatingButton from "@/ui/components/floating-button/index.jsx"

function TeamsPage() {
    const { data: teams } = useGetTeams()
    const [isDialogOpen, setIsDialogOpen] = useState(false)


    return (
        <div className={ st.container }>
            <TeamsTable
                data={ teams ?? [] }/>
            <CreateTeamDialog
                open={ isDialogOpen }
                onClose={ () => setIsDialogOpen(false) }/>
            <FloatingButton
                icon={ Plus }
                onClick={ () => setIsDialogOpen(true) }/>
        </div>
    )
}

export default TeamsPage