import React from 'react';

const ImageGalleryItem = ({url, alt}) => {
    return (
       <img src={url} alt={alt} className="ImageGalleryItem-image" />
    );
};

export default ImageGalleryItem