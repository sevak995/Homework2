import { Component } from 'react';
import styles from './Search.module.css';
import { QuoteContext } from '../../Context/contex';

export default class Search extends Component {
  static contextType = QuoteContext;

  searchHandler(query) {
    const { searchHandler } = this.context;
    searchHandler(query);
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
