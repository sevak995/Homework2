import { Component } from 'react';
import { PAGE_LIMIT_IN_GROUP } from '../config/config';
import { getLastPage } from '../utils/utils';
import '../App.css';

export default class Pagination extends Component {
  goToNextPage() {
    this.props.paginate('next');
  }

  goToPreviousPage() {
    this.props.paginate('prev');
  }

  changePage(event) {
    const pageNumber = Number(event.target.textContent);
    this.props.paginate(pageNumber);
  }

  getPaginationGroup() {
    const { page } = this.props;

    const start =
      Math.floor((page - 1) / PAGE_LIMIT_IN_GROUP) * PAGE_LIMIT_IN_GROUP;

    const paginationGroup = new Array(PAGE_LIMIT_IN_GROUP)
      .fill()
      .map((_, index) => {
        return start + index + 1;
      });

    return paginationGroup;
  }

  render() {
    const { page, quotes } = this.props;

    const paginationGroup = this.getPaginationGroup();

    const LAST_PAGE = getLastPage(quotes);

    return (
      <div className="pagination">
        <button onClick={() => this.goToPreviousPage()} disabled={page === 1}>
          PREV
        </button>
        {paginationGroup.map((item, index) => (
          <button
            key={index}
            onClick={(e) => this.changePage(e)}
            className={
              item === page
                ? 'pagination-btn--active'
                : item > LAST_PAGE
                ? 'hidden'
                : null
            }
          >
            <span>{item}</span>
          </button>
        ))}
        <button
          onClick={() => this.goToNextPage()}
          disabled={page === LAST_PAGE}
        >
          NEXT
        </button>
      </div>
    );
  }
}
