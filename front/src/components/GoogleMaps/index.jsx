import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};


const center = {
  lat: -32.889458,
  lng: -68.845839,
};


const mendozaBounds = {
  north: -32.0,
  south: -34.0,
  west: -69.6,
  east: -67.5,
};

function MyMap({ setEventLocation }) {
  const [markerPosition, setMarkerPosition] = useState(center); 
  const [autocomplete, setAutocomplete] = useState(null);

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const newLocation = `${lat}, ${lng}`;
    setMarkerPosition({ lat, lng }); 
    setEventLocation(newLocation);
  };

  const onLoadAutocomplete = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      const address = place.formatted_address;
      setEventLocation(address); 
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} libraries={['places']}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onClick={handleMapClick}
      >
       
        <Autocomplete
          onLoad={onLoadAutocomplete}
          onPlaceChanged={onPlaceChanged}
          options={{
            bounds: mendozaBounds, 
            componentRestrictions: { country: 'ar' },
          }}
        >
          <input
            type="text"
            placeholder="Busca una ubicación"
            className="autocomplete-input"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `400px`,
              height: `50px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              left: "50%",
              marginLeft: "-120px",
              top: "10px",
            }}
          />
        </Autocomplete>
        <Marker position={markerPosition} />
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MyMap);
