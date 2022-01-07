import React from 'react';
import { Grid, Hidden, Tooltip, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import { GridJustification } from '@material-ui/core/Grid/Grid';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    title: {
      marginLeft: theme.spacing(1),
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
      wordBreak: 'break-all',
      fontSize: 14,
      paddingRight: 2,
    },
  });
});

export type IListColumnHeadingProps = {
  title: string;
  helpText?: string;
  selected?: boolean;
  justify?: GridJustification;
};

export function ListColumnHeading({ title, helpText, selected = false, justify = 'center' }: IListColumnHeadingProps) {
  const classes = useStyles();

  return (
    <Grid container spacing={0} wrap="nowrap" justifyContent={justify}>
      <Grid item>
        <Typography align="center" variant="body1" className={classes.title}>
          {selected ? <strong> {title}</strong> : <> {title}</>}
        </Typography>
      </Grid>
      <Hidden only={['xs']}>
        <>
          {helpText && (
            <Grid item>
              <Tooltip title={helpText}>
                <HelpOutlineOutlinedIcon fontSize="small" />
              </Tooltip>
            </Grid>
          )}
        </>
      </Hidden>
    </Grid>
  );
}
