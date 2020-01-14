import firestore from '../components/utils/config.js';
import React, {useState, useEffect} from 'react';
import Button from '../components/button/index.js';
import OrderCozinha from '../components/orderCozinha/index.js';
import Header from '../components/Header/index.js'
import './delivery.css';


const Delivery = () => {

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
        status:'Entregue',

    })
    setClient(client.filter(item => item.id !== doc.id))
};  
    return (

        <>
            <Header
                alt={'Burger Queen'}
            />
            <div className={'all'}>
                {client.map((doc, index) =>
                    doc.status === 'Pronto' ?
                        <div key={index} className={'delivery'}>
                            <OrderCozinha
                                name={doc.client}
                                mesa={doc.table}
                                total={doc.total}
                                productSelect={doc.productSelect}

                            />
                            <Button className={'btn-cozinha'} text={'Pedido Entregue'} handleClick={() => updateStatus(doc)} />


                        </div>
                        : null

                )}
            </div>
        </>
    )

}

export default Delivery;