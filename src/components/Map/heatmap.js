import mapService from '../../services/map.service';

/*global L*/

function hideHeatMap(mapRef) {
  if (mapService.getHeatMapRef()) {
    mapRef.current.removeControl(mapService.getHeatMapRef());
  }
}

function showHeatMap(mapRef, locations) {
  if (mapService.getMarkerGroupRef()) {
    mapService.getMarkerGroupRef().current.clearLayers();
  }
  const latLngs = locations.map((loc) => {
    return [loc.latitudeE7, loc.longitudeE7, 2];
  });
  const heat = L.heatLayer(latLngs, { radius: 25 }).addTo(mapRef.current);
  mapService.setHeatMap(heat);
}

export { hideHeatMap, showHeatMap };
