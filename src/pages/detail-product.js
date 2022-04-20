import Nav from "./components/navbar"
import { useParams, useNavigate } from 'react-router-dom';
import convertRupiah from 'rupiah-format';
import { useQuery, useMutation } from 'react-query';

import { API } from '../config/api';

function Detail(){
    return(
        <div className="base">
            <div className="inbase">
                <Nav />
                <ContentDetail />
            </div>
        </div>
    );
}

function ContentDetail(){
    let navigate = useNavigate();
    let { id } = useParams();

    let { data: product } = useQuery('productCache', async () => {
        const response = await API.get('/product/' + id);
        return response.data.data;
    });

    const handleBuy = useMutation(async (e) => {
        try {
        e.preventDefault();

        const config = {
            headers: {
            'Content-type': 'application/json',
            },
        };

        const data = {
            idProduct: product.id,
            idSeller: product.user.id,
            price: product.price,
        };

        const body = JSON.stringify(data);

        await API.post('/transaction', body, config);

        navigate('/payment');
        } catch (error) {
        console.log(error);
        }
    });
    return(
        <div style={{display: 'flex', margin: 'auto', padding: '10px', maxHeigth: '100vh', width: '100%'}}>
            <div style={{flex: '40%'}}>
                <img src={product?.image} alt="" className="card"/>
            </div>
            <div style={{flex: '60%', padding: '10px', marginRight: '150px'}}>
                <div>
                    <h2 className="textred">{product?.name}</h2>
                    <p className="textred">Stock: {product?.qty}</p>
                </div>
                <p style={{textAlign: 'justify'}}>{product?.desc}</p>
                <h3 style={{textAlign: 'right', color: 'red'}}>{convertRupiah.convert(product?.price)}</h3>
                <button className="button" onClick={(e) => handleBuy.mutate(e)}
                style={{backgroundColor: 'red', width: '100%'}}>BUY</button>
            </div>
        </div>
    );
}

export default Detail;