import st from './main.module.scss'
import { Button, Icon, Pagination, Text, TextInput } from '@gravity-ui/uikit'
import { Magnifier } from '@gravity-ui/icons'
import { useState } from 'react'
import { extractErrorMessage, MIN_PHONE_SEARCH_LENGTH, useSearchStudentsQuery } from '@/services/learning/query.js'
import StudentsTable from '@/ui/components/students-table/index.jsx'
import EnrollStudentDialog from '@/ui/layouts/enroll-student-dialog/index.jsx'
import RequestEnrollmentDialog from '@/ui/layouts/request-enrollment-dialog/index.jsx'
import { TableSkeleton } from '@/ui/components/skeleton/index.jsx'

const PAGE_SIZE = 10

function EnrollmentPage() {
    const [phoneInput, setPhoneInput] = useState('')
    const [phone, setPhone] = useState('')
    const [page, setPage] = useState(1)
    const [selectedStudent, setSelectedStudent] = useState(null)
    const [requestedStudent, setRequestedStudent] = useState(null)

    const { data: students, isFetching, error } = useSearchStudentsQuery(phone, page, PAGE_SIZE)

    const isSearchable = phoneInput.length >= MIN_PHONE_SEARCH_LENGTH

    const handlePhoneChange = (e) => {
        setPhoneInput(e.target.value.replace(/\D+/g, ''))
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault()

        if (!isSearchable) {
            return
        }

        setPage(1)
        setPhone(phoneInput)
    }

    const renderResult = () => {
        if (phone.length < MIN_PHONE_SEARCH_LENGTH) {
            return <Text variant={ 'body-1' } color={ 'secondary' }>
                Talabani telefon raqami bo'yicha qidiring — kamida { MIN_PHONE_SEARCH_LENGTH } ta raqam
            </Text>
        }

        if (isFetching) {
            return <TableSkeleton rows={ 5 }/>
        }

        if (error) {
            return <Text variant={ 'body-1' } color={ 'danger' }>{ extractErrorMessage(error) }</Text>
        }

        if (!students?.data?.length) {
            return <Text variant={ 'body-1' } color={ 'secondary' }>Talaba topilmadi</Text>
        }

        return (
            <>
                <StudentsTable
                    data={ students.data }
                    onItemEnroll={ setSelectedStudent }
                    onItemRequest={ setRequestedStudent }/>
                <div className={ st.paginationContainer }>
                    <Pagination
                        page={ students.page }
                        pageSize={ students.limit }
                        total={ students.total }
                        onUpdate={ setPage }/>
                </div>
            </>
        )
    }

    return (
        <div className={ st.container }>
            <form className={ st.searchBar } onSubmit={ handleSearchSubmit }>
                <TextInput
                    size={ 'l' }
                    value={ phoneInput }
                    onChange={ handlePhoneChange }
                    placeholder={ 'Telefon raqami' }/>
                <Button
                    size={ 'l' }
                    view={ 'action' }
                    type={ 'submit' }
                    disabled={ !isSearchable }>
                    <Icon data={ Magnifier }/>
                    Qidirish
                </Button>
            </form>
            <div className={ st.result }>
                { renderResult() }
            </div>
            <EnrollStudentDialog
                student={ selectedStudent }
                open={ !!selectedStudent }
                onClose={ () => setSelectedStudent(null) }/>
            <RequestEnrollmentDialog
                key={ requestedStudent?.userId }
                student={ requestedStudent }
                open={ !!requestedStudent }
                onClose={ () => setRequestedStudent(null) }/>
        </div>
    )
}

export default EnrollmentPage
