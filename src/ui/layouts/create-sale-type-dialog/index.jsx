import { Button, Checkbox, Dialog, TextInput } from '@gravity-ui/uikit'
import st from '@/ui/layouts/edit-manager-dialog/main.module.scss'
import { Controller, useForm } from 'react-hook-form'
import { useCreateSaleTypeMutation } from '@/services/sale/query.js'

function CreateSaleTypeDialog({ open, onClose }) {
    const { register, handleSubmit, reset, control } = useForm()
    const createSaleType = useCreateSaleTypeMutation()

    const onSubmit = async (data) => {
        await createSaleType.mutateAsync(data)
        reset()
        onClose()
    }

    return (
        <Dialog size={ 'm' } open={ open } onClose={ onClose }>
            <Dialog.Header caption={ 'Yangi sotuv turi' }/>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <Dialog.Body className={ st.formBody }>
                    <TextInput
                        placeholder={ 'Sotuv turi' }
                        { ...register('name', { required: true }) }
                    />
                    <Controller
                        name={ 'isResale' }
                        control={ control }
                        defaultValue={ false }
                        render={ ({ field }) =>
                            <Checkbox
                                checked={ field.value }
                                onUpdate={ field.onChange }
                            >Qayta sotuv</Checkbox> }/>
                </Dialog.Body>
                <Dialog.Footer>
                    <Button
                        loading={ createSaleType.isPending }
                        view={ 'action' }
                        type={ 'submit' }>Saqlash</Button>
                </Dialog.Footer>
            </form>
        </Dialog>
    )
}

export default CreateSaleTypeDialog