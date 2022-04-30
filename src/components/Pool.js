import { Component } from 'react';
import Quote from './Quote';
import '../App.css';
import Search from './Search';
import Pagination from './Pagination';
import { getPaginatedQuotes } from '../utils/utils';
import NewCommnet from './NewComment';

export default class Pool extends Component {
  constructor(props) {
    super(props);
    this.state = { currentPage: 1 };
  }

  queryHandler(query) {
    this.setState({ currentPage: 1 });
    this.props.query(query);
  }

  paginate(page) {
    const { currentPage } = this.state;

    if (page === 'next') {
      this.setState({ currentPage: currentPage + 1 });
    } else if (page === 'prev') {
      this.setState({ currentPage: currentPage - 1 });
    } else {
      this.setState({ currentPage: page });
    }
  }

  render() {
    const { currentPage } = this.state;
    const { quotes } = this.props;

    const paginatedQuotes = getPaginatedQuotes(quotes, currentPage);

    return (
      <div className="container">
        <Search query={(query) => this.queryHandler(query)} />
        <Pagination
          quotes={quotes}
          page={currentPage}
          paginate={(page) => this.paginate(page)}
        />

        {/* <button className="btn">ADD NEW COOMENT</button>
        <NewCommnet /> */}
        <ul className="quotes-list">
          {paginatedQuotes.map((quote) => {
            return <Quote quote={quote} key={quote.id} />;
          })}
        </ul>
      </div>
    );
  }
}
