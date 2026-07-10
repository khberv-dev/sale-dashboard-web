import { Button, Checkbox, Dialog, TextInput } from '@gravity-ui/uikit'
import st from '@/ui/layouts/edit-manager-dialog/main.module.scss'
import { Controller, useForm } from 'react-hook-form'
import { useUpdateSaleTypeMutation } from '@/services/sale/query.js'
import FormField from '@/ui/components/form-field/index.jsx'

function EditSaleTypeDialog({ saleType, open, onClose }) {
    const { register, handleSubmit, reset, control } = useForm()
    const updateSaleType = useUpdateSaleTypeMutation()

    const onSubmit = async (data) => {
        await updateSaleType.mutateAsync({ id: saleType.id, data })
        reset()
        onClose()
    }

    if (!saleType) {
        return
    }

    return (
        <Dialog size={ 'm' } open={ open } onClose={ onClose }>
            <Dialog.Header caption={ 'Sotuv turi' }/>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <Dialog.Body className={ st.formBody }>
                    <FormField label={ 'Sotuv turi nomi' }>
                        <TextInput
                            defaultValue={ saleType.name }
                            placeholder={ 'Sotuv turi' }
                            { ...register('name', { required: true }) }
                        />
                    </FormField>
                    <Controller
                        name={ 'isActive' }
                        control={ control }
                        render={ ({ field }) =>
                            <Checkbox
                                defaultChecked={ saleType.isActive }
                                checked={ field.value }
                                onUpdate={ field.onChange }
                            >Faol</Checkbox> }/>
                    <Controller
                        name={ 'isResale' }
                        control={ control }
                        render={ ({ field }) =>
                            <Checkbox
                                defaultChecked={ saleType.isResale }
                                checked={ field.value }
                                onUpdate={ field.onChange }
                            >Qayta sotuv</Checkbox> }/>
                </Dialog.Body>
                <Dialog.Footer>
                    <Button
                        loading={ updateSaleType.isPending }
                        view={ 'action' }
                        type={ 'submit' }>Saqlash</Button>
                </Dialog.Footer>
            </form>
        </Dialog>
    )
}

export default EditSaleTypeDialog