import { Component } from 'react';
import styles from './Search.module.css';

export default class Search extends Component {
  searchHandler(query) {
    this.props.query(query);
  }

  render() {
    const { searchForm, searchInput } = styles;

    return (
      <form className={searchForm}>
        <input
          className={searchInput}
          placeholder="Search"
          onChange={(event) => this.searchHandler(event.target.value)}
        />
      </form>
    );
  }
}
