import { Button, Dialog, Select } from '@gravity-ui/uikit'
import st from '@/ui/layouts/edit-manager-dialog/main.module.scss'
import { Controller, useForm } from 'react-hook-form'
import { useCreateSaleMutation, useGetSaleTypeOptionsQuery } from '@/services/sale/query.js'
import NumberInput from '@/ui/components/number-input/index.jsx'
import { extractNumber } from '@/utils/formatter.js'
import { DatePicker } from '@gravity-ui/date-components'
import { dateTime, dateTimeParse } from '@gravity-ui/date-utils'

function CreateSaleDialog({ open, onClose }) {
    const { handleSubmit, control, reset } = useForm()
    const createSale = useCreateSaleMutation()
    const { data: saleTypes, isLoading: saleTypesLoading } = useGetSaleTypeOptionsQuery()

    const formInputRules = {
        required: true
    }

    const onSubmit = async (data) => {
        const amount = extractNumber(data.amount)
        const type = data.type[0]
        const date = dateTimeParse(data.date).format('YYYY-MM-DD')
        const time = dateTime().format('HH:mm')

        await createSale.mutateAsync({
            amount,
            type,
            date,
            time
        })
        reset()
        onClose()
    }

    return (
        <Dialog size={ 'm' } open={ open } onClose={ onClose }>
            <Dialog.Header caption={ 'Yangi sotuv' }/>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <Dialog.Body className={ st.formBody }>
                    <Controller
                        name={ 'amount' }
                        control={ control }
                        rules={ formInputRules }
                        render={ ({ field }) => (
                            <NumberInput
                                placeholder={ 'Summa' }
                                { ...field }/>
                        ) }/>

                    <Controller
                        name={ 'type' }
                        control={ control }
                        rules={ formInputRules }
                        render={ ({ field }) => (<Select
                            value={ field.value }
                            onUpdate={ field.onChange }
                            placeholder={ 'Sotuv turi' }>
                            { saleTypesLoading ? '' : saleTypes.map((type, index) =>
                                <Select.Option
                                    key={ index }
                                    value={ type.id }>{ type.name }</Select.Option>
                            ) }
                        </Select>) }/>

                    <Controller
                        name={ 'date' }
                        control={ control }
                        rules={ formInputRules }
                        render={ ({ field }) => (
                            <DatePicker
                                format={ 'DD-MM-YYYY' }
                                value={ field.value }
                                onUpdate={ field.onChange }
                            />
                        ) }/>
                </Dialog.Body>
                <Dialog.Footer>
                    <Button
                        loading={ createSale.isPending }
                        view={ 'action' }
                        type={ 'submit' }>Saqlash</Button>
                </Dialog.Footer>
            </form>
        </Dialog>
    )
}

export default CreateSaleDialog