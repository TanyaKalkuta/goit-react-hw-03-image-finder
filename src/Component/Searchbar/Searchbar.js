import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Searchbar extends Component {
    static defaultProps = {
    value: '',
    };

    static propTypes = {
        value: PropTypes.string,             
  };

    state = {
    value: ''
    // value: this.props.name,    
    };

    handleChange = (e) => {
    this.setState({ value: e.currentTarget.value });
    };
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.changeQuery(this.state.value);
        this.setState({ value: '' });
    //  this.props.onSubmit(this.state);
    // this.reset();
    };
    
    render() {
        const { value } = this.state;
        return (
            <header className="Searchbar">
                <form onSubmit={this.handleSubmit} className="SearchForm">
                    <button type="submit" className="SearchForm-button">
                        <span className="SearchForm-button-label">Search</span>
                    </button>

                    <input
                        className="SearchForm-input"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.handleChange}
                        value={value}
                    />
                </form>
            </header>
            
        );
     };
 };
 

