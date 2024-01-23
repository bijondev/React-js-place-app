import React, { useEffect, useState } from 'react'
import UsersList from '../components/UsersList'
import ErrorModel from '../../shared/components/ui/ErrorModel';
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
const Users = () => {

    // const [isLoading, setIsLoading] = useState(false);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    // const [error, setError] = useState();
    const [loadedUsers, setLoadedUsers] = useState();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const responseData = await sendRequest('/users');

                setLoadedUsers(responseData.users);
            }
            catch (error) {
                console.log("fetchUsers : ", error);
            }
        }
        fetchUsers();
    }, [sendRequest]);

    return (
        <div className='flex justify-center items-center'>
            <ErrorModel error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
            {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
        </div>
    )
}

export default Users