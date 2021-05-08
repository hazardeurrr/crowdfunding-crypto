import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { getCampaigns } from '@/utils/projectList';
import SearchBarCard from '@/components/Common/SearchBarCard';
import Link from 'next/link';
import SearchField from './SearchField';
import { Icon } from 'carbon-components-react';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import usersListJson from '@/utils/usersListJson';
import { useSelector } from 'react-redux';
import { updateDoc, getOne, postDoc } from 'firebase-crowdfund/queries'


const AutoCompleteSearchBar = () => {

 // const campaigns = getCampaigns()
  const campaigns = useSelector((state) => state.allCampaigns);
  const creators = useSelector((state) => state.allCreators);

  const styles = (theme) => ({
    popper: {
       width: "fit-content"
    }
 });

  const PopperMy = function (props) {
    return <Popper {...props} style={styles.popper} placement="bottom-start" disablePortal/>;
 };

 const filterOptions = createFilterOptions({
    stringify: ({ title, creator }) => {

      var crea = creator.toLowerCase()

      const user = creators.find(e => e.eth_address.toLowerCase() == crea)
      return `${title} ${user.username}`
    },
    limit: 20
  });

  return (
    <Autocomplete
      id="autocomplete-search-bar"
      clearOnEscape
      options={campaigns}
      PopperComponent={PopperMy}
      filterOptions={filterOptions}

      getOptionLabel={({ title, creator }) => {
        // this is how our option will be displayed when selected
        // remove the `id` here
        var crea = creator.toLowerCase()

        const user = creators.find(e => e.eth_address.toLowerCase() == crea)
        return `${title} ${user.username}`;
      }}
      filterSelectedOptions
      style={{ width: 200, marginTop : -12, padding: 0}}
      renderOption={(option) => <Link href={{
                                      pathname: "/Campaigns/[id]",
                                      query: {
                                          id: option.contract_address,
                                      }
                                  }}
                                  as={`/Campaigns/${option.contract_address}`}>
                                    <a><SearchBarCard campaign={option} user={creators.find(e => e.eth_address.toLowerCase() == option.creator.toLowerCase())}/></a>
                                </Link>
                    }
      renderInput={(params) =><TextField {...params} label="Search a campaign" margin="none" /> 
    }
    />
  );
}


export default AutoCompleteSearchBar
