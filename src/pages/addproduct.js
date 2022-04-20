import Nav2 from './components/navbar2';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import React, { useState, useEffect } from 'react';

import { API } from '../config/api';

function AddProduct (){
    return(
        <div className='base'>
            <div className="inbase">
                <Nav2 />
                <AddForm />
            </div>
        </div>
    );
}

function AddForm (){

    let navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState([]); 
    const [preview, setPreview] = useState(null);
    const [form, setForm] = useState({
      image: '',
      name: '',
      desc: '',
      price: '',
      qty: '',
    });

    const getCategories = async () => {
      try {
        const response = await API.get('/categories');
        setCategories(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    const handleChangeCategoryId = (e) => {
      const id = e.target.value;
      const checked = e.target.checked;
  
      if (checked) {
        setCategoryId([...categoryId, parseInt(id)]);
      } else {
        let newCategoryId = categoryId.filter((categoryIdItem) => {
          return categoryIdItem != id;
        });
        setCategoryId(newCategoryId);
      }
    };

    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]:
          e.target.type === 'file' ? e.target.files : e.target.value,
      });
  
      if (e.target.type === 'file') {
        let url = URL.createObjectURL(e.target.files[0]);
        setPreview(url);
      }
    };

    const handleSubmit = useMutation(async (e) => {
      try {
        e.preventDefault();

        const config = {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        };
  
        const formData = new FormData();
        formData.set('image', form.image[0], form.image[0].name);
        formData.set('name', form.name);
        formData.set('desc', form.desc);
        formData.set('price', form.price);
        formData.set('qty', form.qty);
        formData.set('categoryId', categoryId);
  
        console.log(form);
  
        const response = await API.post('/product', formData, config);
        console.log(response);
  
        navigate('/product');
      } catch (error) {
        console.log(error);
      }
    });
  
    useEffect(() => {
      getCategories();
    }, []);

    return(
      <div style={{margin: 'auto', width: '80%'}}>
          <form className="container mx-auto my-3" onSubmit={(e) => handleSubmit.mutate(e)}>
              <h2 style={{textAlign: 'left', marginBottom: '20px',}}>Add Product</h2>
              <div>
                <img
                  src={preview}
                  style={{
                    maxWidth: '100px',
                    maxHeight: '100px',
                    objectFit: 'cover',
                  }}
                  alt={preview}
                />
              </div>
              <div className="mb-3">
                <input type="file" id="upload" name="image" hidden onChange={handleChange}/>
                <label for="upload" className="label-file-add-product button"> Upload file</label>
              </div>
              <div className="mb-3">
                <input type="text" placeholder="Product Name" name="name" onChange={handleChange} 
                className="input-edit-category mt-4" style={{backgroundColor: 'rgb(53, 48, 48)',
                border: '1px solid white', borderRadius: '6px', width: '100%'}}/>
              </div>
              <div className="mb-3">
                <textarea 
                  placeholder="Product Desc" 
                  name="desc" 
                  onChange={handleChange} 
                  className="input-edit-category mt-4" 
                  style={{backgroundColor: 'rgb(53, 48, 48)', width: '100%', height: '130px', 
                  border: '1px solid white', borderRadius: '6px'}}>
                </textarea>
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  placeholder="Price (Rp.)"
                  name="price"
                  onChange={handleChange}
                  className="input-edit-category mt-4"
                  style={{backgroundColor: 'rgb(53, 48, 48)', width: '100%', 
                  border: '1px solid white', borderRadius: '6px'}}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  placeholder="Stock"
                  name="qty"
                  onChange={handleChange}
                  className="input-edit-category mt-4"
                  style={{backgroundColor: 'rgb(53, 48, 48)', width: '100%', 
                  border: '1px solid white', borderRadius: '6px'}}
                />
              </div>
              <div className="card-form-input mt-4 px-2 py-1 pb-2">
                <div className="text-secondary mb-1" style={{ fontSize: '15px' }}>Category</div>
                {categories.map((item, index) => (
                  <label className="checkbox-inline me-4" key={index}>
                    <input type="checkbox" value={item.id} onClick={handleChangeCategoryId}/>{' '}{item.name}
                  </label>
                ))} 
              </div>
              <button className="button" type="submit" style={{backgroundColor: 'red', width: '100%'}}>Add</button> 
          </form>
      </div>
    );
}

export default AddProduct;