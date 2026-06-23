import st from './main.module.scss'
import { formatNumber } from "@/utils/formatter.js";
import { Avatar } from "@gravity-ui/uikit";
import { getAvatarUrl } from "@/utils/url-resolver.js";
import ProgressBar from "@/ui/pages/dashboard/progress-bar/index.jsx";

function SummaryCard({
                         icon,
                         headTitle,
                         summary,
                         headlineColor,
                         flex,
                         width,
                         managerList,
                         currentProgress,
                         progressLimit,
                         remainingLimit,
                         subSummary,
                         subTitle
                     }) {
    const orderColors = [
        {
            foreground: '#fbc024',
            background: '#353022'
        },
        {
            foreground: '#94a3b8',
            background: '#222731'
        },
        {
            foreground: '#b57850',
            background: '#272224'
        }
    ]

    return (
        <div className={ st.card } style={ { flex: flex, width: width } }>
            { headlineColor ?
                <div
                    className={ st.headline }
                    style={ { background: headlineColor } }></div>
                : '' }
            <div className={ st.head }>
                { icon }
                <div className={ st.headTitle }>
                    { headTitle }
                </div>
            </div>
            { summary ?
                <div className={ st.summary }>
                    { formatNumber(summary) }
                </div>
                : '' }
            { subSummary > 0 ?
                <div className={ st.subSummary }>
                    <span className={ st.subTitle }>{ subTitle }:</span>
                    &nbsp;
                    <span>{ formatNumber(subSummary) }</span>
                </div>
                : '' }

            { currentProgress && progressLimit && remainingLimit ?
                <div>
                    <span
                        className={ st.progressIndicator }>{ (currentProgress / progressLimit * 100).toFixed(1) }%</span>
                    <span className={ st.progressInfo }> bajarildi -- { remainingLimit } kun qoldi</span>
                    <br/><br/>
                    <div>
                        <ProgressBar
                            color={ headlineColor }
                            progress={ (currentProgress / progressLimit * 100) }/>
                    </div>
                </div>
                : '' }

            { managerList ?
                <div>
                    {
                        managerList.map((manager, index) =>
                            <div key={ index } className={ st.topManagerItem }>
                                <div
                                    className={ st.orderBadge }
                                    style={ {
                                        background: orderColors[index].background,
                                        color: orderColors[index].foreground
                                    } }>
                                    { index + 1 }
                                </div>
                                <Avatar
                                    size={ 'm' }
                                    text={ manager.firstName + ' ' + manager.lastName }
                                    imgUrl={ getAvatarUrl(manager.avatar) }/>
                                <div>
                                    <div className={ st.managerName }>
                                        { manager.firstName + ' ' + manager.lastName }
                                    </div>
                                    <div className={ st.managerSale }>
                                        { formatNumber(manager.sale) }
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                : '' }
        </div>
    )
}

export default SummaryCard