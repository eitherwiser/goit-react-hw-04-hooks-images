//example of using OnClick event for Overlay
//and example of using componentDidmount for onKeyDown event, to close Modal by "Escape" key.

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { BsHeartFill, BsFillEyeFill, BsFillCloudArrowDownFill, BsXLg } from "react-icons/bs";

export default function Modal({ currentImage, onClose }) { 
  
  const keyDownEscape =(e) => {
    e.code === 'Escape' &&  onClose()
  }

  useEffect(() => {   
    window.addEventListener('keydown', keyDownEscape);
    return () => window.removeEventListener('keydown', keyDownEscape);
  }, []);

    const { largeImageURL, tags, user, userImageURL, pageURL, likes, views, downloads} = currentImage;
  
  return (
      <div className="Overlay" onClick={(e) => e.currentTarget === e.target && onClose()}>
      <div className="Modal">
        <img src={largeImageURL} alt={tags} />
        <span className="closeBtn textInfo" onClick={onClose}><BsXLg /></span>
        <div className="infoWrapper">
          <a href={pageURL}><img src={userImageURL} className="userAvatar" alt={user} /></a>
          <div className="statistickWrapper">
            <span className="textInfo"> <BsHeartFill/> {likes}</span>
            <span className="textInfo"> <BsFillEyeFill/> {views}</span>
            <span className="textInfo"> <BsFillCloudArrowDownFill /> {downloads}</span>
          </div>   
        </div>
      </div>
    </div>
  )
}

Modal.defaultProps = {
  currentImage: PropTypes.shape({
    largeImageURL: '../../images/noPhoto.png',
    tags: '',
    user: 'Unknown',
    userImageURL: '../../images/noAvatar.png',
    pageURL: '#',
    likes: 0,
    views: 0,
    downloads: 0,
  })
}

Modal.propType = {
  onClose: PropTypes.func,
  currentImage: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    userImageURL: PropTypes.string.isRequired,
    pageURL: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    views: PropTypes.number.isRequired,
    downloads: PropTypes.number.isRequired,
  })
}