import { useCallback, useReducer } from 'react';

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
        case 'SET_DATA':
            return {
                inputs: action.inputs,
                isValid: action.formIsValid
            };
        default:
            return state;
    }
}

export const useForm = (initialInput, InitialFormvalidity) => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInput,
        isValid: InitialFormvalidity
    });

    const inputHandeler = useCallback((id, value, isValid) => {
        dispatch({ type: 'INPUT_CHANGE', value: value, isValid: isValid, inputId: id })
    }, []);

    const setFormdata = useCallback((inputData, formValidity) => {
        dispatch({
            type: 'SET_DATA',
            inputs: inputData,
            formIsValid: formValidity
        });
    }, []);

    return [formState, inputHandeler, setFormdata]

}