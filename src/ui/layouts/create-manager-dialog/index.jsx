import { Button, Dialog, TextInput } from '@gravity-ui/uikit'
import st from '@/ui/layouts/edit-manager-dialog/main.module.scss'
import { useForm } from 'react-hook-form'
import { useCreateManagerMutation } from '@/services/manager/query.js'

function CreateManagerDialog({ open, onClose }) {
    const { register, handleSubmit, reset } = useForm()
    const createManager = useCreateManagerMutation()

    const onSubmit = async (data) => {
        await createManager.mutateAsync({ ...data })
        reset()
        onClose()
    }

    return (
        <Dialog size={ 'm' } open={ open } onClose={ onClose }>
            <Dialog.Header caption={ 'Yangi sotuv menejeri' }/>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <Dialog.Body className={ st.formBody }>
                    <TextInput
                        placeholder={ 'Ism' }
                        { ...register('firstName', { required: true }) }
                    />
                    <TextInput
                        placeholder={ 'Familiya' }
                        { ...register('lastName') }
                    />
                    <TextInput
                        placeholder={ 'Login' }
                        { ...register('username') }
                    />
                    <TextInput
                        placeholder={ 'Parol' }
                        type={ 'password' }
                        { ...register('password') }
                    />
                </Dialog.Body>
                <Dialog.Footer>
                    <Button
                        loading={ createManager.isPending }
                        view={ 'action' }
                        type={ 'submit' }>Saqlash</Button>
                </Dialog.Footer>
            </form>
        </Dialog>
    )
}

export default CreateManagerDialog