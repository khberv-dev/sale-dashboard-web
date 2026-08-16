import st from './main.module.scss'
import { Button, Checkbox, Dialog, Icon, Select, Text, TextInput } from '@gravity-ui/uikit'
import { Magnifier } from '@gravity-ui/icons'
import { Controller, useForm } from 'react-hook-form'
import { useState } from 'react'
import { useCreateSaleMutation, useGetSaleTypeOptionsQuery } from '@/services/sale/query.js'
import {
    extractErrorMessage,
    MIN_PHONE_SEARCH_LENGTH,
    useCreatePendingEnrollmentMutation,
    useGetCoursesQuery,
    useSearchStudentsQuery
} from '@/services/learning/query.js'
import NumberInput from '@/ui/components/number-input/index.jsx'
import { extractNumber } from '@/utils/formatter.js'
import { DatePicker } from '@gravity-ui/date-components'
import { dateTime, dateTimeParse } from '@gravity-ui/date-utils'
import FormField from '@/ui/components/form-field/index.jsx'

const STUDENT_RESULT_LIMIT = 10

function CreateSaleDialog({ open, onClose }) {
    const { handleSubmit, control, reset, unregister } = useForm()
    const createSale = useCreateSaleMutation()
    const createPending = useCreatePendingEnrollmentMutation()
    const { data: saleTypes, isLoading: saleTypesLoading } = useGetSaleTypeOptionsQuery()

    // Kursga yozish bo'limi ixtiyoriy — har bir sotuv kurs sotuvi emas. Bu holat
    // formaga yuborilmaydi, shuning uchun oddiy state (forma `watch` i emas).
    const [withEnrollment, setWithEnrollment] = useState(false)
    const [phoneInput, setPhoneInput] = useState('')
    const [phone, setPhone] = useState('')

    const { data: students, isFetching: studentsFetching, error: studentsError } =
        useSearchStudentsQuery(phone, 1, STUDENT_RESULT_LIMIT)
    const { data: courses, isLoading: coursesLoading } = useGetCoursesQuery()

    const formInputRules = {
        required: true
    }

    const isSearchable = phoneInput.length >= MIN_PHONE_SEARCH_LENGTH

    const onEnrollmentToggle = (checked) => {
        setWithEnrollment(checked)

        if (!checked) {
            // Bo'lim yopilganda maydonlar ro'yxatdan chiqariladi: ular yopilgandan
            // keyin ham oxirgi "majburiy" qoidasi bilan qolib, formani ko'rinmas
            // holda yubormay qo'yardi.
            unregister(['userId', 'courseId', 'start', 'end'])
        }
    }

    const runSearch = () => {
        if (isSearchable) {
            setPhone(phoneInput)
        }
    }

    // Oyna ichidagi qidiruv tashqi formani yubormasligi kerak.
    const onPhoneKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            runSearch()
        }
    }

    const studentOptions = (students?.data ?? []).map(student => ({
        value: student.userId,
        content: `${ student.firstName } ${ student.lastName ?? '' } · ${ student.phoneNumber }`
    }))

    const courseOptions = (courses ?? []).map(course => ({
        value: course.id,
        content: course.title
    }))

    const resetDialog = () => {
        reset()
        setWithEnrollment(false)
        setPhoneInput('')
        setPhone('')
    }

    const onSubmit = async (data) => {
        try {
            // Yozilish so'rovi birinchi yuboriladi: platforma bir xil talaba va kurs
            // uchun takroriy so'rovni yangi yozuv qilmaydi, mavjudining sanalarini
            // yangilaydi — shuning uchun sotuv xato bersa qayta yuborish xavfsiz.
            // Teskari tartibda esa qayta urinish ikkinchi sotuvni yozib qo'yardi.
            if (withEnrollment) {
                await createPending.mutateAsync({
                    userId: data.userId,
                    courseId: data.courseId,
                    start: data.start ? dateTimeParse(data.start).format('YYYY-MM-DD') : undefined,
                    end: data.end ? dateTimeParse(data.end).format('YYYY-MM-DD') : undefined
                })
            }

            await createSale.mutateAsync({
                amount: extractNumber(data.amount),
                type: data.type[0],
                date: dateTimeParse(data.date).format('YYYY-MM-DD'),
                time: dateTime().format('HH:mm'),
                contractNumber: data.contractNumber
            })
        } catch {
            // Xabar toast orqali ko'rsatildi — oyna ochiq qoladi, kiritilgan
            // ma'lumot yo'qolmasin.
            return
        }

        resetDialog()
        onClose()
    }

    const renderStudentHint = () => {
        if (studentsError) {
            return <Text variant={ 'body-1' } color={ 'danger' }>{ extractErrorMessage(studentsError) }</Text>
        }

        if (!phone) {
            return <Text variant={ 'body-1' } color={ 'secondary' }>
                Talabani telefon raqami bo'yicha qidiring — kamida { MIN_PHONE_SEARCH_LENGTH } ta raqam
            </Text>
        }

        if (studentsFetching) {
            return <Text variant={ 'body-1' } color={ 'secondary' }>Qidirilmoqda…</Text>
        }

        if (!students?.data?.length) {
            return <Text variant={ 'body-1' } color={ 'secondary' }>Talaba topilmadi</Text>
        }

        return <Text variant={ 'body-1' } color={ 'secondary' }>
            { students.total } ta talaba topildi
        </Text>
    }

    return (
        <Dialog size={ 'm' } open={ open } onClose={ onClose }>
            <Dialog.Header caption={ 'Yangi sotuv' }/>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <Dialog.Body className={ st.formBody }>
                    <FormField label={ 'Shartnoma raqami' }>
                        <Controller
                            name={ 'contractNumber' }
                            control={ control }
                            rules={ formInputRules }
                            render={ ({ field }) =>
                                <TextInput
                                    placeholder={ 'Shartnoma raqami' }
                                    { ...field }/>
                            }/>
                    </FormField>

                    <FormField label={ 'Summa' }>
                        <Controller
                            name={ 'amount' }
                            control={ control }
                            rules={ formInputRules }
                            render={ ({ field }) => (
                                <NumberInput
                                    placeholder={ 'Summa' }
                                    { ...field }/>
                            ) }/>
                    </FormField>

                    <FormField label={ 'Sotuv turi' }>
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
                    </FormField>

                    <FormField label={ 'Sana' }>
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
                    </FormField>

                    <div className={ st.section }>
                        <Checkbox
                            checked={ withEnrollment }
                            onUpdate={ onEnrollmentToggle }
                            size={ 'm' }>Talabani kursga yozish so'rovini yuborish</Checkbox>
                    </div>

                    { withEnrollment ?
                        <>
                            <div className={ st.fullRow }>
                                <FormField label={ 'Talaba telefon raqami' }>
                                    <div className={ st.searchRow }>
                                        <div className={ st.searchInput }>
                                            <TextInput
                                                value={ phoneInput }
                                                placeholder={ 'Telefon raqami' }
                                                onKeyDown={ onPhoneKeyDown }
                                                onChange={ (e) => setPhoneInput(e.target.value.replace(/\D+/g, '')) }/>
                                        </div>
                                        <Button
                                            type={ 'button' }
                                            view={ 'outlined' }
                                            disabled={ !isSearchable }
                                            loading={ studentsFetching }
                                            onClick={ runSearch }>
                                            <Icon data={ Magnifier }/>
                                            Qidirish
                                        </Button>
                                    </div>
                                </FormField>
                            </div>

                            <div className={ st.fullRow }>
                                { renderStudentHint() }
                            </div>

                            <div className={ st.fullRow }>
                                <FormField label={ 'Talaba' }>
                                    <Controller
                                        name={ 'userId' }
                                        control={ control }
                                        rules={ { required: withEnrollment } }
                                        render={ ({ field }) =>
                                            <Select
                                                placeholder={ 'Talaba' }
                                                disabled={ !studentOptions.length }
                                                value={ field.value ? [field.value] : [] }
                                                onUpdate={ (value) => field.onChange(value[0]) }
                                                options={ studentOptions }/>
                                        }/>
                                </FormField>
                            </div>

                            <div className={ st.fullRow }>
                                <FormField label={ 'Kurs' }>
                                    <Controller
                                        name={ 'courseId' }
                                        control={ control }
                                        rules={ { required: withEnrollment } }
                                        render={ ({ field }) =>
                                            <Select
                                                placeholder={ 'Kurs' }
                                                loading={ coursesLoading }
                                                value={ field.value ? [field.value] : [] }
                                                onUpdate={ (value) => field.onChange(value[0]) }
                                                options={ courseOptions }/>
                                        }/>
                                </FormField>
                            </div>

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

                            <FormField label={ 'Tugash sanasi' }>
                                <Controller
                                    name={ 'end' }
                                    control={ control }
                                    render={ ({ field }) =>
                                        <DatePicker
                                            format={ 'DD-MM-YYYY' }
                                            value={ field.value }
                                            onUpdate={ field.onChange }/>
                                    }/>
                            </FormField>

                            <div className={ st.fullRow }>
                                <Text variant={ 'body-1' } color={ 'secondary' }>
                                    So'rov admin tasdig'ini kutadi — tarif va summani u tanlaydi. Sanalar
                                    ixtiyoriy. Sotuv esa shu yerda darhol yoziladi.
                                </Text>
                            </div>
                        </> : '' }
                </Dialog.Body>
                <Dialog.Footer>
                    <Button
                        loading={ createSale.isPending || createPending.isPending }
                        view={ 'action' }
                        type={ 'submit' }>Saqlash</Button>
                </Dialog.Footer>
            </form>
        </Dialog>
    )
}

export default CreateSaleDialog
