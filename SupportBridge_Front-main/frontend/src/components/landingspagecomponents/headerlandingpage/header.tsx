import './header.css'
import image from './logosupportticket.png'
import { useNavigate } from 'react-router-dom'

const LandingpageHeader = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('./login');
    }

    return (
        <>
        <div className="header">
            <div className="headerlogo">
                <img src={image} alt="Logo" className="logo" />
            </div>
            <p className="logotext">A.sing<span className="highlight">It</span></p>
            <div className="buttoncontainer">
                <button className='signup'>Sign Up</button>
                <button className='login' onClick={handleLoginClick}>Login</button>
            </div>
        </div>
        </>
    )
}

export default LandingpageHeader;
