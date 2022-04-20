import React from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from './context/userContext';

import Login from './pages/login';
import Register from './pages/register';
import Profile from './pages/profile';
import Homepage from './pages/homepage';
import Product from './pages/product';
import Detail from './pages/detail-product';
import Category from './pages/category';
import Complain from './pages/complain';
import ComplainAdmin from './pages/complainAdmin';
import Payment from './pages/payment';
import AddProduct from './pages/addproduct';
import UpdateProduct from './pages/updateproduct';
import AddCategory from './pages/addcategory';
import UpdateCategory from './pages/updatecategory';

import { API, setAuthToken } from './config/api';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  console.log(state);
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (state.isLogin === false) {
      navigate('/');
    } else {
      if (state.user.status === 'admin') {
        navigate('/product');
      } else if (state.user.status === 'customer') {
        navigate('/homepage');
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');

      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      let payload = response.data.data.user;
      payload.token = localStorage.token;

      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  },[]);
  return (
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<Detail />} />
        <Route path="/category" element={<Category />} />
        <Route path="/complain" element={<Complain />} />
        <Route path="/complainadmin" element={<ComplainAdmin />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/updateproduct/:id" element={<UpdateProduct />} />
        <Route path="/addcategory" element={<AddCategory />} />
        <Route path="/updatecategory/:id" element={<UpdateCategory />} />

      </Routes>
  );
}

export default App;
