import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem'

  const ImageGallery = ({images, openModal}) => {
    return (
      <ul className="ImageGallery">
            {images.map(({ id, webformatURL, tags, largeImageURL }) => {
                return (
                    <li className="ImageGalleryItem" key={id} onClick={() => {openModal(largeImageURL, tags)}}>
                        <ImageGalleryItem url={webformatURL} alt={ tags }/>
                    </li>
             );
         })}
      </ul>
  );
};

export default ImageGallery;
