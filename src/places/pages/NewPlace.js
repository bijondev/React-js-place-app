import React, { useCallback, useReducer } from 'react'
import Input from '../../shared/components/ui/Input'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators'


const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (inputId === action.inputs)
                    formIsValid = formIsValid && action.isValid;
                else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: { value: action.value, isValid: action.isValid }
                },
                isValid: formIsValid
            };
        default:
            return state;
    }
}

const NewPlace = () => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            },
            address: {
                value: '',
                isValid: false
            }
        },
        isValid: false
    });
    const inputHandeler = useCallback((id, value, isValid) => {
        dispatch({ type: 'INPUT_CHANGE', value: value, isValid: isValid, inputId: id })
    }, []);



    const addBtn = !formState.isValid ? (
        <button type='submit' disabled className="text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add Place</button>
    ) : (
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Place</button>
    );

    const placeSubmitHandeler = event => {
        event.preventDefault();

        console.log(formState.inputs);
    }


    return (
        <div className='flex flex-col items-center'>
            <form onSubmit={placeSubmitHandeler}>
                <Input
                    id="title"
                    element="input"
                    type="text"
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandeler}
                    placeholder="Enter yout Title"
                    errorText="Please enter a valid title."
                />
                <Input
                    id="description"
                    element="textarea"
                    type="text"
                    rows="3"
                    label="Description"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    onInput={inputHandeler}
                    placeholder="Enter yout Title"
                    errorText="Please enter a valid sescription (at last 5 character)."
                />
                <Input
                    id="address"
                    element="input"
                    type="text"
                    rows="3"
                    label="Addrtess"
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandeler}
                    placeholder="Enter yout Title"
                    errorText="Please enter a valid Address."
                />
                {addBtn}
            </form>
        </div>
    )
}

export default NewPlace