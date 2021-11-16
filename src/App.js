import React from 'react';
import { useState } from 'react';
import Searchbar from './components/Searchbar/Searchbar.jsx';
import ImageGallery from './components/ImageGallery/ImageGallery.jsx';
import Modal from './components/Modal/Modal.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import './App.css';

export default function App() {
  const [currentImage, setCurrentImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const onSearch = query => {
    if (searchQuery !== query) {
      setSearchQuery(query);
    }
  };

  const viewImage = obj => {
    setCurrentImage(obj);
  };

  const closeModal = () => {
    setCurrentImage(null);
  };

  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={3000} />
      {currentImage && (
        <Modal currentImage={currentImage} onClose={closeModal} />
      )}
      <Searchbar onSearch={onSearch} />
      <ImageGallery searchQuery={searchQuery} viewImage={viewImage} />
    </div>
  );
}
