import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'inline-block !important',
      whiteSpace: 'nowrap',
      minWidth: '160px',
    },
    image: {
      display: 'initial !important',
      verticalAlign: 'middle',
      height: '15px !important',
      width: '22px !important',
      paddingTop: 0,
      paddingBottom: 0,
      border: 'none',
      marginTop: 0,
      marginRight: 5,
      marginLeft: 0,
      marginBottom: 3,
      content: 'url("https://ko-fi.com/img/cup-border.png")',
      '&:after': {
        verticalAlign: 'middle',
        height: 25,
        paddingTop: 0,
        paddingBottom: 0,
        border: 'none',
        marginTop: 0,
        marginRight: 6,
        marginLeft: 0,
        marginBottom: 4,
        content: 'url("https://ko-fi.com/img/whitelogo.svg")',
      },
      animation: '$wiggle 3s infinite',
    },
    button: {
      boxShadow: '1px 1px 0px rgba(0, 0, 0, 0.2)',
      lineHeight: '36px !important',
      minWidth: '150px',
      display: 'inline-block !important',
      backgroundColor: '#29abe0',
      padding: '2px 12px !important',
      textAlign: 'center',
      borderRadius: '7px',
      color: '#fff',
      cursor: 'pointer',
      overflowWrap: 'break-word',
      verticalAlign: 'middle',
      border: '0 none #fff !important',
      fontFamily: '"Quicksand", Helvetica, Century Gothic, sans-serif !important',
      textDecoration: 'none',
      textShadow: 'none',
      fontWeight: 700,
      fontSize: '14px !important',
    },
    text: {
      color: '#fff',
      verticalAlign: 'middle',
      padding: 0,
      textAlign: 'center',
      textDecoration: 'none',
      textShadow: '0 1px 1px rgba(34, 34, 34, 0.05)',
    },
    '@keyframes wiggle': {
      '0%': {
        transform: 'rotate(0) scale(1)',
      },
      '60%': {
        transform: 'rotate(0) scale(1)',
      },
      '75%': {
        transform: 'rotate(0) scale(1.12)',
      },
      '80%': {
        transform: 'rotate(0) scale(1.1)',
      },
      '84%': {
        transform: 'rotate(-10deg) scale(1.1)',
      },
      '88%': {
        transform: 'rotate(10deg) scale(1.1)',
      },
      '92%': {
        transform: 'rotate(-10deg) scale(1.1)',
      },
      '96%': {
        transform: 'rotate(10deg) scale(1.1)',
      },
      '100%': {
        transform: 'rotate(0) scale(1)',
      },
    },
  }),
);

export type IKoFiButtonProps = {
  color?: string;
  id?: string;
  label: string;
};

export function KoFiButton({ color = '#29abe0', id = 'joshystuart', label }: IKoFiButtonProps) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <a
        title={label}
        className={classes.button}
        style={{ backgroundColor: color }}
        href={`https://ko-fi.com/${id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={classes.text}>
          <img src="https://ko-fi.com/img/cup-border.png" className={classes.image} alt="Ko-Fi button" />
          {label}
        </span>
      </a>
    </div>
  );
}
