import { Component } from 'react';
import SelectedQuote from '../SelectedQuote/SelectedQuote';
import styles from './Container.module.css';
import { QuoteContext } from '../../Context/contex';

export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = { sorted: null };
  }

  static contextType = QuoteContext;

  addHandler() {
    const { addHandler } = this.context;
    addHandler(this.props.containerName);
  }

  onSort() {
    this.setState((prev) => {
      return prev.sorted === null
        ? { sorted: 'asc' }
        : prev.sorted === 'asc'
        ? { sorted: 'desc' }
        : { sorted: null };
    });
  }

  onDelete(id) {
    const { deleteHandler } = this.context;
    deleteHandler(id);
  }

  render() {
    const { containerName } = this.props;
    const { quotes } = this.context;
    const { sorted } = this.state;
    const { btn, btnSorted, container, btns, quotesList } = styles;

    let selectedQuotes;
    const unsortedQuotes = quotes.filter((quote) => {
      return quote.sectionName === containerName;
    });

    if (sorted === null) {
      selectedQuotes = unsortedQuotes;
    } else if (sorted === 'asc') {
      const sortedAsc = unsortedQuotes.sort((a, b) => {
        return b.mean - a.mean;
      });
      selectedQuotes = sortedAsc;
    } else {
      const sortedDesc = unsortedQuotes.sort((a, b) => {
        return a.mean - b.mean;
      });
      selectedQuotes = sortedDesc;
    }

    const sortBtnStyle = sorted === null ? btn : btn + ' ' + btnSorted;

    const sortBtnContent =
      sorted === 'desc'
        ? 'Sorted lowest to highest'
        : sorted === 'asc'
        ? 'Sorted highest to lowest'
        : 'Unsorted !';

    return (
      <div className={container}>
        <div className={btns}>
          <button className={sortBtnStyle} onClick={() => this.onSort()}>
            {sortBtnContent}
          </button>
          <button className={btn} onClick={() => this.addHandler()}>
            Add to {containerName}
          </button>
        </div>
        <div>
          <ul className={quotesList}>
            {selectedQuotes.map((quote) => {
              return (
                <SelectedQuote
                  quote={quote}
                  key={quote.id}
                  onDelete={(id) => this.onDelete(id)}
                />
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
