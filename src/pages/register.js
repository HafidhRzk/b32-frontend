import Intro from './components/intro';
import { useState, useContext } from 'react';
// import { UserContext } from '../context/userContext';
// import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

import { useMutation } from 'react-query';

import { API } from '../config/api';

function Register (){

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

    // let navigate = useNavigate();
    // const [state, dispatch] = useContext(UserContext);

    const [message, setMessage] = useState(null);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    const { name, email, password } = form;

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
    
          const response = await API.post('/register', body, config);
    
          if (response.data.status === 'success...') {
            const alert = (
              <Alert variant="success" className="py-1">
                Success
              </Alert>
            );
            setMessage(alert);
            setForm({
              name: '',
              email: '',
              password: '',
            });
          } else {
            const alert = (
              <Alert variant="danger" className="py-1">
                Failed
              </Alert>
            );
            setMessage(alert);
          }
        } catch (error) {
          const alert = (
            <Alert variant="danger" className="py-1">
              Failed
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
                <h2 style={{textAlign: 'left', marginBottom: '30px',}}>Register</h2>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Enter Name" 
                    onChange={handleOnChange} value={name} name="name"/>
                </div>
                <div className="mb-3">
                    <input type="email" className="form-control" placeholder="Enter email" 
                    onChange={handleOnChange} value={email} name="email"/>
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control" placeholder="Password" 
                    onChange={handleOnChange} value={password} name="password"/>
                </div>
                <a href="/">
                    <button className="button" type="submit" style={{backgroundColor: 'red', width: '100%'}}>Register</button>
                </a>
            </form>
        </div>
    </div>
    );
}

export default Register;