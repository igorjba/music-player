import './style.css';
import Logo from '../../assets/logo.svg';
import ProfileImage from '../../assets/profile.jpg';

function Header() {
    return (
        <header>
            <img className='logo' src={Logo} alt="logo" />
            <div className='container-welcome'>
                <img className='profile-img' src={ProfileImage} alt="Profile" />
                <strong className='profile-name'>Bem Vindo, Igor Bahia</strong>
            </div>

        </header>
    )
}

export default Header;