import firestore from '../components/utils/config.js';
import React, {useState, useEffect} from 'react';
import Button from '../components/button/index.js';
import Input from '../components/input/index.js';
import Card from '../components/card/index.js';
import Header from '../components/Header/index.js';
import Title from '../components/title/title.js'
import '../components/button/style.css';
import '../components/card/style.css';

const AddClientInfo = () => {
    const [client, setClient] = useState('');
    const [table, setTable] = useState('');
    const [pedidos, setPedidos] = useState([]);
    // const [total, setTotal] = useState('');
    const [itens1, setItens1] = useState([]);
    const [itens2, setItens2] = useState([]);
    // const [menu, setMenu] = useState('');
    
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
                pedidos,
                // total,
            })
            .then(()=>{
               setTable('')
               setClient('')
               setPedidos([])
            //    setTotal('')
                
            }) 
    }
    
    const resumo = (item) =>{
        setPedidos([...pedidos, item])
    }

    return (
        <>
            <Header text={"Burger Queen"}/>

            <div>
                <div className='menu'>
                    <Title class='title-menu' title='Cardápio'/>
                    {itens1.map((breakfast) => <Card handleClick={() => resumo(breakfast)} key={breakfast.id} text={breakfast.name} price={breakfast.price}/>)}
                
                    {itens2.map((lunch) => <Card handleClick={() => resumo(lunch)} key={lunch.id} text={lunch.name} price={lunch.price} />)}
                
                    {pedidos.map(product => <div key={product.id}> {product.name} {product.price}</div>)}
                    <label>
                        <strong>cliente</strong>
                    </label>
                    <Input id='input-number' type="text" state={client} handleChange={e => setClient(e.currentTarget.value)}/>
                    <label>
                    <strong>mesa</strong>
                    </label>
                    <Input id='input-number' type="number" state={table} handleChange={e => setTable(e.currentTarget.value)}/>
                    <Button id='btn-food' handleClick={onSubmit} text={'Enviar'}/>
                </div>
            </div>
                
        </>
    );
    

 
};

// function printMenu(props) {
//   console.log('tá indooooooo')  
// }
 


export default AddClientInfo;
