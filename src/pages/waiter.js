import firestore from '../components/utils/config.js';
import React, {useState, useEffect} from 'react';
import Button from '../components/button/index.js';
import Input from '../components/input/index.js';
// import Card from '../components/card/index.js';
import Header from '../components/Header/index.js';
// import Title from '../components/title/title.js';
import Order from '../components/order/index.js'
import '../components/button/style.css';
import '../components/card/style.css';

const AddClientInfo = () => {
    const [client, setClient] = useState('');
    const [table, setTable] = useState('');
    const [productSelect, setproductSelect] = useState([]);
    const [total, setTotal] = useState(''); 
    const [itens1, setItens1] = useState([]);
    const [itens2, setItens2] = useState([]);
    const [menu, setMenu] = useState('breakfast');
    
    useEffect(() => {
        firestore.collection('menu')
            .get().then((snapshot) => {
                    const products = snapshot.docs.filter(doc =>doc.data().breakfast).map((doc) => ({
                        id: doc.id,
                        ...doc.data()
            }))
                    setItens1(products)

                    const products2 = snapshot.docs.filter(doc =>doc.data().lunch).map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                    setItens2(products2)
                })

        },[])

     
    function onSubmit(e) {
        e.preventDefault()
        
        firestore
            .collection('client')
            .add({
                client,
                table: parseInt(table),
                productSelect,
                total,
            })
            .then(()=>{
               setTable('')
               setClient('')
               setproductSelect([])
               setTotal('')
                
            }) 
    }
    
    const resumo = (item) =>{
        setproductSelect([...productSelect, item])              
    }

    const valorPedido = productSelect.reduce((acc,item) => acc + item.price, 0);

    const remove = (item) =>{
        const index = (productSelect.indexOf(item));
        productSelect.splice(index, 1);
        setproductSelect([...productSelect]);

    }

    return (
        <>
            <section className='App'>
                <Header text={"Burger Queen"}/>
                <div>
                    <Button text={'Breakfast'} handleClick={() => setMenu('breakfast') } />
                    <Button text={'All Day'} handleClick={() => setMenu('lunch') } />
                </div>
                
                <div className={'menu'}>
                    <Order 
                    menuItens={menu === "breakfast" ? itens1 : itens2} 
                    handleClick={resumo} 
                    name={productSelect.name} 
                    price={productSelect.price} key={productSelect.id}/>
                </div>
            </section>
            
            <section className={'menu'}>
                <div>
                    <label>
                        <strong>cliente</strong>
                    </label>
                    <Input id='input-client' type="text" state={client} handleChange={e => setClient(e.currentTarget.value)}/>
                    <label>
                        <strong>mesa</strong>
                    </label>
                    <Input id='input-number' type="number" state={table} handleChange={e => setTable(e.currentTarget.value)}/>
                </div>
                {productSelect.map((product, index) => (
                    <div key={index}> 
                        {product.name} R$ {product.price},00 
                        <Button text={'Del'} handleClick={(e) => {
                        e.preventDefault(); 
                        remove(product);
                        }}/>
                    </div>
                ))}
                    
                <p>Total:{valorPedido}</p>
                <Button id='button' handleClick={onSubmit} text={'Enviar'}/>
            </section>        
        </>    
    );
};

// function printMenu(props) {
//   console.log('tá indooooooo')  
// }
 


export default AddClientInfo;
