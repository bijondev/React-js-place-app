import React from 'react'
import Input from '../../shared/components/ui/Input'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook'



const NewPlace = () => {
    const [formState, inputHandeler] = useForm({
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
        },
    }, false);


    const addBtn = !formState.isValid ? (
        <button type='submit' disabled className="btn-blue-diesable">Update Place</button>
    ) : (
        <button type="submit" className="btn-blue-enable">Update Place</button>
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