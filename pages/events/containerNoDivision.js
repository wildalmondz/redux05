import { styled } from '@mui/material/styles';

const ContainerNoDivision = styled('section')({
    width: 'auto',
    margin: '1em',
    padding: '15px',
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

// Add this styling in with the ContainerNoDivision element
    /*
      h1 {
    text-align: center;
    padding: .5em;
    flex-basis: calc(100% - 1em);
  }
     */

export default ContainerNoDivision;