import React, { useState, useRef, useCallback } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from '@react-google-maps/api';

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

interface MyMapProps {
  setEventLocation: (location: string) => void;
  setEventAddress: (address: string) => void;
}

function MyMap({ setEventLocation, setEventAddress }: MyMapProps) {
  const [markerPosition, setMarkerPosition] = useState(center);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const handleMapClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        const newLocation = `${lat}, ${lng}`;
        setMarkerPosition({ lat, lng });
        setEventLocation(newLocation);

        // Reverse geocoding to get the address
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
          if (status === 'OK' && results && results[0]) {
            setEventAddress(results[0].formatted_address);
          }
        });
      }
    },
    [setEventLocation, setEventAddress],
  );

  const onLoadAutocomplete = (
    autocompleteInstance: google.maps.places.Autocomplete,
  ) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();

      if (place.geometry && place.geometry.location) {
        const location = place.geometry.location;
        const newLocation = `${location.lat()}, ${location.lng()}`;

        setMarkerPosition({ lat: location.lat(), lng: location.lng() });
        setEventLocation(newLocation);
        setEventAddress(place.formatted_address || '');

        if (mapRef.current) {
          mapRef.current.panTo(location);
          mapRef.current.setZoom(15);
        }
      }
    }
  };

  const onLoadMap = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      libraries={['places']}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onClick={handleMapClick}
        onLoad={onLoadMap}
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
              boxSizing: 'border-box',
              border: '1px solid transparent',
              width: '400px',
              height: '50px',
              padding: '0 12px',
              borderRadius: '3px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
              fontSize: '14px',
              outline: 'none',
              textOverflow: 'ellipses',
              position: 'absolute',
              left: '50%',
              marginLeft: '-200px',
              top: '10px',
            }}
          />
        </Autocomplete>
        <Marker position={markerPosition} />
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MyMap);
