import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import PlacesList from '../components/PlacesList'
import { useHttpClient } from '../../shared/hooks/http-hook';
import { authContext } from '../../shared/context/auth-context';

import ErrorModel from '../../shared/components/ui/ErrorModel';
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner';

const UserPlaces = () => {
    const auth = useContext(authContext);
    const userId = useParams().userId;
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedPlaces, setLoadedPlaces] = useState();

    const placeDeletedHandeler = (deletePlace) => {
        setLoadedPlaces(prevPlace =>
            prevPlace.filter(place => place.id !== deletePlace)
        );
    }
    useEffect(() => {

        const fetchUserPlaces = async () => {
            try {
                const responseData = await sendRequest(`/places/user/${userId}`);

                setLoadedPlaces(responseData.places);
            }
            catch (error) {
                console.log("fetchUserPlaces : ", error);
            }
        }
        fetchUserPlaces();
    }, [sendRequest, userId])


    return (
        <React.Fragment>
            <ErrorModel error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
            {!isLoading && loadedPlaces && <PlacesList items={loadedPlaces} onDeletePlace={placeDeletedHandeler} />}
        </React.Fragment>
    )
}

export default UserPlaces