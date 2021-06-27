import React, { Component } from 'react';
import './styles.css';
import SearchBar from './Component/Searchbar';
import ImageGallery from './Component/ImageGallery';
import Button from './Component/Button';
import Spinner from './Component/Loader';
import Modal from './Component/Modal';
import fetchData from './api'


class App extends Component {
 state = {
    searchQuery: '',
    currentPage: 1,
    images: [],
    isLoading: false,
    showModal: false,
    modalImg: '',
    modalAlt: '',
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
      if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    };
  };

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      images: [],
      error: null,
    });
  };

   fetchImages = () => {
    const { currentPage, searchQuery } = this.state;
    const options = { searchQuery, currentPage };

    this.setState({ isLoading: true });
     
    fetchData(options).then(images => {
      this.setState(prevState => ({
        images: [...prevState.images, ...images],
        currentPage: prevState.currentPage + 1,
      }));
      this.windowScroll();
    }).catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  
  windowScroll = () => {
    window.scrollTo({
  top: document.documentElement.scrollHeight,
  behavior: 'smooth',
});
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  
  openModal = (url, alt) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      modalImg: url,
      modalAlt: alt
    }));
  };
  

  render() {
    const { error, images, isLoading, showModal, modalImg, modalAlt } = this.state;
    const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;
    return (

      <>
        <SearchBar changeQuery={this.onChangeQuery} />
        
        {error && <h1 style={{ color: '#ff0000', textAlign: 'center' }}>Something going wrong</h1>}
        
        <ImageGallery images={images} openModal={this.openModal} />

        {isLoading &&  <Spinner/>}
        
        {shouldRenderLoadMoreButton && <Button onClick={this.fetchImages} />}
              
        {showModal && 
          <Modal onClose={this.toggleModal}>
          <img src={modalImg} alt={modalAlt}/>
          </Modal>}
        
      </>
         
    );
  };
};

export default App;
