// import React, {useState, useEffect} from 'react';
// import firestore from '../components/utils/config.js';
// import Card from '../components/card/index.js'
// import Header from '../components/Header/header.js'
// import AddClientInfo from './main.js'
// import '../components/card/style.css'

// function Menu() {
//     const [itens1, setItens1] = useState([]);
//     const [itens2, setItens2] = useState([]);
//     // const [menu, setMenu] = useState();

//     useEffect(() => {
//         firestore.collection("menu")
//             .where('breakfast', '==', true)
//                 .onSnapshot((snapshot)=> {
//                     const products = snapshot.docs.map((doc)=>({
//                         id: doc.id,
//                         ...doc.data()
//                     }))
//                     setItens1(products)
//                 })
//     },[])

//     useEffect(() => {
//         firestore.collection("menu")
//             .where('lunch', '==', true)
//                 .onSnapshot((snapshot)=> {
//                     const products = snapshot.docs.map((doc)=>({
//                         id: doc.id,
//                         ...doc.data()
//                     }))
//                     setItens2(products)
//                 })
//     },[])

    
//     return (
//         <>
//             <Header text={"Burger Queen"}/>

//             <AddClientInfo />
//                 <div>
//                     {itens1.map((breakfast)=> 
//                     <Card key={breakfast.id} text={breakfast.name} handleClick={e => printMenu(e.currentTarget.value)}/> 
//                     )}
//                     {itens2.map((lunch)=>
//                     <Card key={lunch.id} text={lunch.name} price={lunch.price}/>
//                     )}
//                 </div>    
//         </>
//     )
// }

// function printMenu() {
//     (console.log("ta indo"))
// }



// export default Menu;