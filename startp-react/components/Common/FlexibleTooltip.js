import React from "react";
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles} from '@material-ui/core/styles';
import * as Icon from 'react-feather';



const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: 'black',
    color: 'white',
    maxWidth: 250,
    fontSize: theme.typography.pxToRem(14),
    border: '1px solid #dadde9',
  },
}))(Tooltip);


const FlexibleTooltip = (props) => {
    
  const verif = () => {
    if(props.campaign.flexible){
      return <HtmlTooltip
      title={
        <React.Fragment>
          {"This campaign will receive all funds raised even though its goal is not reached."}
        </React.Fragment>
      }
    >
      <div><Icon.BarChart /> Flexible goal</div>
    </HtmlTooltip>
    } else {
      return  <HtmlTooltip
      title={
        <React.Fragment>
          {"This campaign will receive funds only if its goal is reached by its deadline. Otherwise, contributors will be able to get a refund."}
        </React.Fragment>
      }
    >
      <div><Icon.AlertOctagon /> All or nothing</div>
    </HtmlTooltip>
    }
  }

    return (
      verif()
    );
  }
  
  export default FlexibleTooltip;