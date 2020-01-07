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
    const [productSelect, setProductSelect] = useState([]);
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
                total: valorPedido,
            })
            .then(()=>{
               setTable('')
               setClient('')
               setProductSelect([])
               setTotal('')
            }) 
    }
    
    const increaseUnit = (product) =>{
        if(!productSelect.includes(product)) {
            product.contador = 1;
            setProductSelect([...productSelect, product])
        } else {
            product.contador += 1;
            setProductSelect([...productSelect])             
           }   
    }

    const valorPedido = productSelect.reduce((acc,item) => acc + (item.contador * item.price), 0);


    function decreaseUnit(product) {
        if(product.contador === 1){
            const removeProductFromScreen = productSelect.filter((erase) => { 
                return erase !== product;
            })
            setProductSelect([...removeProductFromScreen])             
        } else{
        product.contador --
        setProductSelect([...productSelect])             
        }
    }
   
    const deletar = (item) =>{
        const index = (productSelect.indexOf(item));
        productSelect.splice(index, 1);
        setProductSelect([...productSelect]);

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
                    handleClick={increaseUnit} 
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
                        <Button text={'+'} handleClick={()=> increaseUnit(product)} />
                        {product.contador}
                        <Button text={'-'} handleClick={() => decreaseUnit(product)}/>
                        {product.name} {product.price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                        <Button text={'Del'} handleClick={(e) => {
                        e.preventDefault(); 
                        deletar(product);
                        
                        }}/>
                    </div>
                ))}
                    
                <p>Total:{valorPedido.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</p>
                <Button id='button' handleClick={onSubmit} text={'Enviar'}/>
            </section>        
        </>    
    );
};

export default AddClientInfo;
