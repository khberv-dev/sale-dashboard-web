import { Button, Dialog } from "@gravity-ui/uikit";
import DurationInput from "@/ui/components/duration-input/index.jsx";
import { useState } from "react";
import { useAddCallMutation } from "@/services/manager/query.js";
import { extractDurationSeconds } from "@/utils/formatter.js";

function AddCallDialog({ manager, open, onClose }) {
    const [duration, setDuration] = useState('')
    const addCallMutation = useAddCallMutation()

    const handleDurationChange = (value) => {
        setDuration(value)
    }

    const handleSubmitClick = async () => {
        await addCallMutation.mutateAsync({
            userId: manager.id,
            duration: extractDurationSeconds(duration)
        })

        onClose()
    }

    if (!manager) return

    return (
        <Dialog size={ 's' } open={ open } onClose={ onClose }>
            <Dialog.Header caption={ manager.firstName + ' ' + manager.lastName }/>
            <Dialog.Body>
                <div style={ { display: 'flex', gap: '8px' } }>
                    <DurationInput onChange={ handleDurationChange }/>
                    <Button
                        view={ 'action' }
                        onClick={ handleSubmitClick }>Qo'shish</Button>
                </div>
                <br/>
            </Dialog.Body>
        </Dialog>
    )
}

export default AddCallDialog