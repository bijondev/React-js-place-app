import React, { useEffect, useReducer } from 'react'
import { validate } from '../../util/validators'

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH': {
            return {
                ...state,
                isTouched: true
            }
        }
        default:
            return state;
    }
};

const Input = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || '',
        isTouched: false,
        isValid: props.initialIsValid || false,
    });
    const { id, onInput } = props;
    const { value, isValid } = inputState;
    useEffect(() => {
        onInput(id, value, isValid)
    }, [id, onInput, value, isValid])

    const changeHandler = event => {
        dispatch({ type: 'CHANGE', val: event.target.value, validators: props.validators });
    };

    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        });
    };

    const element = props.element === 'input' ? (
        <input
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputState.value}
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${!inputState.isValid && 'border border-red-500 text-red-900 placeholder-red-700'} }`} />
    ) : (
        <textarea
            id={props.id}
            rows={props.rows || 3}
            onChange={changeHandler}
            value={inputState.value}
            onBlur={touchHandler}
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  ${!inputState.isValid ? ' border-red-500 text-red-900 placeholder-red-700' : ''}`} />
    );



    return (
        <div className='min-w-96'>
            <label htmlFor={props.id} className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${!inputState.isValid && 'text-red-500'}`} >{props.label}</label>
            {element}
            {!inputState.isValid && <p className='text-red-500'>{props.errorText}</p>}
        </div>
    )
}

export default Input