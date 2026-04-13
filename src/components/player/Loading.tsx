import loading from '../../assets/LoadingEllipse.svg';
import classes from './Loading.module.css';

const Loading = () => {
    return (
        <div className={classes['centering']}>
            <img className={classes['spin']} src={loading} alt="loading" />
            <p className={classes['text']}>בואנה מהיר</p>
        </div>
    )
}

export default Loading;