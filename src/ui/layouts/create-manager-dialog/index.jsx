import { Button, Dialog, TextInput } from '@gravity-ui/uikit'
import st from '@/ui/layouts/edit-manager-dialog/main.module.scss'
import { useForm } from 'react-hook-form'
import { useCreateManagerMutation } from '@/services/manager/query.js'
import FormField from '@/ui/components/form-field/index.jsx'

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
                    <FormField label={ 'Ism' }>
                        <TextInput
                            placeholder={ 'Ism' }
                            { ...register('firstName', { required: true }) }
                        />
                    </FormField>
                    <FormField label={ 'Familiya' }>
                        <TextInput
                            placeholder={ 'Familiya' }
                            { ...register('lastName') }
                        />
                    </FormField>
                    <FormField label={ 'Login' }>
                        <TextInput
                            placeholder={ 'Login' }
                            { ...register('username') }
                        />
                    </FormField>
                    <FormField label={ 'Parol' }>
                        <TextInput
                            placeholder={ 'Parol' }
                            type={ 'password' }
                            { ...register('password') }
                        />
                    </FormField>
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