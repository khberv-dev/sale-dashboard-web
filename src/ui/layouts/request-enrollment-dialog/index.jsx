import st from './main.module.scss'
import { Button, Dialog, Icon, Label, Select, Text } from '@gravity-ui/uikit'
import { ArrowsRotateRight } from '@gravity-ui/icons'
import { Controller, useForm } from 'react-hook-form'
import { DatePicker } from '@gravity-ui/date-components'
import { dateTimeParse } from '@gravity-ui/date-utils'
import { useState } from 'react'
import FormField from '@/ui/components/form-field/index.jsx'
import {
    extractErrorMessage,
    useCreatePendingEnrollmentMutation,
    useGetCoursesQuery,
    usePendingEnrollmentQuery
} from '@/services/learning/query.js'

const defaultValues = {
    courseId: '',
    start: null,
    end: null
}

const statusLabels = {
    created: { theme: 'warning', text: "Tasdiq kutilmoqda" },
    accepted: { theme: 'success', text: 'Tasdiqlangan' },
    rejected: { theme: 'danger', text: 'Rad etilgan' }
}

const formatDay = (value) => value ? dateTimeParse(value).format('DD-MM-YYYY') : "—"

/**
 * `EnrollStudentDialog` dan farqi: yozilish darhol ochilmaydi va sotuv yozilmaydi.
 * So'rov navbatga tushadi, tarif va summani platforma admini tasdiqlash paytida
 * tanlaydi — shuning uchun bu yerda tarif ham, summa ham so'ralmaydi.
 */
function RequestEnrollmentDialog({ student, open, onClose }) {
    const { control, handleSubmit } = useForm({ defaultValues })
    const { data: courses, isLoading: coursesLoading, error: coursesError } = useGetCoursesQuery()
    const createPending = useCreatePendingEnrollmentMutation()

    // So'rov yuborilgach oyna holat ko'rinishiga o'tadi — menejer javobni shu
    // yerda kuzatadi, id ni boshqa joydan qidirmaydi.
    //
    // Forma va bu holat tozalanishi uchun ota-komponent `key` beradi: har bir
    // talaba uchun oyna qaytadan mount bo'ladi, shuning uchun bu yerda reset yo'q.
    const [created, setCreated] = useState(null)
    const { data: fetched, isFetching, refetch } = usePendingEnrollmentQuery(created?.id)

    const pending = fetched ?? created

    if (!student) {
        return
    }

    const courseOptions = (courses ?? []).map(course => ({
        value: course.id,
        content: course.title
    }))

    const onSubmit = async (data) => {
        const res = await createPending.mutateAsync({
            userId: student.userId,
            courseId: data.courseId,
            start: data.start ? dateTimeParse(data.start).format('YYYY-MM-DD') : undefined,
            end: data.end ? dateTimeParse(data.end).format('YYYY-MM-DD') : undefined
        })

        setCreated(res.pending)
    }

    const studentName = student.firstName + ' ' + (student.lastName ? student.lastName : '')

    const renderStatus = () => {
        const status = statusLabels[pending.status] ?? { theme: 'unknown', text: pending.status }

        return (
            <>
                <Dialog.Body className={ st.statusBody }>
                    <div className={ st.statusRow }>
                        <Text variant={ 'body-1' } color={ 'secondary' }>Holat</Text>
                        <Label theme={ status.theme } size={ 'm' }>{ status.text }</Label>
                    </div>
                    <div className={ st.statusRow }>
                        <Text variant={ 'body-1' } color={ 'secondary' }>Talaba</Text>
                        <Text variant={ 'body-2' }>{ studentName }</Text>
                    </div>
                    <div className={ st.statusRow }>
                        <Text variant={ 'body-1' } color={ 'secondary' }>Kurs</Text>
                        <Text variant={ 'body-2' }>{ pending.course?.title }</Text>
                    </div>
                    <div className={ st.statusRow }>
                        <Text variant={ 'body-1' } color={ 'secondary' }>Muddat</Text>
                        <Text variant={ 'body-2' }>
                            { formatDay(pending.start) } — { formatDay(pending.end) }
                        </Text>
                    </div>
                    <Text variant={ 'body-1' } color={ 'secondary' }>
                        { pending.status === 'created' ?
                            "So'rov navbatga tushdi. Tarif va summani admin tasdiqlash paytida tanlaydi." :
                            pending.status === 'accepted' ?
                                'Yozilish ochildi.' :
                                "So'rov rad etilgan — yozilish ham, to'lov ham yaratilmadi." }
                    </Text>
                </Dialog.Body>
                <Dialog.Footer>
                    <Button
                        loading={ isFetching }
                        view={ 'outlined' }
                        onClick={ () => refetch() }>
                        <Icon data={ ArrowsRotateRight }/>
                        Holatni yangilash
                    </Button>
                    <Button view={ 'action' } onClick={ onClose }>Yopish</Button>
                </Dialog.Footer>
            </>
        )
    }

    const renderForm = () => (
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

                <div className={ st.fullRow }>
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
                        Sanalar ixtiyoriy: boshlanish berilmasa — tasdiqlangan payt, tugash berilmasa —
                        admin tanlagan tarif muddati qo'shiladi.
                    </Text>
                </div>
            </Dialog.Body>
            <Dialog.Footer>
                <Button
                    loading={ createPending.isPending }
                    view={ 'action' }
                    type={ 'submit' }>So'rov yuborish</Button>
            </Dialog.Footer>
        </form>
    )

    return (
        <Dialog size={ 'm' } open={ open } onClose={ onClose }>
            <Dialog.Header caption={ pending ? "Yozilish so'rovi" : "Yozilish so'rovini yuborish" }/>
            { pending ? renderStatus() : renderForm() }
        </Dialog>
    )
}

export default RequestEnrollmentDialog
