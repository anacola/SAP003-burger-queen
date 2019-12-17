// import React, {useState} from 'react';
// import firestore from '../components/utils/config.js';
// import Button from '../components/button/index.js'
// import Input from '../components/input/index.js';
// import '../components/button/style.css';
// import Menu from '../pages/menu.js'
// // import Header from '../components/Header/header.js'


//     const AddClientInfo = () => {
//         const [client, setClient] = useState('');
//         const [table, setTable] = useState('');
//             const [pedidos, setPedidos] = useState('');
//             const [total, setTotal] = useState('');
    
//         function onSubmit(e) {
//             e.preventDefault()
            
//             firestore
//                 .collection('client')
//                 .add({
//                     client,
//                     table,
//                     pedidos,
//                     total,
//                 })
//                 .then(()=>{
//                    setTable('')
//                    setClient('')
//                    setPedidos('')
//                    setTotal('')
                    
//                 }) 
//         }

//       return (
//         <div>
//             <label>
//                 <strong>cliente</strong>
//             </label>
//             <Input id='input-number' type="text" state={client} handleChange={e => setClient(e.currentTarget.value)}/>
//             <label>
//                 <strong>mesa</strong>
//             </label>
//             <Input id='input-number' type="number" state={table} handleChange={e => setTable(e.currentTarget.value)}/>
//             <Button id='btn-food' handleClick={onSubmit} text={'Enviar'}/>
//             <Menu/>
//         </div>
       
//       );
//     };
    
     

    
// export default AddClientInfo;
