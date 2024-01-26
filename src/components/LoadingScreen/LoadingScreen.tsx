import loading from '../../assets/svg/settings.svg';

import './LoadingScreen.css';

const LoadingScreen = () => {
    return <div className="loading-screen">
        <img src={loading} alt='loading' />
    </div>
};

export default LoadingScreen;