import React from 'react';
import './NotationsInput.css';


function NotationsInput(props) {
    return (
        <form id="Input" onSubmit={props.parseNotations}> 
            <textarea placeholder="Place notations here..." 
                      value={props.notations} 
                      onChange={props.updateNotations} 
                      autoCorrect="false" spellCheck="false" />
            <input type="submit" value="Parse" />
        </form>
    );
}

export default NotationsInput;