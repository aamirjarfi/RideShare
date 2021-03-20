import React from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsRenderer,
  DirectionsService,
} from "@react-google-maps/api";
import { useState } from "react";
const containerStyle = {
  maxWidth: "700px",
  height: "600px",
};

const location = {
  lat: 23.864423,
  lng: 90.004663,
};

const onLoad = (marker) => {
  console.log("marker: ", marker);
};

function GoogleMapComponent({ destination, origin }) {
  const [directionResponse, setDirectionResponse] = useState(null);
  console.log(destination, origin);
  return (
    <LoadScript googleMapsApiKey="AIzaSyBPdMhuoCtrFSn_3G1H8ywmZ_2Bw_3Zom8">
      <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={8}>
        {/* Child components, such as markers, info windows, etc. */}
        <>
          {!directionResponse && <Marker onLoad={onLoad} position={location} />}
          <DirectionsService
            // required
            options={{
              destination: destination,
              origin: origin,
              travelMode: "DRIVING",
            }}
            // required
            callback={(res) => {
              if (res !== null) {
                setDirectionResponse(res);
              }
            }}
          />
          {directionResponse && (
            <DirectionsRenderer options={{ directions: directionResponse }} />
          )}
        </>
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(GoogleMapComponent);
