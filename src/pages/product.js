import Nav2 from "./components/navbar2"
import { useNavigate } from 'react-router';
import React, { useState, useEffect } from 'react';
import ShowMoreText from 'react-show-more-text';
import rupiahFormat from 'rupiah-format';
import { useQuery, useMutation } from 'react-query';
import DeleteData from './components/DeleteData';
import { API } from '../config/api';

function Product(){
    return(
        <div className="base">
            <div className="inbase">
                <Nav2 />
                <AddProduct />
            </div>
        </div>
    );
}

function AddProduct(){

    const navigate = useNavigate();

    const addProduct = () => {
        navigate('/addproduct');
    };

    const handleUpdate = (id) => {
        navigate('/updateproduct/'+ id );
    };

    const [idDelete, setIdDelete] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let { data: products, refetch } = useQuery('productsCache', async () => {
        const response = await API.get('/products');
        return response.data.data;
    });

    const handleDelete = (id) => {
        setIdDelete(id);
        handleShow();
    };

    const deleteById = useMutation(async (id) => {
        try {
        await API.delete(`/product/${id}`);
        refetch();
        } catch (error) {
        console.log(error);
        }
    });

    useEffect(() => {
        if (confirmDelete) {
        handleClose();
        deleteById.mutate(idDelete);
        setConfirmDelete(null);
        }
    }, [confirmDelete]);

    return(
        <div style={{display: 'flex', margin: 'auto', padding: '10px'}}>
            <div style={{padding: '10px', width: '100%'}}>
                <div style={{padding: '10px', display: 'flex'}}>
                    <h2 className="textred" style={{flex: '90%'}}>List Product</h2>
                    <div style={{flex: '10%'}}>
                        <button type="button" onClick={addProduct} className="btn btn-dark btn-block px-4">Add</button>
                    </div>
                </div>
                <div>
                    <table className="table table-striped table-dark">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Photo</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Product Desc</th>
                                <th scope="col">Price</th>
                                <th scope="col">Qty</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                                {products?.map((item, index) => (
                                <tr key={index}>
                                    <th scope="row">{index+1}</th>
                                    <td>{item.name}.jpg</td>
                                    <td>{item.name}</td>
                                    <td>
                                    <ShowMoreText
                                        lines={1}
                                        more="show"
                                        less="hide"
                                        className="content-css"
                                        anchorClass="my-anchor-css-class"
                                        expanded={false}
                                        width={280}
                                        >
                                        {item.desc}
                                    </ShowMoreText>
                                    </td>
                                    <td>{rupiahFormat.convert(item.price)}</td>
                                    <td>{item.qty}</td>
                                    <td>
                                        <div style={{display: 'flex', justifyContent: 'center'}}>
                                            <div className="px-1">
                                                <button type="button" onClick={() => 
                                                    {handleUpdate(item.id);}} 
                                                    className="btn btn-success btn-block px-4">Edit</button>
                                            </div>
                                            <div className="px-1">
                                                <button type="button" onClick={() => 
                                                    {handleDelete(item.id);}} 
                                                    className="btn btn-danger btn-block px-4">Delete</button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <DeleteData
                setConfirmDelete={setConfirmDelete}
                show={show}
                handleClose={handleClose}
            />
        </div>
    );
}

export default Product;