import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import SearchBarCard from '@/components/Common/SearchBarCard';
import Link from 'next/link';
import Popper from '@material-ui/core/Popper';
import { useSelector } from 'react-redux';
import { prefixedAddress } from '@/utils/prefix';


const AutoCompleteSearchBar = () => {

 // const campaigns = getCampaigns()
  const campaigns = []
  const creators = []

  const styles = (theme) => ({
    popper: {
       width: "fit-content"
    }
 });

  const PopperMy = function (props) {
    return <Popper {...props} style={styles.popper}
        placement="bottom" disablePortal/>;
 };

 const filterOptions = createFilterOptions({
    stringify: ({ title, creator }) => {

      var crea = creator.toLowerCase()

      const user = creators.find(e => e.eth_address.toLowerCase() == crea)
      if(user == undefined)
        return ""
      else
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
      ListboxProps={{ style: { maxHeight: "150px" }}}
      filterOptions={filterOptions}
      getOptionLabel={({ title, creator }) => {
        // this is how our option will be displayed when selected
        // remove the `id` here
        var crea = creator.toLowerCase()

        const user = creators.find(e => e.eth_address.toLowerCase() == crea)
        if(user == undefined)
          return ""
        else
          return `${title} ${user.username}`;
      }}
      filterSelectedOptions
      noOptionsText = 'No campaign or creator found'
      className="autocomplete"
      renderOption={(option) => <Link href={{
                                      pathname: "/campaigns/[id]",
                                      query: {
                                          id: prefixedAddress(option.network, option.contract_address),
                                      }
                                  }}
                                  // as={`/campaigns/${option.contract_address}`}
                                  >
                                    <a><SearchBarCard campaign={option} user={creators.find(e => e.eth_address.toLowerCase() == option.creator.toLowerCase())}/></a>
                                </Link>
                    }
      renderInput={(params) =><TextField {...params} label="Search" margin="none" /> 
    }
    />
  );
}


export default AutoCompleteSearchBar
