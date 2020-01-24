import React from 'react';

function Others(props) {
    return props.list.map((elem, index) => (
        <div key={index} className='radio-options'>
            <input
                type="radio"
                name={props.name}
                value={props.value}
                onClick={() => props.setOther({
                    ...props.selectedOther,
                    [props.name]: elem
                })}
            />
            {elem}
        </div>
    ));
}

export default Others;