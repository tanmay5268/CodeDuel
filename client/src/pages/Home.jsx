import { useNavigate } from "react-router-dom";
import "../assets/home.css";
import Navbar from "../components/Navbar";
import bgImage from '../assets/python-animated.gif';
const Home = () => {
    const navigate = useNavigate(); 
    return (
        <div>
            <Navbar />
            <div className='bg-cover bg-center bg-slate-500 relative flex items-center justify-center' style={{ backgroundImage: `url(${bgImage})`, height: '100vh' }}>

                <div className='flex gap-4 text-center text-white'>
                    <div className="box-button">
                        <div onClick={() => { navigate('/create') }} className="button"><span>Create</span></div>
                    </div>
                    <div className="box-button">
                        <div onClick={() => { navigate('/join') }} className="button"><span>Join</span></div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Home