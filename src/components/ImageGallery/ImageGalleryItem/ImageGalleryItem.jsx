import React from 'react'

const ImageGalleryItem = ({onClick, imgSrc, tags}) => (

    <li onClick={onClick} className="ImageGalleryItem">
    <img src={imgSrc} alt={tags} className="ImageGalleryItem-image" />
    </li >      
)


export default ImageGalleryItem;