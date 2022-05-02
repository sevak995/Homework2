import { Component } from 'react';
import Quote from '../Quote/Quote';
import styles from './Pool.module.css';
import Search from '../Search/Search';
import Pagination from '../Pagination/Pagination';
import { getPaginatedQuotes } from '../../utils/utils';
import { QuoteContext } from '../../Context/contex';

export default class Pool extends Component {
  static contextType = QuoteContext;

  render() {
    const { page, quotes, searchResult } = this.context;
    const { container, quotesList } = styles;

    const quotesToShow = searchResult ? searchResult : quotes;

    const paginatedQuotes = getPaginatedQuotes(quotesToShow, page);

    return (
      <div className={container}>
        <Search />
        <Pagination />
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
