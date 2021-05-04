import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import projectList, { getCampaigns } from '@/utils/projectList';
import SearchBarCard from '@/components/Common/SearchBarCard';
import Link from 'next/link';
import SearchField from './SearchField';
import { Icon } from 'carbon-components-react';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';


const AutoCompleteSearchBar = () => {

 // const campaigns = getCampaigns()
  const campaigns = projectList

  const styles = (theme) => ({
    popper: {
       width: "fit-content"
    }
 });

  const PopperMy = function (props) {
    return <Popper {...props} style={styles.popper} placement="bottom-start" disablePortal/>;
 };

  return (
    <Autocomplete
      id="autocomplete-search-bar"
      clearOnEscape
      options={campaigns}
      PopperComponent={PopperMy}
      getOptionLabel={(option) => option.title}
      style={{ width: 200, marginTop : -12, padding: 0}}
      renderOption={(option) => <Link href={{
                                      pathname: "/Campaigns/[id]",
                                      query: {
                                          id: option.contract_address,
                                      }
                                  }}
                                  as={`/Campaigns/${option.contract_address}`}>
                                    <a><SearchBarCard campaign={option}/></a>
                                </Link>
                    }
      renderInput={(params) =><TextField {...params} label="Search a campaign" margin="none" />
      
    }
    />
  );
}


export default AutoCompleteSearchBar
