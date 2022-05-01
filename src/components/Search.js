import { Component } from 'react';
import styles from './Search.module.css';

export default class Search extends Component {
  searchHandler(query) {
    this.props.query(query);
  }

  render() {
    return (
      <form className={styles['search-form']}>
        <input
          className={styles['search-input']}
          placeholder="Search"
          onChange={(event) => this.searchHandler(event.target.value)}
        />
      </form>
    );
  }
}
