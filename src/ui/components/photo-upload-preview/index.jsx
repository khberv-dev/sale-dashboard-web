import st from './main.module.scss'
import { Button, Card, Icon } from '@gravity-ui/uikit'
import { Plus } from '@gravity-ui/icons'
import { useRef, useState } from 'react'

function PhotoUploadPreview({ imageUrl, onUpload }) {
    const [uploadedFile, setUploadedFile] = useState(null)
    const uploadImageRef = useRef(null)

    const imageSource = uploadedFile ? URL.createObjectURL(uploadedFile) : imageUrl

    const onUploadClick = () => {
        uploadImageRef.current.click()
    }

    const handleUploadedFiles = (e) => {
        const file = e.target.files[0]

        if (file) {
            setUploadedFile(file)
            onUpload(file)
        }
    }

    return (
        <Card
            className={ st.card }>
            { imageSource ?
                <img onClick={ onUploadClick } src={ imageSource } alt="avatar"/>
                : <Button onClick={ onUploadClick }><Icon data={ Plus }/></Button>
            }
            <input onChange={ handleUploadedFiles } ref={ uploadImageRef } type="file" hidden accept={ 'image/*' }/>
        </Card>
    )
}

export default PhotoUploadPreview