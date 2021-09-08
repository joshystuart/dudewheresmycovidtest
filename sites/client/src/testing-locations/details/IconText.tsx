import React from 'react';
import { Grid, SvgIcon, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      marginBottom: theme.spacing(1),
    },
    title: {
      marginLeft: theme.spacing(1),
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
      wordBreak: 'break-all',
    },
  }),
);

export type IIconTextProps = {
  title: string;
  link?: string;
  Icon: typeof SvgIcon;
  size?: 'small' | 'large';
};

export function IconText({ title, link, Icon, size = 'small' }: IIconTextProps) {
  const classes = useStyles();

  return (
    <Grid container spacing={0} wrap="nowrap">
      <Grid item>
        <Icon fontSize={size} />
      </Grid>
      <Grid item>
        <Typography variant="body1" className={classes.title}>
          {link && (
            <a href={link} target="_blank" rel="noreferrer">
              {title}
            </a>
          )}
          {!link && title}
        </Typography>
      </Grid>
    </Grid>
  );
}
