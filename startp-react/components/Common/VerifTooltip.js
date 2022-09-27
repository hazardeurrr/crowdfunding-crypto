import React from "react";
import Tooltip from '@material-ui/core/Tooltip';
import VerifiedIcon from '@mui/icons-material/Verified';

const VerifTooltip = (props) => {
    
  const verif = () => {
    let s = props.fontSize == undefined ? 25 : props.fontSize
    let mLeft = props.marginLeft == undefined ? 0 : props.marginLeft
    if(props.toBeChecked){
      return <Tooltip
      title="This account is verified"
      arrow
    >
      <VerifiedIcon sx={{ fontSize: s }} style={{color:'#44cf6e', marginLeft: mLeft}}/>
    </Tooltip>
    }

    else {
      return null
    }
    //  else {
    //   return  <HtmlTooltip
    //   title={
    //     <React.Fragment>
    //       <Typography gutterBottom color="inherit">This {props.media} account is not yet verified</Typography>
    //       <i>{"This account has not confirmed to be linked with this address. We can't ensure that the owner of this address also owns this account."}</i>
    //     </React.Fragment>
    //   }
    // >
    //   <Icon.XCircle />
    // </HtmlTooltip>
    // }
  }

    return (
      verif()
    );
  }
  
  export default VerifTooltip;