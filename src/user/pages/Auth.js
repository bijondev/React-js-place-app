import React, { useState, useContext } from 'react'
import Card from '../../shared/components/ui/Card'
import Input from '../../shared/components/ui/Input'
import { authContext } from '../../shared/context/auth-context'
import { useForm } from '../../shared/hooks/form-hook'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from '../../shared/util/validators'


const Auth = () => {

    const auth = useContext(authContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [formState, inputHandeler, setFormdata] = useForm({
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
        <button type='submit' disabled className="btn-blue-diesable">
            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </button>
    ) : (
        <button type="submit" className="btn-blue-enable">
            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </button>
    );

    const authSubmitHandeler = event => {
        event.preventDefault();
        console.log(formState);
        auth.login();
    }

    const switchModeHandeler = () => {
        if (!isLoginMode) {
            setFormdata({
                ...formState.inputs,
                name: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid
            );
        }
        else {
            setFormdata({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, false);
        }
        setIsLoginMode(prevMode => !prevMode);
    }


    return (
        <div className='flex flex-col items-center'>
            <Card>
                <form onSubmit={authSubmitHandeler}>
                    <h2>Login Required</h2>
                    <hr />
                    {!isLoginMode &&
                        <Input
                            id="name"
                            element="input"
                            type="text"
                            label="Name"
                            validators={[VALIDATOR_REQUIRE()]}
                            onInput={inputHandeler}
                            placeholder="Enter your Name"
                            errorText="Please enter a valid Name." />
                    }
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

                <button onClick={switchModeHandeler} >
                    {isLoginMode ? 'Switch to Signup' : 'Switch to Login'}
                </button>
            </Card>
        </div>
    )
}

export default Auth