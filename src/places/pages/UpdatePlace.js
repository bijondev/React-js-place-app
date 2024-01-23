import React, { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import Input from '../../shared/components/ui/Input'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook'

import { useHttpClient } from '../../shared/hooks/http-hook';
import { authContext } from '../../shared/context/auth-context';

import ErrorModel from '../../shared/components/ui/ErrorModel';
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner';


const UpdatePlace = () => {
    const auth = useContext(authContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedPlaces, setLoadedPlaces] = useState();

    const history = useHistory();

    const [formState, inputHandeler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
    }, false);
    const placeId = useParams().placeId;

    // console.log("placeId : ", placeId);

    // const selectedPlace = "";

    useEffect(() => {

        const fetchSelectedPlace = async () => {
            try {
                const responseData = await sendRequest(`/places/${placeId}`);

                setLoadedPlaces(responseData.place);

                setFormData({
                    title: {
                        value: responseData.place.title,
                        isValid: true
                    },
                    description: {
                        value: responseData.place.description,
                        isValid: true
                    }
                }, true);
            }
            catch (error) {
                console.log("fetchUsers : ", error);
            }
        }
        fetchSelectedPlace();

    }, [sendRequest, placeId])



    // useEffect(() => {
    //     if (loadedPlaces) {
    //         setFormData({
    //             title: {
    //                 value: loadedPlaces.title,
    //                 isValid: true
    //             },
    //             description: {
    //                 value: loadedPlaces.description,
    //                 isValid: true
    //             }
    //         }, true);
    //     }
    // }, [setFormData, loadedPlaces]);



    if (!loadedPlaces) {
        return (
            <div>
                <h2 className='text-red-500'>Could not find place !</h2>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="items-center">
                <LoadingSpinner asOverlay />
            </div>
        );
    }

    const addBtn = !formState.isValid ? (
        <button type='submit' disabled className="btn-blue-diesable">Update Place</button>
    ) : (
        <button type="submit" className="btn-blue-enable">Update Place</button>
    );

    const placeSubmitHandeler = async event => {
        event.preventDefault();

        try {
            await sendRequest(`/places/${placeId}`,
                'PATCH',
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value,
                }),
                {
                    'Content-Type': 'application/json'
                }
            );
            history.push('/' + auth.userId + '/places');
        }
        catch (error) {
            console.log("authSubmitHandeler : ", error);
        }


    }

    return (
        <div className='flex flex-col items-center'>
            <ErrorModel error={error} onClear={clearError} />
            {!isLoading && loadedPlaces &&
                <form onSubmit={placeSubmitHandeler}>
                    <Input
                        id="title"
                        element="input"
                        type="text"
                        label="Title"
                        initialValue={formState.inputs.title.value}
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandeler}
                        initialIsValid={formState.inputs.title.isValid}
                        placeholder="Enter yout Title"
                        errorText="Please enter a valid title."
                    />
                    <Input
                        id="description"
                        element="textarea"
                        type="text"
                        rows="3"
                        label="Description"
                        initialValue={formState.inputs.description.value}
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        onInput={inputHandeler}
                        initialIsValid={formState.inputs.description.isValid}
                        placeholder="Enter yout Title"
                        errorText="Please enter a valid sescription (at last 5 character)."
                    />

                    {addBtn}
                </form>
            }
        </div>
    )
}

export default UpdatePlace