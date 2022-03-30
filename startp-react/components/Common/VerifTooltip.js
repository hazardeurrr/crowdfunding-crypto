import React from "react";
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles} from '@material-ui/core/styles';
import * as Icon from 'react-feather';



const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);


const VerifTooltip = (props) => {
    
  const verif = () => {
    if(props.toBeChecked){
      return <HtmlTooltip
      title={
        <React.Fragment>
          {/* <Typography gutterBottom color="inherit">This {props.media} account is verified</Typography> */}
          <i>{"This Twitter account has been linked to this address"}</i>
        </React.Fragment>
      }
    >
      <Icon.CheckCircle />
    </HtmlTooltip>
    } else {
      return  <HtmlTooltip
      title={
        <React.Fragment>
          <Typography gutterBottom color="inherit">This {props.media} account is not yet verified</Typography>
          <i>{"This account has not confirmed to be linked with this address. We can't ensure that the owner of this address also owns this account."}</i>
        </React.Fragment>
      }
    >
      <Icon.XCircle />
    </HtmlTooltip>
    }
  }

    return (
      verif()
    );
  }
  
  export default VerifTooltip;