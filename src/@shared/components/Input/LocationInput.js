import React from 'react';
import Map from '@shared/components/Map/Map.js';
import * as inputStyle from './styles/Input.styles.js';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export const LocationInput = ({ pos, name = '', currentPos, onChange }) => {
  const styles = {
    searchByMap: {
      display: 'relative',
      // width: "200px", // 예시 너비
      // height: "100px", // 예시 높이
    },
    mapMarker: {
      position: 'absolute',
      // zIndex: 100,
      top: '50%',
      left: '50%',
      color: 'red',
      // fontSize: "2em",
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <div>
      <inputStyle.displayFilteringValueWhenModifyingFilter>
        <span>posx: {pos[0]}</span>
        <span>,</span>
        <span>posy: {pos[1]}</span>
      </inputStyle.displayFilteringValueWhenModifyingFilter>
      <div style={styles.searchByMap}>
        <Map
          type="searchByMarker"
          name={name}
          currentPos={currentPos}
          setPos={onChange}
        />
        <div style={styles.mapMarker}>
          <LocationOnIcon />
        </div>
      </div>
    </div>
  );
};
