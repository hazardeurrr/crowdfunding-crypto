// import React from 'react';
// import { withStyles } from '@material-ui/core/styles';
// import { green } from '@material-ui/core/colors';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@material-ui/icons/CheckBox';
// import Favorite from '@material-ui/icons/Favorite';
// import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// import CategoryList from '@/utils/CategoryList';

// const GreenCheckbox = withStyles({
//   root: {
//     color: green[400],
//     '&$checked': {
//       color: green[600],
//     },
//   },
//   checked: {},
// })((props) => <Checkbox color="default" {...props} />);

// export default function CheckboxList(props) {
//   const [state, setState] = React.useState({
//     checkedA: false,
//     checkedB: false,
//     checkedC: false,
//     checkedD: false,
//     checkedE: false,
//     checkedF: false,
//     checkedG: false,
//     checkedH: false
//   });

//   const handleChange = (event) => {
//     switch(event.target.name){
//       case 'checkedA':
//         if(state.checkedA)
//           props.removeCat(0);
//         else
//           props.addCat(0)
//         break;
//       case 'checkedB':
//         if(state.checkedA)
//           props.removeCat(1);
//         else
//           props.addCat(1)
//         break;
//       case 'checkedC':
//         if(state.checkedC)
//           props.removeCat(2);
//         else
//           props.addCat(2)
//         break;
//       case 'checkedA':
//         if(state.checkedD)
//           props.removeCat(3);
//         else
//           props.addCat(3)
//         break;
//       case 'checkedA':
//         if(state.checkedE)
//           props.removeCat(4);
//         else
//           props.addCat(4)
//           break;
//     }
//     setState({ ...state, [event.target.name]: event.target.checked });
//   };

//   const clearAll = () => {
//     setState({
//       checkedA: false,
//       checkedB: false,
//       checkedC: false,
//       checkedD: false,
//       checkedE: false,
//       checkedF: false,
//       checkedG: false,
//       checkedH: false
//     })
//   }

//   return (

//     <FormGroup row>
//       <FormControlLabel
//         control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
//         label={CategoryList[0]}
//       />
//       <FormControlLabel
//         control={<Checkbox checked={state.checkedB} onChange={handleChange} name="checkedB" />}
//         label={CategoryList[1]}
//       />
//       <FormControlLabel
//         control={<Checkbox checked={state.checkedC} onChange={handleChange} name="checkedC" />}
//         label={CategoryList[2]}
//       />
//       <FormControlLabel
//         control={<Checkbox checked={state.checkedD} onChange={handleChange} name="checkedD" />}
//         label={CategoryList[3]}
//       />
//       <FormControlLabel
//         control={<Checkbox checked={state.checkedE} onChange={handleChange} name="checkedE" />}
//         label={CategoryList[4]}
//       />
//       <FormControlLabel
//         control={<Checkbox checked={state.checkedF} onChange={handleChange} name="checkedF" />}
//         label={CategoryList[5]}
//       />
//       <FormControlLabel
//         control={<Checkbox checked={state.checkedG} onChange={handleChange} name="checkedG" />}
//         label={CategoryList[6]}
//       />
//       <FormControlLabel
//         control={<Checkbox checked={state.checkedH} onChange={handleChange} name="checkedH" />}
//         label={CategoryList[7]}
//       />
      
     
//     </FormGroup>
//   );
// }




import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CategoryList from '@/utils/CategoryList';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function CheckboxList(props) {
  const [state, setState] = React.useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false
  });

  const handleChange = (event) => {
    let e = event.target.name
    if(state[e])
      props.removeCat(e)
    else
      props.addCat(e)
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const showCheckboxes = () => {
    var rows = [];
    for (var i = 0; i < CategoryList.length; i++) {
        rows.push(<FormControlLabel key={i}
          control={<Checkbox checked={state.i} onChange={handleChange} name={i} />}
          label={CategoryList[i]}
        />);
    }
    return <tbody>{rows}</tbody>;
  }


  return (

    <FormGroup row>
      {showCheckboxes()}
     
    </FormGroup>
  );
}