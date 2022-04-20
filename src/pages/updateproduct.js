import Nav2 from './components/navbar2';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import React, { useState, useEffect } from 'react';
import CheckBox from './components/CheckBox';
import { API } from '../config/api';

function UpdateProduct (){
    return(
        <div className='base'>
            <div className="inbase">
                <Nav2 />
                <UpdateForm />
            </div>
        </div>
    );
}

function UpdateForm (){

  let navigate = useNavigate();
  const { id } = useParams();

    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState([]); 
    const [preview, setPreview] = useState(null);
    const [product, setProduct] = useState({});
    const [form, setForm] = useState({
      image: '',
      name: '',
      desc: '',
      price: '',
      qty: '',
    });

    useQuery('productCache', async () => {
      const response = await API.get('/product/' + id);
      setPreview(response.data.data.image);
      setForm({
        ...form,
        name: response.data.data.name,
        desc: response.data.data.desc,
        price: response.data.data.price,
        qty: response.data.data.qty,
      });
      setProduct(response.data.data);
    });

    useQuery('categoriesCache', async () => {
      const response = await API.get('/categories');
      setCategories(response.data.data);
    });

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
  
        // Configuration
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
  
        console.log(form);
  
        const response = await API.patch(
          '/product/' + product.id,
          formData,
          config
        );
        console.log(response.data);
  
        navigate('/product');
      } catch (error) {
        console.log(error);
      }
    });
  
    useEffect(() => {
     const newCategoryId = product?.categories?.map((item) => {
      return item.id;
    });

    setCategoryId(newCategoryId);
  }, [product]);

    return(
      <div style={{margin: 'auto', width: '80%'}}>
        <form className="container mx-auto my-3" onSubmit={(e) => handleSubmit.mutate(e)}>
            <h2 style={{textAlign: 'left', marginBottom: '20px',}}>Update Product</h2>
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
              <label for="upload" className="label-file-add-product"> Upload file</label>
            </div>
            <div className="mb-3">
              <input type="text" placeholder="Product Name" name="name" onChange={handleChange} 
              className="input-edit-category mt-4" style={{backgroundColor: 'rgb(53, 48, 48)',
              border: '1px solid white', borderRadius: '6px', width: '100%'}} value={form?.name}/>
            </div>
            <div className="mb-3">
              <textarea 
                placeholder="Product Desc" 
                name="desc" 
                onChange={handleChange} 
                className="input-edit-category mt-4" 
                style={{backgroundColor: 'rgb(53, 48, 48)', width: '100%', height: '130px', 
                border: '1px solid white', borderRadius: '6px'}} value={form?.desc}>
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
                border: '1px solid white', borderRadius: '6px'}} value={form?.price}/>
            </div>
            <div className="mb-3">
              <input
                type="number"
                placeholder="Stock"
                name="qty"
                onChange={handleChange}
                className="input-edit-category mt-4"
                style={{backgroundColor: 'rgb(53, 48, 48)', width: '100%', 
                border: '1px solid white', borderRadius: '6px'}}value={form?.qty}/>
            </div>
            <div className="card-form-input mt-4 px-2 py-1 pb-2">
                <div className="text-secondary mb-1" style={{ fontSize: '15px' }}>
                  Category
                </div>
                {product &&
                  categories?.map((item, index) => (
                    <label key={index} className="checkbox-inline me-4">
                      <CheckBox
                        categoryId={categoryId}
                        value={item?.id}
                        handleChangeCategoryId={handleChangeCategoryId}/>
                      <span className="ms-2">{item?.name}</span>
                    </label>
                  ))}
              </div>
            <button className="button" type="submit" style={{backgroundColor: 'red', width: '100%'}}>
              Update  
            </button> 
        </form>
      </div>
    );
}


export default UpdateProduct;