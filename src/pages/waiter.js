import firestore from '../components/utils/config.js';
import React, {useState, useEffect} from 'react';
import Button from '../components/button/index.js';
import Input from '../components/input/index.js';
import Content from '../components/content/index.js';
// import Card from '../components/card/index.js';
// import Header from '../components/Header/index.js';
// import Title from '../components/title/title.js';
import Order from '../components/order/index.js';
import './waiter.css';


const AddClientInfo = () => {
    const [client, setClient] = useState('');
    const [table, setTable] = useState('');
    const [productSelect, setProductSelect] = useState([]);
    const [itens1, setItens1] = useState([]);
    const [itens2, setItens2] = useState([]);
    const [menu, setMenu] = useState('breakfast');
    const [optionsAndExtra, setOptionsAndExtra] = useState([]);
    const [selectedOptionsAndExtra, setSelectedOpenOptionsAndExtra] = useState({});

    
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
                status: 'Em Andamento',
                table: parseInt(table),
                productSelect,
                total: totalOrder,
            })
            .then(()=>{
               setTable('')
               setClient('')
               setProductSelect([])

            }) 
    };
    
    const increaseUnit = product =>{
        // const productIndex = productSelect.findIndex(e => e.name === product.name)
        if(!productSelect.includes(product)) {
            product.contador = 1;
            setProductSelect([...productSelect, product])
        } else {
            product.contador += 1;
            setProductSelect([...productSelect])             
           }   
    };

    const decreaseUnit = (product) =>{
        if(product.contador === 1){
            const removeProductFromScreen = productSelect.filter(erase => { 
                return erase !== product;
            });
            setProductSelect([...removeProductFromScreen])             
        } else{
        product.contador --
        setProductSelect([...productSelect])             
        }
    };

    const openOptionsAndExtra = elem => { 
        if(elem.options.length !== 0){
            setOptionsAndExtra(elem) 
        } else {
            setOptionsAndExtra([]) 
            increaseUnit(elem);
        }
    };

    const addOptions = () =>{
        const teste2 = {
            ...optionsAndExtra,
            name: `${optionsAndExtra.name} ${selectedOptionsAndExtra.option} ${'com'} ${selectedOptionsAndExtra.extra}`
        };
        increaseUnit(teste2);
        setSelectedOpenOptionsAndExtra([]);
        setOptionsAndExtra([]);
    };

    const totalOrder = productSelect.reduce((acc,item) => acc + (item.contador * item.price), 0);


    const deletar = (item) =>{
        const index = (productSelect.indexOf(item));
        productSelect.splice(index, 1);
        setProductSelect([...productSelect]);
    }


        
    return (
        <div className={"waiter"}>
            
          
            <div className={'App'}>
                <section className={'menu'}>
                    <div className={'categoria'}>
                        <Button
                            className={'btn-options'}
                            text={'Breakfast'}
                            handleClick={() => setMenu('breakfast')}
                        />
                        <Button
                            className={'btn-options'}
                            text={'All Day'}
                            handleClick={() => setMenu('lunch')}
                        />
                    </div>

                    <div>
                        <Order
                            menuItens={menu === "breakfast" ? itens1 : itens2}
                            handleClick={openOptionsAndExtra}
                            name={productSelect.name}
                            price={productSelect.price}
                            key={productSelect.id}
                        />

                        <section >
                            {optionsAndExtra.length !== 0 ? (
                                <div className={'radio'}>
                                    <Content text={'Selecione seu tipo de hambúrguer e acompanhamento'} className={'content-total'} />
                                    {optionsAndExtra.options.map((elem, index) => (
                                        <div key={index} className={'radio-options'}>
                                            <input
                                                type="radio"
                                                name="types"
                                                value={optionsAndExtra.name}
                                                onClick={() => {
                                                    setSelectedOpenOptionsAndExtra({
                                                        ...selectedOptionsAndExtra,
                                                        option: elem
                                                    });
                                                }}
                                            />
                                            {elem}
                                        </div>
                                    ))}
                                    {optionsAndExtra.extra.map((elem, index) => (
                                        <div key={index} className={'radio-options'}>
                                            <input
                                                type="radio"
                                                name="extra"
                                                value={optionsAndExtra.name}
                                                onClick={() => {
                                                    setSelectedOpenOptionsAndExtra({
                                                        ...selectedOptionsAndExtra,
                                                        extra: elem
                                                    });
                                                }}
                                            />
                                            {elem}
                                        </div>
                                    ))}
                                    <Button className={'btn-send'} handleClick={addOptions} text={'Adicionar'}/>
                                </div>

                            ) : (
                                    false
                                )}
                        </section>
                    </div>
                </section>
                    <form className={'section'}>
                        <div>
                            <Input id='input-client' type="text" placeholder={'Nome do Cliente'} state={client} handleChange={e => setClient(e.currentTarget.value)} />
                            <Input id='input-number' type="number" placeholder={'Número da Mesa'} state={table} handleChange={e => setTable(e.currentTarget.value)} />
                        </div>
                        <Content text={'PEDIDOS'} className={'title'}/>
                        {productSelect.map((product, index) => (
                            <div key={index} className={'pedidos'}>
                                <Button
                                    className={'btn-small'}
                                    text={'+'}
                                    handleClick={(e) => {
                                        e.preventDefault()
                                        increaseUnit(product)}}
                                />
                                <Content className='content'
                                    text={product.contador}
                                />
                                <Button
                                    className={'btn-small'}
                                    text={'-'} handleClick={(e) => {
                                        e.preventDefault();
                                        decreaseUnit(product)}}
                                />
                                <Content className={'content'}
                                    name={product.name}/>
                                
                                <Content  className={'content'}
                                    price={product.price.toLocaleString('pt-BR',{ style: 'currency', currency:  'BRL' })}
                                />
                        
                                <Button
                                    className={'btn-small-del'}
                                    text={'Del'} handleClick={(e) => {
                                        e.preventDefault();
                                        deletar(product);

                                    }} />
                            </div>
                        ))}

                        <p className='content-total'>Total: {totalOrder.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            <div className={'send'}>
                        <Button id='button' className={'btn-send'} handleClick={onSubmit} text={'Enviar'} />
                            </div>
                    </form>
               
            </div>
        </div>
    );
};
        
export default AddClientInfo;
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
