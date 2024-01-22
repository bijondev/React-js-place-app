import React from 'react'
import { Avater } from '../../shared/components/ui/Avater'
import { Link } from 'react-router-dom';
import Card from '../../shared/components/ui/Card';
const UserItem = props => {
    return (
        <li className='p-2'>
            <Card>
                <Link className='flex ' to={`/${props.id}/places`} >
                    <div className='w-auto'>
                        <Avater image={props.image} alt={props.name} />
                    </div>
                    <div className='w-auto pl-5'>
                        <h2 className='text-yellow-700 font-bold capitalize'>{props.name}</h2>
                        <h3 className='text-gray-800'>{props.placeCount.length} {props.placeCount === 1 ? 'Place' : 'Places'}</h3>
                    </div>
                </Link>
            </Card>
        </li>
    )
}

export default UserItem