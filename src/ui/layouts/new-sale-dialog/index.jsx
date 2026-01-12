import st from './main.module.scss'
import { Avatar, Dialog, Text } from '@gravity-ui/uikit'
import { getAvatarUrl } from '@/utils/url-resolver.js'
import { formatNumber } from '@/utils/formatter.js'

function NewSaleDialog({ saleData, open, onClose }) {
    const fullName = saleData?.firstName + (saleData?.lastName ? saleData?.lastName : '')

    return (
        <Dialog
            size={ 'm' }
            open={ open }
            onClose={ onClose }>
            <Dialog.Header>
            </Dialog.Header>
            <Dialog.Body>
                <div className={ st.dialogBody }>
                    <Avatar
                        text={ fullName }
                        size={ 'xl' }
                        className={ st.avatar }
                        imgUrl={ getAvatarUrl(saleData?.avatar) }/>
                    <Text variant={ 'header-2' }>{ fullName }</Text>
                    <Text
                        color={ 'positive' }
                        variant={ 'header-1' }>{ formatNumber(saleData?.amount) }</Text>
                </div>
            </Dialog.Body>
            <Dialog.Footer>
            </Dialog.Footer>
        </Dialog>
    )
}

export default NewSaleDialog