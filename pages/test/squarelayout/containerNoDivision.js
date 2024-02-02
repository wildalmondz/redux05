import { styled } from '@mui/material/styles';

const ContainerNoDivision = styled('section')({
    width: 'auto',
    margin: '2px',
    textAlign: 'center',
    alignItems: 'center',
    position: 'relative',
    flex: 1,
    display: 'grid',
    justifyContent: 'center',
    border: '1px dashed gainsboro',
    overflow: 'auto',
    backgroundColor: 'ghostwhite',
    minHeight: '180px',
    '& h1': {
        textAlign: 'center',
        padding: '.5em',
        flexBasis: 'calc(100% - 1em)',
    },
})

export default ContainerNoDivision;