import React from 'react';
import { Typography } from '@material-ui/core';
import { SortBy } from './SortBy';

export type ILocationsSortInfoProps = {
  sortBy: SortBy;
};

export function LocationsSortInfo({ sortBy }: ILocationsSortInfoProps) {
  let info: string;

  switch (sortBy) {
    case SortBy.distance:
      info =
        'Lists the testing facilities that are closest to your location. The travel time estimates are based on roughly how long it would take to drive.';
      break;
    case SortBy.totalTime:
      info =
        'Lists all testing facilities that have a known wait time.  in order of the lowest overall time it would take to travel to the site and wait.';
      break;
    case SortBy.waitTime:
    default:
      info =
        'Lists all testing facilities that have a known wait time. Facilities only update their wait times during their opening hours, so if you see a very small list, it likely means the testing sites are closed';
      break;
  }

  return <Typography variant="body2">{info}</Typography>;
}
