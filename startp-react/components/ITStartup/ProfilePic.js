import React from 'react';
import ImageUploading from 'react-images-uploading';

function ProfilePic() {
    const [images, setImages] = React.useState([]);
    const maxNumber = 1;
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    return (
        <ImageUploading
            multiple="false"
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
        >
            {({
            imageList,
            onImageUpload,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps
            }) => (
            // write your building UI
            <div className="upload__image-wrapper">
                <button className="btn btn-light" type="button"
                style={isDragging ? { color: "red" } : null}
                onClick={onImageUpload}
                {...dragProps}
                >
                Click or Drop here
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
    );
}

export default ProfilePic;