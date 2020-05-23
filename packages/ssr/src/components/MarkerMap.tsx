import * as React from 'react';
import GoogleMapReact from 'google-map-react';
import styled from 'styled-components';
import { Box } from '@material-ui/core';
import { Marker } from 'models';
import { IDetailItemProps } from 'hocs';
import { googleMapApiKey } from 'common';

const Icon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <path
      // fill="#1964f5"
      fill="#EA4335"
      d="M16,3a8.78531,8.78531,0,0,0-9,9c0,5.26,9,17,9,17s9-11.74,9-17A8.78531,8.78531,0,0,0,16,3Zm0,14a5,5,0,1,1,5-5A5.00181,5.00181,0,0,1,16,17Z"
    />
  </svg>
);

const StyledMarker = styled.div`
  width: 32px;
  height: 32px;
  margin-top: -32px;
  z-index: 1;
  transform: translateY(0px);
  transition: all 0.3s cubic-bezier($expoout);
`;

const MapPoint: React.FC<{ lat: number; lng: number; text?: string }> = ({ text }) => (
  <StyledMarker>
    <Icon />
    {text}
  </StyledMarker>
);

export const MarkerMap: React.FC<IDetailItemProps<Marker>> = ({ item }) => {
  const defaultProps = {
    center: {
      lat: item.lat,
      lng: item.lng,
    },
    zoom: 11,
  };
  return (
    <Box style={{ width: '100%', height: 500 }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: googleMapApiKey }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <MapPoint lat={item.lat} lng={item.lng} />
      </GoogleMapReact>
    </Box>
  );
};
