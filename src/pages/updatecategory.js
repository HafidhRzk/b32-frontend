import Nav2 from './components/navbar2';
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query';

import { API } from '../config/api';

function UpdateCategory (){
    return(
        <div className='base'>
            <div className="inbase">
                <Nav2 />
                <UpCat />
            </div>
        </div>
    );
}

function UpCat (){
  let navigate = useNavigate();
  const { id } = useParams();
  const [category, setCategory] = useState({ name: '' });

  useQuery('categoryCache', async () => {
    const response = await API.get('/category/' + id);
    setCategory({ name: response.data.data.name });
  });

  const handleOnChange = (e) => {
    setCategory({
      ...category,
      name: e.target.value,
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

      const body = JSON.stringify(category);

      const response = await API.patch('/category/' + id, body, config);

      navigate('/category');
    } catch (error) {
      console.log(error);
    }
  });

    return(
      <div style={{margin: 'auto', width: '80%'}}>
          <form className="container mx-auto my-3" onSubmit={(e) => handleOnSubmit.mutate(e)}>
              <h2 style={{textAlign: 'left', marginBottom: '20px',}}>Update Category</h2>
              <div className="mb-3">
                <input type="text" placeholder="Category Name" value={category.name}
                name="name" onChange={handleOnChange} 
                className="input-edit-category mt-4" style={{backgroundColor: 'rgb(53, 48, 48)',
                border: '1px solid white', borderRadius: '6px', width: '100%'}}/>
              </div>
              <button className="button" type="submit" style={{backgroundColor: 'red', width: '100%'}}>Update</button> 
          </form>
      </div>
    );
}

export default UpdateCategory;