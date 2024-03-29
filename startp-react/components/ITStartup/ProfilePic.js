import React from 'react';
import ImageUploading from 'react-images-uploading';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';


const ProfilePic = (props) => {
    const [images, setImages] = React.useState([]);
    const [snackText, setSnackText] = React.useState("");
    const [openSnack, setOpenSnack] = React.useState(false);
    const maxNumber = 1;
    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
        if (imageList[0] != undefined) {
            props.onImageChange(imageList[0].data_url);
        }
    };

    const onError = (errors, files) => {   
        if(errors.resolution){
            setSnackText("Wrong resolution")
        } else if(errors.maxFileSize){
            setSnackText("File size exceeded the limit")
        } else {
            setSnackText("Undefined error : please check all the requirements to upload an image")
        }
        setOpenSnack(true)
    }

     const handleCloseSnack = (event, reason) => {
     if (reason === 'clickaway') {
       return;
     }
 
     setOpenSnack(false);
     };
   



    return (
        <div>
            <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                open={openSnack}
                autoHideDuration={2000}
                onClose={handleCloseSnack}
            >
                <Alert onClose={handleCloseSnack} severity="error">
                    {snackText}
                </Alert>
            </Snackbar>
            <ImageUploading
                acceptType={['jpg', 'gif', 'png']}
                maxFileSize={800e3}
                resolutionType={props.ratio}
                resolutionWidth={props.resolutionWidth}
                resolutionHeight={props.resolutionHeight}
                multiple="false"
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                onError={onError}
            >
                {({
                imageList,
                onImageUpload,
                onImageUpdate,
                onImageRemove
                }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                    <button className="btn btn-light" type="button"
                    onClick={onImageUpload}
                    >
                    Click here
                    </button>
                    {/* &nbsp; */}
                    {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                        <img src={image.data_url} alt="" width="100" />
                        <div className="image-item__btn-wrapper">
                        <button className="btn btn-primary" type="button" onClick={() => onImageUpdate(index)}>Update</button>
                        <button className="btn btn-primary" type="button" onClick={() => onImageRemove(index)}>Remove</button>
                        </div>
                    </div>
                    ))}
                </div>
                )}
            </ImageUploading>
        </div>
        
    );
}

export default ProfilePic;