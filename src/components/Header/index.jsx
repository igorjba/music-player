import Logo from '../../assets/logo.svg';
import ProfileImage from '../../assets/profile.jpg';
import './style.css';

function Header() {
    return (
        <header>
            <img className='logo' src={Logo} alt="logo" />
            <div className='container-welcome'>
                <img className='profile-img' src={ProfileImage} alt="Profile" />
                <strong className='profile-name'>Igor Bahia</strong>
            </div>

        </header>
    )
}

export default Header;