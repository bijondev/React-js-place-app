import React from 'react'
import UsersList from '../components/UsersList'
const Users = () => {
    const USERS = [
        { id: 'u1', name: 'bijon krishna Bairagi', image: 'https://picsum.photos/id/237/200/200', places: 4 },
        { id: 'u2', name: 'bijon krishna Bairagi 1', image: "https://picsum.photos/id/238/200/200", places: 7 },
        { id: 'u3', name: 'bijon krishna Bairagi 2', image: "https://picsum.photos/id/239/200/200", places: 3 },
    ];
    return (

        <div className='flex justify-center items-center h-screen'>
            <UsersList items={USERS} />
        </div>
    )
}

export default Users