import React, { useEffect, useState } from 'react';

import Button from '../Button/Button';

import mapService from '../../services/map.service';

function ShowHeatMapButton() {
  const [showHeat, setShowHeat] = useState(mapService.getShowHeat());

  useEffect(() => {
    mapService.showHeat$.subscribe((showHeat) => {
      setShowHeat(showHeat);
    });
  }, []);

  const label = showHeat ? 'HeatMap On' : 'HeatMap Off';

  const onClick = () => {
    mapService.toggleShowHeat();
  };
  return <Button onClick={onClick}>{label}</Button>;
}

export default ShowHeatMapButton;
