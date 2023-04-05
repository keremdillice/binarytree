import React from 'react'
import './UserSelection.css'; 
function UserSelection(props) {
    const incorrectStyle = {
        backgroundColor: 'red',
      };
    const correctStyle = {
        backgroundColor: 'green',
      };

    const open = "{"
    const close = "}"
    if (props.selection.length == 0) {
        return (
            <div className='selection'>
                <p style={{color:'yellow', fontWeight:'bold'}}>click a node to begin</p>
            </div>
            
        )
    } else if (props.truthState === null) {
        return (
            <div className='selection'>
                <p>your solution: {open} 
                {props.selection.map((item, index) => (
          <span key={item.value}>
            {item.value}
            {index < props.selection.length - 1 ? ', ' : ''}
          </span>
        ))}
        
                {close}</p>
                
            </div>
          )
    } else if (props.truthState === false) {
        
        return (
            <>
            <div className='selection' style={incorrectStyle}>
                <p>your solution: {open} 
                {props.selection.map((item, index) => (
          <span key={item.value}>
            {item.value}
            {index < props.selection.length - 1 ? ', ' : ''}
          </span>
        ))}
        
                {close}</p>
                
            </div>
            <div className='correct'>
                <p>correct solution: {open} 
                {props.order.map((item, index) => (
          <span key={item.value}>
            {item.value}
            {index < props.order.length - 1 ? ', ' : ''}
          </span>
        ))}
        
                {close}</p>
                
            </div>
            </>
            
          )
    } else {
        return (
            <div className='selection' style={correctStyle}>
                <p>your solution: {open} 
                {props.selection.map((item, index) => (
          <span key={item.value}>
            {item.value}
            {index < props.selection.length - 1 ? ', ' : ''}
          </span>
        ))}
        
                {close} is correct</p>
                
            </div>
          )
    }
  
}

export default UserSelection