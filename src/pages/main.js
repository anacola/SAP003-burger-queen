import React, {useState, useEffect} from 'react';
import firestore from '../config.js';
import Button from '../components/button/index.js'
import Input from '../components/input/index.js';
import '../components/button/style.css';


    // const Main = () => (
    //     <div className='Main'>
    //         <Input placeholder={'Nome'}/>
    //         <Input placeholder={'Mesa'}/>
            
    //     </div>
    // )
    
    const AddClientInfo = () => {
        const [client, setClient] = useState('');
        const [table, setTable] = useState('');
        const [pedidos, setPedidos] = useState('');
        const [total, setTotal] = useState('');
    
        function onSubmit(e) {
            e.preventDefault()
            
            firestore
                .collection('client')
                .add({
                    client,
                    table,
                    pedidos,
                    total,
                })
                .then(()=>{
                   setTable('')
                   setClient('')
                   setPedidos('')
                   setTotal('')
                    
                }) 
        }
      
      return (
        <div>
            <label>
                <strong>cliente</strong>
            </label>
            <Input id='input-number' type="number" state={client} handleChange={e => setClient(e.currentTarget.value)}/>
            <label>
                <strong>mesa</strong>
            </label>
            <Input id='input-number' type="number" state={table} handleChange={e => setTable(e.currentTarget.value)}/>
            <Button id='btn-food' handleClick={onSubmit} text={'Enviar'}/>
        </div>
       
       
      );
    };
    
    
    

    
export default AddClientInfo;
