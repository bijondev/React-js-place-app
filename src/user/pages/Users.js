import React, { useEffect, useState } from 'react'
import UsersList from '../components/UsersList'
import ErrorModel from '../../shared/components/ui/ErrorModel';
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner';
const Users = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [loadedUsers, setLoadedUsers] = useState();

    useEffect(() => {
        const sendRequest = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:5000/api/users');

                const responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message);
                }

                setLoadedUsers(responseData.users);
                setIsLoading(false);
            }
            catch (error) {
                console.log("authSubmitHandeler : ", error);
                setIsLoading(false);
                setError(error.message || 'Something went wrong, please try again.');
            }
        }
        sendRequest();
    }, []);

    return (
        <div className='flex justify-center items-center'>
            <ErrorModel error={error} onClear={() => { setError(null) }} />
            {isLoading && <LoadingSpinner asOverlay />}
            {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
        </div>
    )
}

export default Users