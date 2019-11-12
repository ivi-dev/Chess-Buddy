import React from 'react';
import './Input.css';


function Input(props) {
    return (
        <form id="Input" onSubmit={props.parseNotationsList}> 
            <textarea placeholder="Place notations here..." 
                      value={props.notationsList} 
                      onChange={props.updateNotationsList} 
                      autoCorrect="false" spellCheck="false" />
            <input type="submit" value="Parse" />
        </form>
    );
}

export default Input;