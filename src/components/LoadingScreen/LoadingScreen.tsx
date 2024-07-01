import loading from '../../assets/svg/settings.svg';

import './LoadingScreen.css';

const LoadingScreen = () => {
    return <div className="loading-screen">
        <img src={loading} alt='loading' />
        <p>Trwa wczytywanie danych...</p>
    </div>
};

export default LoadingScreen;