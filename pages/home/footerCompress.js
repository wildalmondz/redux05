import { styled } from '@mui/material/styles';

const FooterCompress = styled('section')({
    textAlign: 'center',
    zIndex: '0',
    position: 'relative',
    padding: '5px 16px 15px',
    backgroundImage: `url('https://wildalmonds.com/api/uploads/725c78bb-ae08-4ed7-93cb-3fb6becd7d04_subtle-dots.png')`,
    backgroundColor: '#17355B',
    fontFamily: `"Lato", Arial, Helvetica, sans-serif`,
    fontSize: '5px',
    width: '100vw',
    justifyContent: 'space-around',
    '& li': {
        display: 'inline-block',
        color: '#c6a777',
        fontWeight: '400',
        letterSpacing: '.04em',
        lineHeight: '1em',
        verticalAlign: 'top',
        position: 'relative',
        marginLeft: '10px',
    },
    '& ul': {
        display: 'inline-flex',
        listStyleType: 'none',
        height: '1em',
        '& li': {
            fontSize: '12px',
        },
        '& li:after': {
            content: '"|"',
            position: 'absolute',
            top: '-1px',
            right: '-8px',
        }
    },
    '& h1': {
        textAlign: 'center',
        padding: '.5em',
        flexBasis: 'calc(100% - 1em)',
    },
});

export default FooterCompress;