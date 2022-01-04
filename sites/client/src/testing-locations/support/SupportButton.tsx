import { Hidden } from '@material-ui/core';
import React from 'react';
import { KoFiButton } from '../../components/KoFiButton';

export function SupportButton() {
  return (
    <>
      <Hidden only={['xs']}>
        <KoFiButton label="Donate $2 now to help keep this site online" />
      </Hidden>
      <Hidden only={['sm', 'md', 'lg', 'xl']}>
        <KoFiButton label="Donate to keep this site online" />
      </Hidden>
    </>
  );
}
