import React, {useState, useEffect} from 'react';
import firestore from '../components/utils/config.js';

function Menu() {
    const [itens1, setItens1] = useState([]);
    const [itens2, setItens2] = useState([]);
    // const [menu, setMenu] = useState();

    useEffect(() => {
        firestore.collection("menu")
            .where('breakfast', '==', true)
                .onSnapshot((snapshot)=> {
                    const products = snapshot.docs.map((doc)=>({
                        id: doc.id,
                        ...doc.data()
                    }))
                    setItens1(products)
                })
    },[])

    useEffect(() => {
        firestore.collection("menu")
            .where('lunch', '==', true)
                .onSnapshot((snapshot)=> {
                    const products = snapshot.docs.map((doc)=>({
                        id: doc.id,
                        ...doc.data()
                    }))
                    setItens2(products)
                })
    },[])
    return (
        <div>
            {itens1.map((teste)=> 
            <div key ={teste.id}> 
            {teste.name}
            </div>
            )}
            {itens2.map((teste2)=>
            <div key={teste2.id}>
            {teste2.name}
            </div>
            )}

        </div>
    )
}



export default Menu;