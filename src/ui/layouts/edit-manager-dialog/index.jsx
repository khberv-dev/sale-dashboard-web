import st from './main.module.scss'
import { Button, Checkbox, Dialog, Select, TextInput } from '@gravity-ui/uikit'
import { Controller, useForm } from 'react-hook-form'
import { useUpdateManagerMutation, useUploadManagerAvatarMutation } from '@/services/manager/query.js'
import PhotoUploadPreview from '@/ui/components/photo-upload-preview/index.jsx'
import { getAvatarUrl } from '@/utils/url-resolver.js'
import NumberInput from "@/ui/components/number-input/index.jsx"
import { extractNumber, formatNumber } from "@/utils/formatter.js"
import { useEffect } from "react"
import { useGetTeams } from "@/services/team/query.js"
import FormField from "@/ui/components/form-field/index.jsx"

function EditManagerDialog({ manager, open, onClose }) {
    const { register, handleSubmit, reset, control } = useForm()
    const updateManager = useUpdateManagerMutation()
    const uploadManagerAvatar = useUploadManagerAvatarMutation()
    const { data: teams } = useGetTeams()

    const onSubmit = async (data) => {
        await updateManager.mutateAsync({
            id: manager.id,
            data: {
                ...data,
                teamId: data['teamId'] ? data['teamId'] : null,
                plan: extractNumber(data.plan)
            }
        })
        reset()
        onClose()
    }

    const onUploadAvatar = async (file) => {
        uploadManagerAvatar.mutate({ id: manager.id, file })
        reset()
    }

    useEffect(() => {
        reset()
    }, [open])

    if (!manager) {
        return
    }

    const positionOptions = [
        {
            value: 'JUNIOR',
            content: 'Junior'
        },
        {
            value: 'MIDDLE',
            content: 'Middle'
        },
        {
            value: 'SENIOR',
            content: 'Senior'
        },
        {
            value: 'TEAM_LEAD',
            content: 'Team Lead'
        }
    ]

    const teamOptions = [
        {
            value: null,
            content: 'Hech qaysi'
        },
        ...(teams ?? []).map((team) => ({
            value: String(team.id),
            content: team.name,
        }))
    ]

    return (
        <Dialog size={ 'm' } open={ open } onClose={ onClose }>
            <Dialog.Header caption={ 'Sotuv menejer profili' }/>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <Dialog.Body className={ st.formBody }>
                    <FormField label={ 'Ism' }>
                        <TextInput
                            defaultValue={ manager.firstName }
                            placeholder={ 'Ism' }
                            { ...register('firstName') }/>
                    </FormField>
                    <FormField label={ 'Familiya' }>
                        <TextInput
                            defaultValue={ manager.lastName }
                            placeholder={ 'Familiya' }
                            { ...register('lastName') }/>
                    </FormField>
                    <FormField label={ 'Login' }>
                        <TextInput
                            defaultValue={ manager.username }
                            placeholder={ 'Login' }
                            { ...register('username') }/>
                    </FormField>
                    <FormField label={ 'amoCRM akkaunt' }>
                        <TextInput
                            defaultValue={ manager.accountId }
                            placeholder={ 'amoCRM akkaunt' }
                            { ...register('crmAccount') }/>
                    </FormField>
                    <FormField label={ 'SIP raqam' }>
                        <TextInput
                            defaultValue={ manager.sipNumber }
                            placeholder={ 'SIP raqam' }
                            { ...register('sipNumber') }/>
                    </FormField>
                    <FormField label={ 'Oylik plan' }>
                        <Controller
                            name={ 'plan' }
                            control={ control }
                            defaultValue={ formatNumber(manager.plan) }
                            render={ ({ field }) =>
                                <NumberInput
                                    placeholder={ 'Oylik plan' }
                                    { ...field }/>
                            }/>
                    </FormField>
                    <FormField label={ 'Parol' }>
                        <TextInput
                            type={ 'password' }
                            placeholder={ 'Parol' }
                            { ...register('password') }/>
                    </FormField>

                    <FormField label={ 'Guruh' }>
                        <Controller
                            control={ control }
                            name={ 'teamId' }
                            defaultValue={ manager.teamId }
                            render={ ({ field }) =>
                                <Select
                                    value={ field.value != null ? [String(field.value)] : [] }
                                    onUpdate={ (val) => field.onChange(val[0]) }
                                    options={ [...teamOptions] }
                                /> }/>
                    </FormField>

                    <FormField label={ 'Lavozim' }>
                        <Controller
                            control={ control }
                            name={ 'position' }
                            defaultValue={ manager.position }
                            render={ ({ field }) =>
                                <Select
                                    placeholder={ 'Lavozim' }
                                    value={ field.value ? [field.value] : [] }
                                    onUpdate={ (val) => field.onChange(val[0]) }
                                    options={ positionOptions }
                                /> }/>
                    </FormField>

                    <Controller name={ 'isActive' } control={ control } defaultValue={ manager.isActive }
                                render={ ({ field }) =>
                                    <Checkbox checked={ field.value }
                                              onUpdate={ field.onChange }
                                              size={ 'm' }>Faol</Checkbox> }/>
                    <PhotoUploadPreview
                        imageUrl={ getAvatarUrl(manager.avatar) }
                        onUpload={ onUploadAvatar }/>
                </Dialog.Body>
                <Dialog.Footer>
                    <Button loading={ updateManager.isPending } view={ 'action' } type={ 'submit' }>Saqlash</Button>
                </Dialog.Footer>
            </form>
        </Dialog>
    )
}

export default EditManagerDialog