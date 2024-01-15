import React, { useRef, useEffect } from 'react'
// KEY AIzaSyBJsuMgLSrRkGXxEAomeHr8g8fWgaUd8Fo
const Map = props => {
    const mapRef = useRef();
    const { centerMap, zoom } = props;

    useEffect(() => {
        const map = new window.google.maps.Map(mapRef.current, {
            center: centerMap,
            zoom: zoom
        });
        new window.google.maps.Marker({
            position: centerMap,
            map: map
        })
    }, [centerMap, zoom])

    return (
        <div ref={mapRef} className="w-full h-52">Map</div>
    )
}


export default Map