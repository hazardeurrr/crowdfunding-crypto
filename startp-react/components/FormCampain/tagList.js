import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import categoryListCrea from '@/utils/CategoryListCrea';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },

    root2: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        marginTop: 5,
        width: 250
      },
      input: {
        marginLeft: theme.spacing(1),
        flex: 1,
      },
      iconButton: {
        padding: 10,
      },
      divider: {
        height: 28,
        margin: 4,
      },
  }));

export default function TagList(props) {
    const classes = useStyles();

    const [baseTags, setBaseTags] = React.useState([])
    const [tags, setTags] = React.useState([])
    const [customTag, setCustomTag] = React.useState("")

    const handleDelete = (label) => {
        let filtered = tags.filter(e => e != label)
        setTags(filtered)
        props.onTagChange(filtered)
        if(categoryListCrea.includes(label)){
            setBaseTags(oldArray => [...oldArray,label] );
        }
    };

    const handleClick = (label) => {
        let filtered = baseTags.filter(e => e != label)
        setBaseTags(filtered)
        let tagCopy = tags
        props.onTagChange(tagCopy.concat(label))
        setTags(oldArray => [...oldArray,label]);
    };

    React.useEffect(() => {
        setBaseTags(categoryListCrea)
    }, [])
  
    const displayBaseTags = () => {
        var rows = [];
        for (let i = 0; i < baseTags.length; i++) {
            rows.push(<Chip style={{margin: 3}} label={baseTags[i]} variant="outlined" onClick={() => handleClick(baseTags[i])}  key={i} />);
        }
        return rows
    }

    const displayTags = () => {
        var rows = [];
        for (let i = 0; i < tags.length; i++) {
            rows.push(<Chip style={{margin: 3, backgroundColor:'#d84b53', color:'white'}} label={tags[i]} onDelete={() => handleDelete(tags[i])} key={i} />);
        }
        return rows
    }

    const handleCustomTag = () => {
        let c = customTag
        if(c !== "" && !tags.includes(c) && !baseTags.includes(c)){
            let tagCopy = tags
            props.onTagChange(tagCopy.concat(c))
            setTags(oldArray => [...oldArray,c] );
            setCustomTag("")
        }
    }

    const onChange = (event) => {
        setCustomTag(event.target.value)
      };

    const displayAddTag = () => {
        return  <Paper  className={classes.root2}>
        {/* <IconButton className={classes.iconButton} aria-label="menu">
          <MenuIcon />
        </IconButton> */}
        <InputBase
          className={classes.input}
          placeholder="Custom Tag"
          inputProps={{ 'aria-label': 'custom tag' }}
          onChange={onChange}
          value={customTag}
          onKeyDown={(ev) => {
            console.log(`Pressed keyCode ${ev.key}`);
            if (ev.key === 'Enter') {
              // Do code here
              handleCustomTag();
              ev.preventDefault();
            }
          }}
        />
        <IconButton onClick={handleCustomTag} className={classes.iconButton} aria-label="search">
          <AddIcon />
        </IconButton>
        {/* <Divider className={classes.divider} orientation="vertical" />
        <IconButton color="primary" className={classes.iconButton} aria-label="directions">
          <DirectionsIcon />
        </IconButton> */}
      </Paper>
    }

    return (
        <div>
            {displayBaseTags()}
            {/* <div style={{display:'flex', alignItems:'center'}}><TextField id="standard-basic" label="Custom tag" size="small" /><Button size='small' variant="outlined">Add Tag</Button></div> */}
            {displayAddTag()}
            <div style={{marginTop: 25, color:"#6084a4"}}>Your tags : {displayTags()}</div>
        </div>
    );
  }