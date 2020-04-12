import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import createMap from './createMap';
import createTimeline from './createTimeline';
import addMarkers from './addMarkers';

// TODO
// * save state to local storage
// * count of deleted
// * undo? - or just reset back to initial state?
// * add place info and display
// * add ability to add locations.

const MapContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;

function Map({ latlng, locations }) {
  const mapRef = useRef(null);
  const markerGroupRef = useRef(null);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    createMap(mapRef, markerGroupRef, latlng);
  }, []);

  useEffect(() => {
    // when we get new locations, add markers
    const markers = addMarkers(mapRef, markerGroupRef, locations);

    // createTimeline(mapRef, locations);

    // TODO make this smarter, pan to center of markers
    if (initialLoad) {
      setInitialLoad(false);

      if (markers.length > 0) {
        mapRef.current.panTo(markers[0].getLatLng());
      }
    }
  }, [locations]);

  return (
    <MapContainer>
      <div id="map" />
    </MapContainer>
  );
}

export default Map;