import React, { Component } from 'react';
import './styles.css';
import SearchBar from './Component/Searchbar';
import ImageGallery from './Component/ImageGallery';
import Button from './Component/Button';
import Spinner from './Component/Loader';
// import Spinner from './Component/Spinner';
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

//   componentDidMount() {
//     axios.get('https://pixabay.com/api/?q=cat&page=1&key=21347916-d2cb58bac2dcf6ecd9205e483&image_type=photo&orientation=horizontal&per_page=12'
// ).then(response => {
//       console.log(response.data.hits);
//     })
//     // const todos = localStorage.getItem('todos');
//     // const parsedTodos = JSON.parse(todos);
//     // // console.log(parsedContacts);
//     // if (parsedTodos) {
//     //   this.setState({todos:parsedTodos});      
//     // }    
//   };

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
 

// class App extends React.Component {
//   static defaultProps = {
//     contacts: contactsUser,
//     filter: ''
//   };

//   static propTypes = {
//     contacts: PropTypes.array,
//     filter: PropTypes.string,
//   };
  
  
//   state = {
//     contacts: this.props.contacts,
//     filter: this.props.filter,
//   };

  
//   formAddContact = ({ name, number }) => {
//     console.log(name, number);
    
//     const contact = {
//       id: uuidv4(),
//       name: name,
//       number: number      
//     };
//     const contactNames = this.state.contacts.map(contact => contact.name);
//     this.renderContacts(contactNames, contact.name, contact);
//   };
  
//   renderContacts = (contactsList, contactName, newContact) => {
//     if (contactsList.includes(contactName)) {
//       alert(`${contactName} is already in contacts`)
//     } else {
//       this.setState(({ contacts }) => ({
//         contacts: [...contacts, newContact],
//       }));
//     };   
//   };

//   changeFilter = (e) => {
//     this.setState({ filter: e.target.value });
//   };


//   getFilteredContacts = () => {
//     const normalizedFilter = this.state.filter.toLowerCase();

//     return this.state.contacts.filter(contact => {
//       return contact.name.toLowerCase().includes(normalizedFilter)
//     })
//    };
 
//   deleteContact = (contactId) => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   render() {
//     //  const visibleContacts = this.getVisibleContacts();
//     return (
//       <Container>
//         <div>
//           <h1>Phonebook</h1>
//           <ContactForm
//             onSubmit={this.formAddContact} />

//           <h2>Contacts</h2>
//           <Filter
//           value={this.state.filter}
//           onChange={ this.changeFilter }/>
//           <ContactList
//           shownContacts={this.getFilteredContacts}
//           onClick={  this.deleteContact}/>
//         </div>
//       </Container>
      
//     );
//   };
// }
export default App;
