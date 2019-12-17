import React from 'react';

function Title(props) {
  return (
    <h1 className={props.class}>{props.title}{props.addtitle}</h1>
  )
}

export default Title