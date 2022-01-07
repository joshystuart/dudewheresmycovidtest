import { InputAdornment, List, ListItem, ListItemText, TextField } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import React, { createRef } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Loading } from '../../components/Loading';
import { Overlay } from '../../components/Overlay';
import { Paper } from '../../components/Paper';
import { useUserContext } from './UserContext';

export function UserAddressAutoComplete() {
  const { address: userAddress = '', setAddress, setCoordinates, isLoading: isUserLoading } = useUserContext();
  const inputRef = createRef<HTMLInputElement>();

  const handleChange = (address: string) => {
    setAddress(address);
  };

  const handleSelect = (address: string) => {
    setAddress(address);

    // blur field to ensure the mobile virtual keyboard closes on select
    if (inputRef && inputRef.current) {
      inputRef.current.blur();
    }

    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) =>
        setCoordinates({
          longitude: lng,
          latitude: lat,
        }),
      )
      // TODO set app error message
      .catch((error) => console.error('Error', error));
  };

  return (
    <Overlay show={isUserLoading}>
      <Paper>
        <PlacesAutocomplete value={userAddress} onChange={handleChange} onSelect={handleSelect}>
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <TextField
                id="user-address-autocomplete"
                inputRef={inputRef}
                fullWidth
                autoFocus
                {...getInputProps({
                  placeholder: isUserLoading ? 'Getting your location' : 'Enter your location...',
                  className: 'location-search-input',
                  disabled: isUserLoading,
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <RoomIcon />
                    </InputAdornment>
                  ),
                }}
                value={userAddress}
              />

              <List component="nav" className="autocomplete-dropdown-container" aria-label="mailbox folders">
                {loading && <Loading />}
                {suggestions.map((suggestion) => {
                  const { description, placeId } = suggestion;

                  return (
                    <ListItem button divider {...getSuggestionItemProps(suggestion, { key: placeId })}>
                      <ListItemText primary={description} />
                    </ListItem>
                  );
                })}
              </List>
            </div>
          )}
        </PlacesAutocomplete>
      </Paper>
    </Overlay>
  );
}
