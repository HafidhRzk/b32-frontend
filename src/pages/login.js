import Intro from './components/intro';
import { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useMutation } from 'react-query';

import { API } from '../config/api';

function Login (){
    return(
        <div className='base'>
            <div style={{display: 'flex'}}>
                <Intro />
                <Loginform />
            </div>
        </div>
    );
}

function Loginform (){

    let navigate = useNavigate();

    const [ state, dispatch] = useContext(UserContext);
    console.log(state);

    const [message, setMessage] = useState(null);
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const { email, password } = form;

    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();
      
            const config = {
              headers: {
                'Content-type': 'application/json',
              },
            };
      
            const body = JSON.stringify(form);
      
            const response = await API.post('/login', body, config);
            console.log(response);
      
            if (response?.status === 200) {
              dispatch({
                type: 'LOGIN_SUCCESS',
                payload: response.data.data,
              });
      
              if (response.data.data.status === 'admin') {
                navigate('/product');
              } else {
                navigate('/homepage');
              }
      
              const alert = (
                <Alert variant="success" className="py-1">
                  Login success
                </Alert>
              );
              setMessage(alert);
            }
        } catch (error) {
            const alert = (
            <Alert variant="danger" className="py-1">
                Login failed
            </Alert>
            );
            setMessage(alert);
            console.log(error);
        }
    });

    return(
    <div style={{flex: '30%', display: 'flex',}}>
        <div className="card">
            {message && message}
            <form className="container mx-auto my-3" onSubmit={(e) => handleOnSubmit.mutate(e)}>
                <h2 style={{textAlign: 'left', marginBottom: '30px',}}>Login</h2>
                <div className="mb-3">
                    <input type="email" className="form-control" placeholder="Enter email" 
                    onChange={handleOnChange} value={email} name="email"/>
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control" placeholder="Password" 
                    onChange={handleOnChange} value={password} name="password"/>
                </div>
                <button className="button" style={{backgroundColor: 'red', width: '100%'}}>Login</button> 
            </form>
        </div>
    </div>
    );
}

export default Login;