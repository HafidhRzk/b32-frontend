import Nav from "./components/navbar"
import Image from "./components/man.jpg"
import Image2 from "./components/frame.png"
import React, { useContext, useState, useEffect } from 'react';
// import dateFormat from 'dateformat';
import convertRupiah from 'rupiah-format';
import { useQuery } from 'react-query';
import { UserContext } from '../context/userContext';
import { API } from '../config/api';

function Profile(){
    return(
        <div className="base">
            <div className="inbase">
                <Nav />
                <ContentProfile />
            </div>
        </div>
    )
}

function ContentProfile(){
    const [state] = useContext(UserContext);

    let { data: profile } = useQuery('profileCache', async () => {
        const response = await API.get('/profile');
        return response.data.data;
    });

    return(
        <div style={{display: 'flex', margin: 'auto', padding: '10px'}}>
            <div style={{padding: '10px', display: 'flex', width: '100%'}}>
                <div style={{flex: '50%'}}>
                    <h2 className="textred">My Profile</h2>
                    <div style={{display: 'flex'}}>
                        <div>
                            <img src={profile?.image ? profile.image : Image} alt="" style={{width: '18rem'}}/>
                        </div>
                        <div style={{padding: '10px', textAlign: 'left'}}>
                            <div>
                                <h4 className="textred">Nama</h4>
                                <p>{state.user.name}</p>
                            </div>
                            <div>
                                <h4 className="textred">Email</h4>
                                <p>{state.user.email}</p>
                            </div>
                            <div>
                                <h4 className="textred">Phone</h4>
                                <p>{profile?.phone ? profile?.phone : '-'}</p>
                            </div>
                            <div>
                                <h4 className="textred">Gender</h4>
                                <p>{profile?.gender ? profile?.gender : '-'}</p>
                            </div>
                            <div>
                                <h4 className="textred">Address</h4>
                                <p>{profile?.address ? profile?.address : '-'}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{flex: '50%'}}>
                    <div>
                        <h2 className="textred">My Transaction</h2>
                        <CardTransaction />
                    </div>
                </div>
            </div>
        </div>
    );
}

function CardTransaction (){

    let { data: transactions } = useQuery('transactionsCache', async () => {
        const response = await API.get('/transactions');
        return response.data.data;
    });

    return(
    <div>
        {transactions?.map((item, index) => (
        <div key={index} style={{display: 'flex', border: '1px solid white', borderRadius: '6px', padding: '10px', backgroundColor: 'rgb(53, 48, 48)', marginRight: '20px'}}>
            <div style={{display: 'flex', flex: '50%'}}>
                <img src={item.product.image} alt="" style={{width: '45%'}} />
                <div style={{padding: '10px', textAlign: 'left'}}>
                    <h4 className="textred">{item.product.name}</h4>
                    <h6 className="textred">{item.createdAt}</h6>
                    <p>Price: {convertRupiah.convert(item.price)}</p>
                    <h4>Subtotal : {convertRupiah.convert(item.price)}</h4>
                </div>
            </div>
            <div style={{display: 'flex', flex: '50%', justifyContent: 'flex-end', alignItems: 'center'}}>
                <img src={Image2} alt="" style={{width: '10vh', height: '10vh'}} />
            </div>
        </div>
        ))}
    </div>
    );
}

export default Profile;