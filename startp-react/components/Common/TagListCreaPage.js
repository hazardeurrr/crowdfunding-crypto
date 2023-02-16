import React, {useEffect, useState} from 'react';
import * as Icon from 'react-feather';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Chip from '@material-ui/core/Chip'

const TagListCreaPage = (props) => {

  const campaign = props.campaign

  const showTags = () => {
    var rows = [];
    for (var i = 0; i < campaign.categories.length; i++) {
        rows.push(<span className="sub-title" key={i}    
          style={{marginRight: 5}}>{campaign.categories[i]}</span>);
    }
    return rows;
  }

    return (
      <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
        {showTags()}
      </div>
    )
}

export default TagListCreaPage