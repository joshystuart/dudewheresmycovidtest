import { Marker } from '@react-google-maps/api';
import personPinIcon from '../../images/person_pin_black_24dp.svg';
import { IGeolocationCoordinates } from '../../geolocation/useGeolocation';

export type IUserMarkerProps = Required<IGeolocationCoordinates>;

export const UserMarker = ({ latitude, longitude }: IUserMarkerProps) => {
  return <Marker title="You" position={{ lat: latitude, lng: longitude }} icon={personPinIcon} />;
};
