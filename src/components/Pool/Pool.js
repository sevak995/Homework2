import { Component } from 'react';
import Quote from '../Quote/Quote';
import styles from './Pool.module.css';
import Search from '../Search/Search';
import Pagination from '../Pagination/Pagination';
import { getPaginatedQuotes } from '../../utils/utils';

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

  addCommentHandler(newComment) {
    this.props.addCommentHandler(newComment);
  }

  onAddReply(reply) {
    this.props.onAddReply(reply);
  }

  render() {
    const { currentPage } = this.state;
    const { quotes } = this.props;
    const { container, quotesList } = styles;

    const paginatedQuotes = getPaginatedQuotes(quotes, currentPage);

    return (
      <div className={container}>
        <Search query={(query) => this.queryHandler(query)} />
        <Pagination
          quotes={quotes}
          page={currentPage}
          paginate={(page) => this.paginate(page)}
        />

        <ul className={quotesList}>
          {paginatedQuotes.map((quote) => {
            return (
              <Quote
                quote={quote}
                key={quote.id}
                addCommentHandler={(newComment) =>
                  this.addCommentHandler(newComment)
                }
                onAddReply={(reply) => this.onAddReply(reply)}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}
