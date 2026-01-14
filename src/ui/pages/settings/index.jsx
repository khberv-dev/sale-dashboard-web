import st from './main.module.scss'
import { Button, Card, Spin, Text } from '@gravity-ui/uikit'
import useAuthContext from '@/providers/auth/useAuthContext.js'
import { Controller, useForm } from 'react-hook-form'
import NumberInput from '@/ui/components/number-input/index.jsx'
import { useGetMonthPlanQuery, useSetMonthPlanMutation } from '@/services/manager/query.js'
import { extractNumber, formatNumber } from '@/utils/formatter.js'

function SettingsPage() {
    const monthPlan = useGetMonthPlanQuery()
    const setMonthPlan = useSetMonthPlanMutation()
    const { handleSubmit, control, reset } = useForm()
    const auth = useAuthContext()

    const onLogoutClick = () => {
        auth.logOut()
    }

    const onSubmit = async (data) => {
        await setMonthPlan.mutateAsync({
            plan: extractNumber(data.plan)
        })
        reset()
    }

    if (monthPlan.isLoading) {
        return <Spin/>
    }

    return (
        <div className={ st.container }>
            <Text variant={ 'header-1' }>Sozlamalar</Text>
            <br/><br/>
            <Card className={ st.profileCard }>
                <form onSubmit={ handleSubmit(onSubmit) }>
                    <Controller
                        name={ 'plan' }
                        control={ control }
                        render={ ({ field }) =>
                            <NumberInput
                                defaultValue={ formatNumber(monthPlan.data) }
                                placeholder={ 'Oylik plan' }
                                { ...field }/>
                        }/>
                    <br/><br/>
                    <Button view={ 'action' } type={ 'submit' }>Saqlash</Button>
                </form>
                <br/><br/>
                <Button
                    onClick={ onLogoutClick }
                    view={ 'outlined-danger' }>Tizimdan chiqish</Button>
            </Card>
        </div>
    )
}

export default SettingsPage