import React, { useState, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

export const WebSocketDemo = () => {
  //Public API that will echo messages sent to it back to the client
    const [socketUrl, setSocketUrl] = useState('wss://stream.binance.com:9443/ws/btcusdt@trade');
    const [socketUrlmarkPrice, setSocketUrlmarkPrice] = useState('wss://stream.binance.com:9443/ws/btcusdt@markPrice');

    const [socketUrlDoge, setSocketUrlDoge] = useState('wss://stream.binance.com:9443/ws/dogeusdt@trade');
    const [socketUrlBnb, setSocketUrlBnb] = useState('wss://stream.binance.com:9443/ws/bnbusdt@trade');
    const [socketUrleth, setSocketUrleth] = useState('wss://stream.binance.com:9443/ws/ethusdt@trade');
    const [socketUrlada, setSocketUrlada] = useState('wss://stream.binance.com:9443/ws/adausdt@trade');

    const [ busco, setBusco ] = useState(false);

    const [ fundingsRates, setfundingsRates ] = useState();
    const [price, setPrice ] = useState({});
    const [fundingBtc, setfundingBtc ] = useState({});
    const [priceDoge, setPriceDoge ] = useState({});
    const [priceBnb, setPriceBnb ] = useState({});
    const [priceEth, setPriceEth ] = useState({});
    const [priceAda, setPriceAda ] = useState({});

    const [a_doge, setA_doge] = useState("");
    const [a_btc, setA_btc] = useState("");
    const [a_bnb, setA_bnb] = useState("");
    const [a_eth, setA_eth] = useState("");
    const [a_ada, setA_ada] = useState("");


    const [dogeBuyPrice, setdogeBuyPrice] = useState();
    const [dogeBuyProfit, setdogeBuyProfit] = useState();
    const [dogeBuyPricePercent, setdogeBuyPricePercent] = useState();
    const [dogeBuyPriceQuantity, setdogeBuyPriceQuantity] = useState();

    useEffect(async()=>{
        if(!busco){

            // const fundingResponse = await axios.get('binance.com/fapi/v1/premiumIndex')
            // console.log('fundingResponse.data',fundingResponse.data)
            // setfundingsRates(fundingResponse.data);
            // setBusco(true)
        }
        // console.log('dogeBuyPrice',dogeBuyPrice)
        if(dogeBuyPrice){
            if(dogeBuyPrice <= parseFloat(priceDoge.p)){
                // console.log('si?')
                let sustract = parseFloat(priceDoge.p) - dogeBuyPrice;
                let percent = sustract * 100 / parseFloat(priceDoge.p);
                setdogeBuyPricePercent(<span style={{"color":"green","fontWeight":"bold"}}>+ {percent.toFixed(2)} %</span>);
                setdogeBuyProfit(<span style={{"color":"green","fontWeight":"bold"}}>+ {dogeBuyPriceQuantity * parseFloat(priceDoge.p).toFixed(2)} usd</span>);
            
            }else{

                // console.log('dogeBuyPrice',dogeBuyPrice)
                let sustract = parseFloat(priceDoge.p) - dogeBuyPrice;
                let percent = sustract * 100 / parseFloat(priceDoge.p);

                setdogeBuyPricePercent(<span style={{"color":"red","fontWeight":"bold"}}> {percent.toFixed(2)} %</span>);
                setdogeBuyProfit(<span style={{"color":"red","fontWeight":"bold"}}> { dogeBuyPriceQuantity * parseFloat(priceDoge.p).toFixed(2)} usd</span>);

            }
        }else{
            setdogeBuyPricePercent("");
        }
        
    },[priceDoge,dogeBuyPrice])

    const handlePriceClick = (price,symbol) => {
        if(symbol == 'a_doge'){
            setA_doge(price)
        }
        if(symbol == 'a_btc'){
            setA_btc(price)
        }
        if(symbol == 'a_bnb'){
            setA_bnb(price)
        }
        if(symbol == 'a_eth'){
            setA_eth(price)
        }
        if(symbol == 'a_ada'){
            setA_ada(price)
        }
    }

    const handlePrecioCompra = (symbol,price) => {
        if(symbol == 'doge'){
            setdogeBuyPrice(price)
        }
    }
    const {sendMessagemarkPrice,lastMessagemarkPrice, readyStatemarkPrice } = useWebSocket(socketUrlmarkPrice,{
        onOpen: () => console.log('opened markPrice btc'),
        //Will attempt to reconnect on all close events, such as server shutting down
        shouldReconnect: (closeEvent) => true,
        onMessage: async (message) => {
            console.log('markPrice',JSON.parse(message.data))
            // setSocketUrlmarkPrice(JSON.parse(message.data))
            setfundingBtc(JSON.parse(message.data))
        }
    });
    const {sendMessage,lastMessage, readyState } = useWebSocket(socketUrl,{
        onOpen: () => console.log('opened btc'),
        //Will attempt to reconnect on all close events, such as server shutting down
        shouldReconnect: (closeEvent) => true,
        onMessage: async (message) => {
            // console.log(JSON.parse(message.data));
         
            // E: 1625834175616 // Event time
            // M: true
            // T: 1625834175616 // Trade time
            // a: 6785080512 // Aggregate trade ID
            // b: 6785080493
            // e: "trade" // Event type
            // m: true // Is the buyer the market maker?
            // p: "32749.99000000" // Price
            // q: "0.00037600" // Quantity
            // s: "BTCUSDT" // Symbol
            // t: 950446144
            setPrice(JSON.parse(message.data))
        }
    });
    const {
        sendMessagedoge,
        lastMessagedoge,
        readyStatedoge,
    } = useWebSocket(socketUrlDoge,{
        onOpen: () => console.log('opened dogeCoin'),
        //Will attempt to reconnect on all close events, such as server shutting down
        shouldReconnect: (closeEvent) => true,
        onMessage: async (message) => {
            setPriceDoge(JSON.parse(message.data))
        }
    });
    const {
        sendMessagebnb,
        lastMessagebnb,
        readyStatebnb,
    } = useWebSocket(socketUrlBnb,{
        onOpen: () => console.log('opened bnb'),
        //Will attempt to reconnect on all close events, such as server shutting down
        shouldReconnect: (closeEvent) => true,
        onMessage: async (message) => {
            setPriceBnb(JSON.parse(message.data))
        }
    });
    const {
        sendMessageeth,
        lastMessageeth,
        readyStateeth,
    } = useWebSocket(socketUrleth,{
        onOpen: () => console.log('opened eth'),
        //Will attempt to reconnect on all close events, such as server shutting down
        shouldReconnect: (closeEvent) => true,
        onMessage: async (message) => {
            setPriceEth(JSON.parse(message.data))
        }
    });
    const {
        sendMessageada,
        lastMessageada,
        readyStateada,
    } = useWebSocket(socketUrlada,{
        onOpen: () => console.log('opened ada'),
        //Will attempt to reconnect on all close events, such as server shutting down
        shouldReconnect: (closeEvent) => true,
        onMessage: async (message) => {
            setPriceAda(JSON.parse(message.data))
        }
    });
 

  return (
    <div className="container p-5">
        <div className="text-center">
            <h2 style={{'color':"rgb(240, 185, 11)"}}>Precios de Binance</h2>
        </div>
        <div className="card mt-4">
            <div className="card-body transparente">
                <div className="row">
                    <div className="col-md-4">
                        <h6> <span className="badge bg-secondary" style={{'color':'rgb(240, 185, 11)'}}>Precio Btc</span></h6>
                        <h3 className="price" onClick={ () => handlePriceClick(parseFloat(price.p),'a_btc')}> {parseFloat(price.p) } USD</h3>
                        <h5 className="" title="Cantidad por trade"> {parseFloat(price.q) } Btc {priceDoge.m ? <span className="" style={{'color':'green','fontWeight':"bold"}}>BuyerMaker</span> : null}</h5>
                   </div>
                    <div className="col-md-4">
                        <label><input type="checkbox" title="Activar/Desactivar Alarma" className="mr-2"/> </label>
                        <label><input type="number" style={{"width":"100px"}} min="0" value={a_btc} step="0.1" onChange={ (e)=> setA_btc(e.target.value) } title="Precio de Alarma" placeholder="P. de Alarma" /></label>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        </div>
        <div className="card">
            <div className="card-body transparente">
                <div className="row">
                    <div className="col-md-4">
                        <h6> <span className="badge bg-secondary" style={{'color':'rgb(240, 185, 11)'}}>Precio Bnb</span></h6>
                        <h3 className="price" onClick={ () => handlePriceClick(parseFloat(priceBnb.p),'a_bnb')}> {parseFloat(priceBnb.p) } USD</h3>
                        <h5 className="" title="Cantidad por trade"> {parseFloat(priceBnb.q) } Bnb {priceBnb.m ? <span className="" style={{'color':'green','fontWeight':"bold"}}>BuyerMaker</span> : null}</h5>
                   </div>
                    <div className="col-md-4">
                        <label><input type="checkbox" title="Activar/Desactivar Alarma" className="mr-2"/> </label>
                        <label><input type="number" style={{"width":"100px"}} min="0" value={a_bnb} step="0.1" onChange={ (e)=> setA_bnb(e.target.value) } title="Precio de Alarma" placeholder="P. de Alarma" /></label>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        </div>
        <div className="card">
            <div className="card-body transparente">
                <div className="row">
                    <div className="col-md-4">
                        <h6> <span className="badge bg-secondary" style={{'color':'rgb(240, 185, 11)'}}>Precio Eth</span></h6>
                        <h3 className="price" onClick={ () => handlePriceClick(parseFloat(priceEth.p),'a_eth')}> {parseFloat(priceEth.p) } USD</h3>
                        <h5 className="" title="Cantidad por trade"> {parseFloat(priceEth.q) } Eth {priceEth.m ? <span className="" style={{'color':'green','fontWeight':"bold"}}>BuyerMaker</span> : null}</h5>
                   </div>
                    <div className="col-md-4">
                        <label><input type="checkbox" title="Activar/Desactivar Alarma" className="mr-2"/> </label>
                        <label><input type="number" style={{"width":"100px"}} min="0" value={a_eth} step="0.1" onChange={ (e)=> setA_eth(e.target.value) } title="Precio de Alarma" placeholder="P. de Alarma" /></label>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        </div>
        <div className="card">
            <div className="card-body transparente">
                <div className="row">
                    <div className="col-md-4">
                        <h6> <span className="badge bg-secondary" style={{'color':'rgb(240, 185, 11)'}}>Precio Ada</span></h6>
                        <h3 className="price" onClick={ () => handlePriceClick(parseFloat(priceAda.p),'a_ada')}> {parseFloat(priceAda.p) } USD</h3>
                        <h5 className="" title="Cantidad por trade"> {parseFloat(priceAda.q) } Ada {priceAda.m ? <span className="" style={{'color':'green','fontWeight':"bold"}}>BuyerMaker</span> : null}</h5>
                   </div>
                    <div className="col-md-4">
                        <label><input type="checkbox" title="Activar/Desactivar Alarma" className="mr-2"/> </label>
                        <label><input type="number" style={{"width":"100px"}} min="0" value={a_ada} step="0.1" onChange={ (e)=> setA_ada(e.target.value) } title="Precio de Alarma" placeholder="P. de Alarma" /></label>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        </div>
        <div className="card">
            <div className="card-body transparente">
                <div className="row">
                    <div className="col-md-4">
                        <h6> <span className="badge bg-secondary" style={{'color':'rgb(240, 185, 11)'}}>Precio Dogecoin</span></h6>
                        <h3 className="price" onClick={ () => handlePriceClick(parseFloat(priceDoge.p),'a_doge')}> {parseFloat(priceDoge.p) } USD</h3>
                        <h5 className="" title="Cantidad por trade"> {parseFloat(priceDoge.q) } Doge {priceDoge.m ? <span className="" style={{'color':'green','fontWeight':"bold"}}>BuyerMaker</span> : null}</h5>

                    </div>
                    <div className="col-md-4">
                        <label><input type="checkbox" title="Activar/Desactivar Alarma" className="mr-2"/> </label>
                        <label><input type="number" style={{"width":"100px"}} min="0" value={a_doge} step="0.001" onChange={ (e)=> setA_doge(e.target.value) } title="Precio de Alarma" placeholder="P. de Alarma" /></label>
                    </div>
                    <div className="col-md-4">
                        <input type="text" style={{'textAlign':"center","width":"100px"}} value={dogeBuyPrice} title="Precio de Compra" onChange={ (e) => setdogeBuyPrice(e.target.value) } placeholder="Precio de Compra" className="mr-3"/>
                        <span className="" title="profit/loss percent" style={{'color':'rgb(240, 185, 11)'}}>{dogeBuyPricePercent}</span> 
                        <span style={{'display':"block"}}></span>
                        <input type="text" style={{'textAlign':"center","width":"100px"}} value={dogeBuyPriceQuantity} onChange={ (e) => setdogeBuyPriceQuantity(e.target.value) } title="Cantidad de Doge Comprado"  placeholder="Cantidad" className="mr-3"/>
                        <span className="" title="profit/loss" style={{'color':'rgb(240, 185, 11)'}}>{dogeBuyProfit}</span>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  );
};