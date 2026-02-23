import st from './main.module.scss'

function ProgressBar({ color, progress, ...props }) {
    return (
        <div
            className={ st.progressContainer }
            { ...props }>
            <div className={ st.progressBar } style={ { background: color, width: progress + '%' } }></div>
        </div>
    )
}

export default ProgressBar