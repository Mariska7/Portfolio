import './firstscreen.css'
import image from './frontimage.png'

const FirstScreen = () => {
    return (
        <>
            <div className="frontscreen">
            <img src={image} alt="frontpageimage" className="frontimage" />
                <div className="firstscreentext">
                    <div className='textcontainer'>
                    <h1>Welcome to Support Ticket</h1>
                    <p>Your one-stop solution for all your support needs.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FirstScreen;