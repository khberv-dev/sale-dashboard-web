import st from './main.module.scss'
import { Button, Dialog, TextInput } from '@gravity-ui/uikit'
import { Controller, useForm } from 'react-hook-form'
import { useUpdateManagerMutation, useUploadManagerAvatarMutation } from '@/services/manager/query.js'
import PhotoUploadPreview from '@/ui/components/photo-upload-preview/index.jsx'
import { getAvatarUrl } from '@/utils/url-resolver.js'
import NumberInput from "@/ui/components/number-input/index.jsx";
import { extractNumber, formatNumber } from "@/utils/formatter.js";

function EditManagerDialog({ manager, open, onClose }) {
    const { register, handleSubmit, reset, control } = useForm()
    const updateManager = useUpdateManagerMutation()
    const uploadManagerAvatar = useUploadManagerAvatarMutation()

    const onSubmit = async (data) => {
        await updateManager.mutateAsync({
            id: manager.id,
            data: {
                ...data,
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

    if (!manager) {
        return
    }

    return (
        <Dialog size={ 'm' } open={ open } onClose={ onClose }>
            <Dialog.Header caption={ 'Sotuv menejer profili' }/>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <Dialog.Body className={ st.formBody }>
                    <TextInput
                        defaultValue={ manager.firstName }
                        placeholder={ 'Ism' }
                        { ...register('firstName') }/>
                    <TextInput
                        defaultValue={ manager.lastName }
                        placeholder={ 'Familiya' }
                        { ...register('lastName') }/>
                    <TextInput
                        defaultValue={ manager.username }
                        placeholder={ 'Login' }
                        { ...register('username') }/>
                    <TextInput
                        defaultValue={ manager.accountId }
                        placeholder={ 'amoCRM akkaunt' }
                        { ...register('crmAccount') }/>
                    <TextInput
                        defaultValue={ manager.sipNumber }
                        placeholder={ 'SIP raqam' }
                        { ...register('sipNumber') }/>
                    <Controller
                        name={ 'plan' }
                        control={ control }
                        render={ ({ field }) =>
                            <NumberInput
                                defaultValue={ formatNumber(manager.plan) }
                                placeholder={ 'Oylik plan' }
                                { ...field }/>
                        }/>
                    <TextInput
                        type={ 'password' }
                        placeholder={ 'Parol' }
                        { ...register('password') }/>
                    <br/>
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