import firestore from '../components/utils/config.js';
import React, {useState, useEffect} from 'react';

import Button from '../components/button/index.js';
// import Input from '../components/input/index.js';
import OrderCozinha from '../components/orderCozinha/index.js';
// import Card from '../components/card/index.js';
// import Header from '../components/Header/index.js';
// import Title from '../components/title/title.js';
// import Order from '../components/order/index.js';

const Kitchen = () => {

    const [client, setClient] = useState([])

    useEffect(() => {
        const order = []
        firestore.collection('client')
            .get().then((querySnapshot) => {
                querySnapshot.forEach (doc => {
                    order.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
                setClient(order)   

    })},[])

    
const updateStatus = (doc) =>{

    firestore.collection('client').doc(doc.id).update({
        status:'Pronto',
    })
}   
    return (
       
        <>
            <div>
                {client.map((doc, index) => 
                doc.status === 'Em Andamento' ? 
                   <div key ={index}>
                       <OrderCozinha 
                            name={doc.client}
                            mesa={doc.table}
                            total={doc.total}
                            productSelect={doc.productSelect}
                            
                        />
                        <Button text={'Pedido Pronto'} onClick={() => updateStatus(doc)}/>
                        
                        
                    </div>
                    : null
                
                )}
            </div>
        </>
    )

}

export default Kitchen;