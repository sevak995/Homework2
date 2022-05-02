import { QUOTES_PER_PAGE } from '../config/config';
import styles from '../components/Comment/Comment.module.css';

export const returnMean = function (input) {
  const sum = input.reduce(
    (previousInput, currentInput) => previousInput + currentInput.value,
    0
  );

  return sum / input.length;
};

export function getPaginatedQuotes(quotes, currentPage) {
  const startIndex = currentPage * QUOTES_PER_PAGE - QUOTES_PER_PAGE;
  const endIndex = startIndex + QUOTES_PER_PAGE;
  return quotes.slice(startIndex, endIndex);
}

export function getLastPage(quotes) {
  return Math.ceil(quotes.length / QUOTES_PER_PAGE);
}

export function search(query, quotes) {
  const searchResult = quotes.filter((quote) => {
    const { text, author, comments } = quote;

    const commentsText = comments.map((comment) => comment.text);

    const searchArea = [text, author, ...commentsText];

    return searchArea.find((text) =>
      text.toLowerCase().includes(query.toLowerCase())
    );
  });

  return searchResult;
}

export function returnStar(key) {
  return (
    <div className={styles.star} key={key}>
      &#9733;
    </div>
  );
}
