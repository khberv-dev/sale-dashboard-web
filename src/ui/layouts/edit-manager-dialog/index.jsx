import st from './main.module.scss'
import { Button, Dialog, TextInput } from '@gravity-ui/uikit'
import { useForm } from 'react-hook-form'
import { useUpdateManagerMutation, useUploadManagerAvatarMutation } from '@/services/manager/query.js'
import PhotoUploadPreview from '@/ui/components/photo-upload-preview/index.jsx'
import { getAvatarUrl } from '@/utils/url-resolver.js'

function EditManagerDialog({ manager, open, onClose }) {
    const { register, handleSubmit } = useForm()
    const updateManager = useUpdateManagerMutation()
    const uploadManagerAvatar = useUploadManagerAvatarMutation()

    const onSubmit = async (data) => {
        await updateManager.mutateAsync({ id: manager.id, data })
        onClose()
    }

    const onUploadAvatar = async (file) => {
        uploadManagerAvatar.mutate({ id: manager.id, file })
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
                        type={ 'password' }
                        placeholder={ 'Parol' }
                        { ...register('password') }/>
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