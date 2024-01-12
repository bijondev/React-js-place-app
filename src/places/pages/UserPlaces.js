import React from 'react'
import { useParams } from 'react-router-dom';
import PlacesList from '../components/PlacesList'

const UserPlaces = () => {
    const DUMMY_PLACES = [
        {
            id: 1,
            title: "Ojo de Agua",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac molestie lorem. Aenean pharetra eget lorem eu porta. Nunc finibus gravida purus, id ultricies nisi tristique quis.",
            address: "PO Box 97145",
            imageUrl: "https://picsum.photos/id/250/700/500",
            location: { lat: 19.6775122, lan: -99.0329594 },
            creator: "u1"
        },
        {
            id: 2,
            title: "Fajões",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac molestie lorem. Aenean pharetra eget lorem eu porta. Nunc finibus gravida purus, id ultricies nisi tristique quis.",
            address: "Room 730",
            imageUrl: "https://picsum.photos/id/251/700/500?random=2",
            location: { lat: 40.9178949, lan: -8.4250467 },
            creator: "u2"
        },
        {
            id: 3,
            title: "Chengxi",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac molestie lorem. Aenean pharetra eget lorem eu porta. Nunc finibus gravida purus, id ultricies nisi tristique quis.",
            address: "Apt 1162",
            imageUrl: "https://picsum.photos/id/252/700/500",
            location: { lat: 36.628305, lan: 101.765843 },
            creator: "u3"
        },
        {
            id: 4,
            title: "Santo Antônio do Monte",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac molestie lorem. Aenean pharetra eget lorem eu porta. Nunc finibus gravida purus, id ultricies nisi tristique quis.",
            address: "Apt 1757",
            imageUrl: "https://picsum.photos/id/253/700/500",
            locationL: { lat: -20.0859007, lan: -45.2957103 },
            creator: "u2"
        },
        {
            id: 5,
            title: "Panamá",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac molestie lorem. Aenean pharetra eget lorem eu porta. Nunc finibus gravida purus, id ultricies nisi tristique quis.",
            address: "Suite 33",
            imageUrl: "https://picsum.photos/id/254/700/500",
            locationL: { lat: 8.9823792, lan: -79.5198696 },
            creator: "u2"
        },
        {
            id: 6,
            title: "Lughaye",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac molestie lorem. Aenean pharetra eget lorem eu porta. Nunc finibus gravida purus, id ultricies nisi tristique quis.",
            address: "Apt 1323",
            imageUrl: "https://picsum.photos/id/255/700/500",
            locationL: { lat: 10.6852616, lan: 43.946063 },
            creator: "u3"
        },
        {
            id: 7,
            title: "Kansas City",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac molestie lorem. Aenean pharetra eget lorem eu porta. Nunc finibus gravida purus, id ultricies nisi tristique quis.",
            address: "Suite 79",
            imageUrl: "https://picsum.photos/id/256/700/500",
            locationL: { lat: 39.0860093, lan: -94.6321217 },
            creator: "u1"
        },
        {
            id: 8,
            title: "eMbalenhle",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac molestie lorem. Aenean pharetra eget lorem eu porta. Nunc finibus gravida purus, id ultricies nisi tristique quis.",
            address: "16th Floor",
            imageUrl: "https://picsum.photos/id/257/700/500",
            locationL: { lat: -26.5524312, lan: 29.0750837 },
            creator: "u2"
        },
        {
            id: 9,
            title: "Mashan",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac molestie lorem. Aenean pharetra eget lorem eu porta. Nunc finibus gravida purus, id ultricies nisi tristique quis.",
            address: "Suite 38",
            imageUrl: "https://picsum.photos/id/258/700/500",
            locationL: { lat: 45.212088, lan: 130.478187 },
            creator: "u3"
        },
        {
            id: 10,
            title: "Cabanaconde",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac molestie lorem. Aenean pharetra eget lorem eu porta. Nunc finibus gravida purus, id ultricies nisi tristique quis.",
            address: "Suite 88",
            imageUrl: "https://picsum.photos/id/269/700/500",
            locationL: { lat: -15.6225478, lan: -71.9801443 },
            creator: "u1"
        }
    ]
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);

    return (
        <PlacesList items={loadedPlaces} />
    )
}

export default UserPlaces