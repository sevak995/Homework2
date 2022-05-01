import { Component } from 'react';
import '../App.css';

export default class Search extends Component {
  searchHandler(query) {
    this.props.query(query);
  }

  render() {
    return (
      <form className="search-form">
        <input
          className="search-input"
          placeholder="Search"
          onChange={(event) => this.searchHandler(event.target.value)}
        />
      </form>
    );
  }
}
