import st from './main.module.scss'
import { Button, Dialog, Select, Text, TextInput } from '@gravity-ui/uikit'
import { Controller, useForm } from 'react-hook-form'
import { DatePicker } from '@gravity-ui/date-components'
import { dateTimeParse } from '@gravity-ui/date-utils'
import { useEffect } from 'react'
import FormField from '@/ui/components/form-field/index.jsx'
import NumberInput from '@/ui/components/number-input/index.jsx'
import { extractErrorMessage, useCreateEnrollmentMutation, useGetCoursesQuery } from '@/services/learning/query.js'
import { useGetSaleTypeOptionsQuery } from '@/services/sale/query.js'
import { extractNumber, formatNumber } from '@/utils/formatter.js'

const defaultValues = {
    courseId: '',
    planId: '',
    amount: '',
    type: '',
    contractNumber: '',
    start: null,
    end: null
}

function EnrollStudentDialog({ student, open, onClose }) {
    const { control, handleSubmit, reset, setValue, watch } = useForm({ defaultValues })
    const { data: courses, isLoading: coursesLoading, error: coursesError } = useGetCoursesQuery()
    const { data: saleTypes } = useGetSaleTypeOptionsQuery()
    const createEnrollment = useCreateEnrollmentMutation()

    const courseId = watch('courseId')
    const planId = watch('planId')

    const selectedCourse = (courses ?? []).find(course => course.id === courseId)
    const plans = selectedCourse?.plans ?? []
    const selectedPlan = plans.find(plan => plan.id === planId)

    useEffect(() => {
        reset(defaultValues)
    }, [open, student, reset])

    if (!student) {
        return
    }

    const courseOptions = (courses ?? []).map(course => ({
        value: course.id,
        content: course.title
    }))

    const planOptions = [
        {
            value: '',
            content: "Tarifsiz — muddat qo'lda"
        },
        ...plans.map(plan => ({
            value: plan.id,
            content: `${ plan.title } · ${ formatNumber(plan.price) } so'm · ${ plan.month } oy`
        }))
    ]

    const saleTypeOptions = (saleTypes ?? []).map(type => ({
        value: type.id,
        content: type.name
    }))

    const onCourseChange = (field) => (value) => {
        field.onChange(value[0])
        setValue('planId', '')
        setValue('amount', '')
    }

    const onPlanChange = (field) => (value) => {
        const plan = plans.find(item => item.id === value[0])

        field.onChange(value[0])
        setValue('amount', plan ? formatNumber(plan.price) : '')
    }

    const onSubmit = async (data) => {
        await createEnrollment.mutateAsync({
            studentId: student.studentId,
            courseId: data.courseId,
            planId: data.planId ? data.planId : undefined,
            amount: extractNumber(data.amount),
            type: data.type ? data.type : undefined,
            contractNumber: data.contractNumber ? data.contractNumber : undefined,
            start: data.start ? dateTimeParse(data.start).format('YYYY-MM-DD') : undefined,
            // Tarif tanlangan bo'lsa muddat o'sha yerdan olinadi — avval kiritilgan
            // tugash sanasi formada qolib ketgan bo'lsa ham yuborilmaydi.
            end: !data.planId && data.end ? dateTimeParse(data.end).format('YYYY-MM-DD') : undefined
        })
        reset(defaultValues)
        onClose()
    }

    const studentName = student.firstName + ' ' + (student.lastName ? student.lastName : '')

    return (
        <Dialog size={ 'm' } open={ open } onClose={ onClose }>
            <Dialog.Header caption={ 'Kursga yozish' }/>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <Dialog.Body className={ st.formBody }>
                    <div className={ st.fullRow }>
                        <Text variant={ 'subheader-2' }>{ studentName }</Text>
                        &nbsp;
                        <Text variant={ 'body-1' } color={ 'secondary' }>{ student.phoneNumber }</Text>
                    </div>

                    { coursesError ?
                        <div className={ st.fullRow }>
                            <Text variant={ 'body-1' } color={ 'danger' }>{ extractErrorMessage(coursesError) }</Text>
                        </div> : '' }

                    <FormField label={ 'Kurs' }>
                        <Controller
                            name={ 'courseId' }
                            control={ control }
                            rules={ { required: true } }
                            render={ ({ field }) =>
                                <Select
                                    placeholder={ 'Kurs' }
                                    loading={ coursesLoading }
                                    value={ field.value ? [field.value] : [] }
                                    onUpdate={ onCourseChange(field) }
                                    options={ courseOptions }/>
                            }/>
                    </FormField>

                    <FormField label={ 'Tarif' }>
                        <Controller
                            name={ 'planId' }
                            control={ control }
                            render={ ({ field }) =>
                                <Select
                                    placeholder={ 'Tarif' }
                                    disabled={ !courseId }
                                    value={ [field.value] }
                                    onUpdate={ onPlanChange(field) }
                                    options={ planOptions }/>
                            }/>
                    </FormField>

                    <FormField label={ 'Summa' }>
                        <Controller
                            name={ 'amount' }
                            control={ control }
                            rules={ { required: true } }
                            render={ ({ field }) =>
                                <NumberInput
                                    placeholder={ 'Summa' }
                                    { ...field }/>
                            }/>
                    </FormField>

                    <FormField label={ 'Sotuv turi' }>
                        <Controller
                            name={ 'type' }
                            control={ control }
                            render={ ({ field }) =>
                                <Select
                                    placeholder={ 'Sotuv turi' }
                                    value={ field.value ? [field.value] : [] }
                                    onUpdate={ (value) => field.onChange(value[0]) }
                                    options={ saleTypeOptions }/>
                            }/>
                    </FormField>

                    <FormField label={ 'Shartnoma raqami' }>
                        <Controller
                            name={ 'contractNumber' }
                            control={ control }
                            render={ ({ field }) =>
                                <TextInput
                                    placeholder={ 'Shartnoma raqami' }
                                    { ...field }/>
                            }/>
                    </FormField>

                    <FormField label={ 'Boshlanish sanasi' }>
                        <Controller
                            name={ 'start' }
                            control={ control }
                            render={ ({ field }) =>
                                <DatePicker
                                    format={ 'DD-MM-YYYY' }
                                    value={ field.value }
                                    onUpdate={ field.onChange }/>
                            }/>
                    </FormField>

                    { selectedPlan ? '' :
                        <FormField label={ 'Tugash sanasi' }>
                            <Controller
                                name={ 'end' }
                                control={ control }
                                rules={ { required: !selectedPlan } }
                                render={ ({ field }) =>
                                    <DatePicker
                                        format={ 'DD-MM-YYYY' }
                                        value={ field.value }
                                        onUpdate={ field.onChange }/>
                                }/>
                        </FormField>
                    }

                    <div className={ st.fullRow }>
                        <Text variant={ 'body-1' } color={ 'secondary' }>
                            { selectedPlan ?
                                `Muddat tarifdan olinadi: ${ selectedPlan.month } oy` :
                                "Tarif tanlanmasa, tugash sanasi ko'rsatilishi shart" }
                        </Text>
                    </div>
                </Dialog.Body>
                <Dialog.Footer>
                    <Button
                        loading={ createEnrollment.isPending }
                        view={ 'action' }
                        type={ 'submit' }>Yozish</Button>
                </Dialog.Footer>
            </form>
        </Dialog>
    )
}

export default EnrollStudentDialog
