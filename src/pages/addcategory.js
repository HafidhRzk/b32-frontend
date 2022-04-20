import Nav2 from './components/navbar2';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import React, { useState } from 'react';

import { API } from '../config/api';

function AddCategory (){
    return(
        <div className='base'>
            <div className="inbase">
                <Nav2 />
                <AddCat />
            </div>
        </div>
    );
}

function AddCat (){
  let navigate = useNavigate();

  const [form, setForm] = useState({
      name: '',
  });

  const { name } = form;

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
  
        const response = await API.post('/category', body, config);
        console.log(response);

        navigate('/category');
      } catch (error) {
        console.log(error);
      }
    });

    return(
      <div style={{margin: 'auto', width: '80%'}}>
          <form className="container mx-auto my-3" onSubmit={(e) => handleOnSubmit.mutate(e)}>
              <h2 style={{textAlign: 'left', marginBottom: '20px',}}>Add Category</h2>
              <div className="mb-3">
                <input type="text" placeholder="Category Name" name="name" onChange={handleOnChange} 
                className="input-edit-category mt-4" style={{backgroundColor: 'rgb(53, 48, 48)',
                border: '1px solid white', borderRadius: '6px', width: '100%'}} value={name}/>
              </div>
              <button className="button" type="submit" style={{backgroundColor: 'red', width: '100%'}}>Add</button> 
          </form>
      </div>
    );
}

export default AddCategory;