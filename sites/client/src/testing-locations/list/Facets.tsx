import { SvgIconTypeMap } from '@material-ui/core/SvgIcon/SvgIcon';
import React from 'react';
import { Grid, SvgIcon } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    title: {
      fontSize: '12px',
      marginLeft: theme.spacing(1),
    },
  }),
);

export type ILocationFacets = {
  title: string;
  iconColor?: SvgIconTypeMap['props']['color'];
  Icon: typeof SvgIcon;
};

export function Facets({ title, Icon, iconColor = 'inherit' }: ILocationFacets) {
  const classes = useStyles();

  return (
    <Grid xs={12} className={classes.root} item>
      <Icon fontSize="small" color={iconColor} />
      <span className={classes.title}>{title}</span>
    </Grid>
  );
}
