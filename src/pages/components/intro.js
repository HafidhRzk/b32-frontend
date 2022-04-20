import { Link } from 'react-router-dom';
import Image from './frame.png';

function Intro() {
    return(
        <div style={{textAlign: 'left', flex: '30%'}}>
            <img src={Image} alt="" />
            <h1>Easy, Fast and Reliable</h1>
            <p>Go shopping for mrchandise, just go to dumb merch shopping, the biggest merchandise in Indonesia</p>
            <div className="d-rows gap-2">
                <Link to="/"><button className='button' style={{backgroundColor: 'red', width: '30%'}}>Login</button></Link>
                <Link to="/register"><button className='button' style={{backgroundColor: 'black', width: '30%'}}>Register</button></Link>
            </div>
        </div>
    );
}

export default Intro;