import Nav2 from "./components/navbar2"
import { useNavigate } from 'react-router';
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'react-query';
import DeleteData from './components/DeleteData';

import { API } from '../config/api';

function Category(){
    return(
        <div className="base">
            <div className="inbase">
                <Nav2 />
                <ListCategory />
            </div>
        </div>
    );
}

function ListCategory(){

    const navigate = useNavigate();

    const [idDelete, setIdDelete] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let { data: categories, refetch } = useQuery('categoriesCache', async () => {
        const response = await API.get('/categories');
        return response.data.data;
    });

    const handleEdit = (id) => {
        navigate(`/updatecategory/${id}`);
    };

    const handleDelete = (id) => {
        setIdDelete(id);
        handleShow();
    };

    const deleteById = useMutation(async (id) => {
        try {
        await API.delete(`/category/${id}`);
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

    const addCategory = () => {
        navigate('/addcategory');
    };

    return(
        <div style={{display: 'flex', margin: 'auto', padding: '10px'}}>
            <div style={{padding: '10px', width: '100%'}}>
                <div style={{padding: '10px', display: 'flex'}}>
                    <h2 className="textred" style={{flex: '90%'}}>List Product</h2>
                    <div style={{flex: '10%'}}>
                        <button type="button" onClick={addCategory} className="btn btn-dark btn-block px-4">Add</button>
                    </div>
                </div>
                <div>
                    <table className="table table-striped table-dark">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Category Name</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories?.map((item, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>
                                        <div style={{display: 'flex', justifyContent: 'center'}}>
                                            <div className="px-1">
                                                <button type="button" 
                                                className="btn btn-success btn-block px-4 mx-auto"
                                                onClick={() => {
                                                    handleEdit(item.id);
                                                  }}>Edit</button>
                                            </div>
                                            <div className="px-1">
                                                <button type="button" 
                                                className="btn btn-danger btn-block px-4 mx-auto"
                                                onClick={() => {
                                                    handleDelete(item.id);
                                                  }}>Delete</button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <DeleteData setConfirmDelete={setConfirmDelete} show={show} handleClose={handleClose}/>
        </div>
    );
}

export default Category;