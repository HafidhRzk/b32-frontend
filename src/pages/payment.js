import Nav from "./components/navbar"
import Image2 from "./components/frame.png"
import Image3 from "./components/mouse.jpg"
import { Link } from 'react-router-dom'

function Payment(){
    return(
        <div className="base">
            <div className="inbase">
                <Nav />
                <PaymentForm />
            </div>
        </div>
    );
}

function PaymentForm(){
    return(
        <div style={{display: 'flex', margin: 'auto', padding: '30px', maxHeigth: '100vh', width: '100%', justifyContent: 'center'}}>
            <div style={{flex: '60%'}}>
                <div style={{display: 'flex', border: '1px solid white', borderRadius: '6px', padding: '10px', backgroundColor: 'rgb(53, 48, 48)', marginRight: '20px'}}>
                    <div style={{display: 'flex', flex: '50%'}}>
                        <img src={Image3} alt="" style={{width: '45%'}} />
                        <div style={{padding: '10px', textAlign: 'left'}}>
                            <h4 className="textred">Mouse</h4>
                            <div className="input-group input-group-sm mb-3">
                                <label for="qty" className="px-2">Qty</label>
                                <input type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" id="qty" />
                            </div>
                            <p>Price:@ Rp. 500.000</p>
                        </div>
                    </div>
                    <div style={{display: 'flex', flex: '50%', justifyContent: 'flex-end', alignItems: 'center'}}>
                        <img src={Image2} alt="" style={{width: '10vh', height: '10vh'}} />
                    </div>
                </div>
            </div>
            <div style={{flex: '40%', padding: '10px', marginRight: '150px'}}>
                <div>
                    <h2 style={{paddingBottom: '40px'}}>Payment Method</h2>
                </div>
                <div class="input-group mb-3">
                    <select class="custom-select" style={{width: '100%', padding: '10px'}}>
                        <option hidden>Pilih Pengiriman</option>
                        <option value="1">JKT</option>
                        <option value="2">JPN</option>
                        <option value="3">SiCepu</option>
                        <option value="4">AnterAha</option>
                    </select>
                </div>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"  style={{minHeight: '100px'}}>Address</span>
                    </div>
                    <textarea className="form-control"  style={{minHeight: '100px'}} aria-label="With textarea"></textarea>
                </div>
                <div class="input-group mb-3">
                    <select class="custom-select" style={{width: '100%', padding: '10px'}}>
                        <option hidden>Pembayaran</option>
                        <option value="1">COD</option>
                        <option value="2">Indomaret</option>
                        <option value="3">Alfamart</option>
                        <option value="4">Pom Bensin</option>
                    </select>
                </div>
                <h3 style={{textAlign: 'right', color: 'red'}}>Rp. 500.000</h3>
                <Link to="/profile"><button className="button" style={{backgroundColor: 'red', width: '100%'}}>PAY</button></Link>
            </div>
        </div>
    );
}

export default Payment;