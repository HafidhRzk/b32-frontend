import Nav from "./components/navbar"
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query';
import { API } from '../config/api';

function Homepage(){
    return(
        <div className="base">
            <div className="inbase">
                <Nav />
                <CardProduct />
            </div>
        </div>
    );
}

function CardProduct(){

    let { data: products } = useQuery('productsCache', async () => {
        const response = await API.get('/products');
        return response.data.data;
    });

    return(
        <div style={{margin: 'auto', padding: '10px'}}>
            <h2 className="textred">Product</h2>
            <div className="row">
                {products?.map((item, index) => (
                    <div className="col-2 px-3 py-3" item={item} key={index}>
                        <div className="card" style={{width: '13rem'}}>
                            <Link to={`/product/` + item.id}>
                                <img className="card-img-top" src={item.image} alt={item.name} />
                            </Link>
                            <div className="card-body" style={{textAlign: 'left'}}>
                                <h5 className="card-title textred" >{item.name}</h5>
                                <p className="card-text">{item.price}</p>
                                <p className="card-text">{item.stock}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Homepage;