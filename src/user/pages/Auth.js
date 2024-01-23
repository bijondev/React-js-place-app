import React, { useState, useContext, useEffect } from 'react';
import Card from '../../shared/components/ui/Card';
import Input from '../../shared/components/ui/Input';
import { authContext } from '../../shared/context/auth-context';
import { useForm } from '../../shared/hooks/form-hook';
import ErrorModel from '../../shared/components/ui/ErrorModel';
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
    VALIDATOR_EMAIL
} from '../../shared/util/validators';
import { useHttpClient } from '../../shared/hooks/http-hook';


const Auth = () => {

    const auth = useContext(authContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    // const [isLoging, setIsLoging] = useState(false);
    // const [error, setError] = useState();

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [formState, inputHandeler, setFormData] = useForm({
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

    const authSubmitHandeler = async event => {
        event.preventDefault();
        // setIsLoging(true);
        if (isLoginMode) {
            try {
                const responseData = await sendRequest(
                    '/users/login',
                    'POST',
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value,
                    }),
                    {
                        'Content-Type': 'application/json'
                    }
                );

                auth.login(responseData.user.id);
            }
            catch (error) {
                console.log("authSubmitHandeler : ", error);

            }

        }
        else {
            try {
                const responseData = await sendRequest('/users/signup',
                    'POST',
                    JSON.stringify({
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value,
                    }),
                    {
                        'Content-Type': 'application/json'
                    }
                );

                auth.login(responseData.user.id);
            }
            catch (error) {
                console.log("authSubmitHandeler : ", error);
            }
        }
    }

    const switchModeHandeler = () => {
        if (!isLoginMode) {
            setFormData({
                ...formState.inputs,
                name: undefined
            },
                formState.inputs.email.isValid && formState.inputs.password.isValid
            );
        }
        else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            },
                false
            );
        }
        setIsLoginMode(prevMode => !prevMode);
    };

    useEffect(() => {

        setFormData({
            email: {
                value: 'bijon2@gmail.com',
                isValid: true
            },
            password: {
                value: '123456',
                isValid: true
            }
        }, true);

    }, [setFormData]);


    return (
        <div className='flex flex-col items-center'>
            <ErrorModel error={error} onClear={clearError} />
            <Card>
                {isLoading && <LoadingSpinner asOverlay />}
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
                        placeholder="Enter your password"
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