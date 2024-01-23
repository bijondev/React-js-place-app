import React, { useContext } from 'react'
import Input from '../../shared/components/ui/Input'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { authContext } from '../../shared/context/auth-context';
import { useHistory } from 'react-router-dom'
import Card from '../../shared/components/ui/Card'
import ErrorModel from '../../shared/components/ui/ErrorModel';
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner';
import ImageUpload from '../../shared/components/ui/ImageUpload';


const NewPlace = () => {
    const auth = useContext(authContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
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
        image: {
            value: null,
            isValid: false
        }
    }, false);

    const history = useHistory();


    const addBtn = !formState.isValid ? (
        <button type='submit' disabled className="btn-blue-diesable">Update Place</button>
    ) : (
        <button type="submit" className="btn-blue-enable">Update Place</button>
    );

    const placeSubmitHandeler = async event => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append('title', formState.inputs.title.value);
            formData.append('description', formState.inputs.description.value);
            formData.append('address', formState.inputs.address.value);
            formData.append('creator', auth.userId);
            formData.append('image', formState.inputs.image.value);

            await sendRequest('/places',
                'POST',
                formData
            );
            history.push('/');
        }
        catch (error) {
            console.log("authSubmitHandeler : ", error);
        }

        console.log(formState.inputs);
    }


    return (
        <div className='flex flex-col items-center'>
            <ErrorModel error={error} onClear={clearError} />
            <Card className='flex items-center'>
                <form onSubmit={placeSubmitHandeler}>
                    {isLoading && <LoadingSpinner asOverlay />}
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
                        placeholder="Enter yout Description"
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
                        placeholder="Enter yout Address"
                        errorText="Please enter a valid Address."
                    />

                    <ImageUpload center
                        id="image"
                        onInput={inputHandeler}
                        errorText="Please provide an Image."
                    />

                    {addBtn}
                </form>
            </Card>
        </div>
    )
}

export default NewPlace