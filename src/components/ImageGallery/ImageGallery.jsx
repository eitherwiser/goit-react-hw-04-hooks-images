import { useState, useEffect } from 'react'
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem.jsx'
import Button from '../Button/Button.jsx'
import Loader from '../Loader/Loader.jsx'


export default function ImageGallery ({searchQuery, viewImage}) {

const API_KEY = '23041977-a95e3e3a8961062fc7edd2a7d';
const PER_PAGE = 12;
const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`;

  const [imgGallery, setImgGallery] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchQuery !== '') {
      setIsLoading(true);
      setImgGallery([]);
      fetch(`${BASE_URL}&q=${searchQuery}&page=1`)
        .then(res => res.json())
        .then(res => {
          setPage(1);
          setImgGallery(res.hits);
          setTotalHits(res.totalHits);
          setIsLoading(false)
        })
    }
  }, [searchQuery]);

  useEffect(() => {
    if (page >= 2) {
      setIsLoading(true);
      fetch(`${BASE_URL}&q=${searchQuery}&page=${page}`)
        .then(res => res.json())
        .then(res => {
          setImgGallery(prev => prev.concat(res.hits));
          setTotalHits(totalHits);
          setIsLoading(false);
          pageScroll();
      })
    }
  }, [page]);


  const pageScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    })
  }

  const pageIncrement = () => {
    setPage(prev => prev + 1)
  }

  const getItem = (id) => {
    viewImage(imgGallery.find(item => item.id === id))
  }


  return (
    <>
      {imgGallery.length !== 0 && 
      <ul className="ImageGallery">
          {imgGallery.map(item =>
            <ImageGalleryItem key={item.id} onClick={() => getItem(item.id)} imgSrc={item.webformatURL} tags={item.tags} />)}
      </ul>
      }
      {page !== 0 && imgGallery.length === 0 && !isLoading &&
        <h1>Sorry, but is no pictures with tag "{searchQuery}" there .</h1>
      }
      {isLoading &&
        <Loader />
      }
      {!isLoading && imgGallery.length !== totalHits &&
        <Button onClick={() => pageIncrement()} />
      }
    </>
    )
}
