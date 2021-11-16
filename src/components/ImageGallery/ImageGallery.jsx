import React, { Component } from 'react'
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem.jsx'
import Button from '../Button/Button.jsx'
import Loader from '../Loader/Loader.jsx'

export default class ImageGallery extends Component {

  state = {
    imgGallery: [],
    totalHits: 0,
    page: 0,
    isLoading: false
  }

  API_KEY = '23041977-a95e3e3a8961062fc7edd2a7d';
  PER_PAGE = 12;
  BASE_URL = `https://pixabay.com/api/?key=${this.API_KEY}&image_type=photo&orientation=horizontal&per_page=${this.PER_PAGE}`;


  componentDidUpdate(prevProps) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ isLoading: true, imgGallery: [], page: 1 }, this.loadItems)
    }
  }


  loadItems = () => {    
          fetch(`${this.BASE_URL}&q=${this.props.searchQuery}&page=${this.state.page}`)
        .then(res => res.json())
        .then(res =>
              this.setState(prevState =>
                ({ isLoading: false, imgGallery: prevState.imgGallery.concat(res.hits), totalHits: res.totalHits })))
        .finally(() => this.state.imgGallery.length > 11 && this.pageScroll())
  }

  pageIncrement = () => {
    this.setState(prevState => ({ isLoading: true, page: prevState.page + 1 }), this.loadItems)
  }
  
  pageScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    })
  }

  viewImage = (id) => {
    this.props.viewImage(
      this.state.imgGallery.find(item => item.id === id)
    )
  }


  render() {
    const { imgGallery, page, isLoading, totalHits} = this.state

    return (
      <>
        {imgGallery.length !== 0 && 
        <ul className="ImageGallery">
            {imgGallery.map(item =>
              <ImageGalleryItem key={item.id} onClick={() => this.viewImage(item.id)} imgSrc={item.webformatURL} tags={item.tags} />)}
        </ul>
        }
        {page !== 0 && imgGallery.length === 0 && !isLoading &&
          <h1>Sorry, but is no pictures with tag "{this.props.searchQuery}" there .</h1>
        }
        {isLoading &&
          <Loader />
        }
        {!isLoading && imgGallery.length !== totalHits &&
          <Button onClick={() => this.pageIncrement()} />
        }
      </>
      )
  }
}

// eslint-disable-next-line
//((imgGallery.length % this.PER_PAGE) == false) &&