// External Imports
import React from 'react';
// Notice we usually only import ReactDOM in src/index.js only.
import ReactDOM from 'react-dom';

// Internal Imports
import history from '../history';

const Modal = (props) => {
  // When we create a portal, the return value of our componet is going to change a bit.  
  // This createPortal() function is going to take two arguments.
  // * The first argument is going to be some jsx to show on the screen.
  // * The second argument is responsible for rendering this div under body.
  // Note: if we are actually going to render the modal as a child of the body, then
  //       we will be replacing everything inside the body with modal. So instead,
  //       we will go into index.html and create a new <div> with some id. Then,
  //       target that <div> to target and place our modal into.
  return ReactDOM.createPortal (
    <div onClick={() => history.push('/')} className="ui dimmer modals visible active">
      <div onClick={(e) => e.stopPropagation()} className="ui standard modal visible active">
        {/* Fill in modal with header, content, and actions. */}
        <div className="header">Delete Stream</div>
        <div className="content">Are you sure you want to delete this stream?</div>
        <div className="actions">
          <button className="ui button primary">Delete</button>
          <button className="ui button">Cancel</button>
        </div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;