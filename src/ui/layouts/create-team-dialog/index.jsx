import { useForm } from "react-hook-form"
import st from "@/ui/layouts/edit-manager-dialog/main.module.scss"
import { Button, Dialog, TextInput } from "@gravity-ui/uikit"
import { useEffect } from "react"
import { useCreateTeam } from "@/services/team/query.js"

function CreateTeamDialog({ open, onClose }) {
    const { register, handleSubmit, reset } = useForm()
    const createTeam = useCreateTeam()

    const onSubmit = async (data) => {
        await createTeam.mutateAsync(data)
        onClose()
    }

    useEffect(() => {
        reset()
    }, [open])

    return (
        <Dialog size={ 'm' } open={ open } onClose={ onClose }>
            <Dialog.Header caption={ 'Yangi guruh' }/>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <Dialog.Body className={ st.formBody }>
                    <TextInput
                        placeholder={ 'Nomi' }
                        { ...register('name', { required: true }) }
                    />
                </Dialog.Body>
                <Dialog.Footer>
                    <Button
                        loading={ createTeam.isPending }
                        view={ 'action' }
                        type={ 'submit' }>Saqlash</Button>
                </Dialog.Footer>
            </form>
        </Dialog>
    )
}

export default CreateTeamDialog