import React from 'react'
import Card from '../../shared/components/ui/Card'
import Input from '../../shared/components/ui/Input'
import { useForm } from '../../shared/hooks/form-hook'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from '../../shared/util/validators'


const Auth = () => {
    const [formState, inputHandeler] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        },
    }, false);

    const addBtn = !formState.isValid ? (
        <button type='submit' disabled className="btn-blue-diesable">Update Place</button>
    ) : (
        <button type="submit" className="btn-blue-enable">Update Place</button>
    );

    const authSubmitHandeler = event => {
        event.preventDefault();
        console.log(formState);
    }


    return (
        <div className='flex flex-col items-center'>
            <Card>
                <form onSubmit={authSubmitHandeler}>
                    <h2>Login Required</h2>
                    <hr />
                    <Input
                        id="email"
                        element="input"
                        type="email"
                        label="E-mail"
                        validators={[VALIDATOR_EMAIL()]}
                        onInput={inputHandeler}
                        placeholder="Enter your Email"
                        errorText="Please enter a valid E-mail." />
                    <Input
                        id="password"
                        element="input"
                        type="password"
                        label="password"
                        validators={[VALIDATOR_MINLENGTH(6)]}
                        onInput={inputHandeler}
                        placeholder="Enter your Email"
                        errorText="Please enter a valid password, at least 6 character." />
                    {addBtn}
                </form>
            </Card>
        </div>
    )
}

export default Auth