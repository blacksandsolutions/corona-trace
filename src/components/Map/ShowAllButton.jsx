import React, { useEffect, useState } from 'react';
import Button from '../Button/Button';

import mapService from '../../services/map.service';

function ShowAllButton({ disabled }) {
  const [showAll, setShowAll] = useState(mapService.getShowAll());

  useEffect(() => {
    mapService.showAll$.subscribe((showAll) => {
      setShowAll(showAll);
    });
  }, []);

  const label = showAll ? 'Show Timeline' : 'Show All';

  const onClick = () => {
    mapService.toggleShowAll();
  };
  return (
    <Button onClick={onClick} disabled={disabled}>
      {label}
    </Button>
  );
}

export default ShowAllButton;
