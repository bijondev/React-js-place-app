import React from 'react'
import Model from './Model'

const ErrorModel = props => {
    return (
        <Model
            onCancel={props.onClear}
            header="An error Occurred!"
            show={!!props.error}
            footer={
                <button onClick={props.onClear} className="btn-red">Okay</button>
            }
        >
            <p>{props.error}</p>
        </Model>
    )
}

export default ErrorModel