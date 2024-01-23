import React from 'react'
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group'

import Backdrop from './Backdrop';

const ModelOverlay = props => {
    const on_submit = props.onSubmit ? props.onSubmit : event => event.preventDefault();
    const content = (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className=" bg-black opacity-50 fixed inset-0"></div>
            <div className="w-1/2 bg-white p-4 rounded-md z-10">
                <header className="mb-4">
                    <h2 className='text-2xl'>{props.header}</h2>
                </header>
                <form onSubmit={on_submit}
                >
                    <div>
                        {props.children}
                    </div>
                    <footer className="mt-4 flex justify-end">
                        {props.footer}
                    </footer>
                </form>
            </div>
        </div>
    )
    return ReactDOM.createPortal(content, document.getElementById('model-hook'));
}

const Model = props => {
    return (
        <React.Fragment>
            {props.show && <Backdrop onClick={props.oncancel} />}
            <CSSTransition
                in={props.show}
                mountOnEnter
                unmountOnExit
                timeout={200}
            >
                <ModelOverlay {...props} />
            </CSSTransition>
        </React.Fragment>
    )
}

export default Model