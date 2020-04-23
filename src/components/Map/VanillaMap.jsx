import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import createMap from './createMap';
import { createTimeline, removeTimeline, updateTimeline } from './createTimeline';
import { showHeatMap, hideHeatMap } from './heatmap';
import addMarkers from './addMarkers';
import ShowAllButton from './ShowAllButton';
import ShowHeatMapButton from './ShowHeatMapButton';

const MapContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;

const ShowAllButtonWrapper = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1000;
`;

const ShowHeatMapButtonWrapper = styled.div`
  position: absolute;
  top: 16px;
  right: 180px;
  z-index: 1000;
`;

function Map({ latlng, locations, showAll, showHeat }) {
  const mapRef = useRef(null);
  const markerGroupRef = useRef(null);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    // this effect initialiases the map
    createMap(mapRef, latlng);
  }, []);

  useEffect(() => {
    // this effect initialiases the timeline
    if (showAll) {
      removeTimeline(mapRef);
    } else {
      createTimeline(mapRef, []);
      updateTimeline(locations);
    }
  }, [showAll]);

  useEffect(() => {
    // this effect initialiases the timeline
    if (showHeat) {
      showHeatMap(mapRef, locations);
    } else {
      hideHeatMap(mapRef);
    }
  }, [showHeat]);

  useEffect(() => {
    // this effect responds to the loading of new locations
    let markers = [];
    if (!showHeat) {
      markers = addMarkers(markerGroupRef, locations);
    }

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
      <ShowAllButtonWrapper>
        <ShowAllButton disabled={showHeat} />
      </ShowAllButtonWrapper>
      <ShowHeatMapButtonWrapper>
        <ShowHeatMapButton />
      </ShowHeatMapButtonWrapper>
      <div id="map" />
    </MapContainer>
  );
}

export default Map;
