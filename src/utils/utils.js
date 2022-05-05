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

export function setSectionNameToMain(quotes, id) {
  return quotes.map((quote) => {
    if (quote.id === id) {
      return { ...quote, sectionName: 'main' };
    } else {
      return quote;
    }
  });
}

export function addComment(quotes, newComment) {
  const { id, text, rate } = newComment;

  return quotes.map((singleQuote) => {
    if (singleQuote.id === id) {
      const { comments } = singleQuote;
      const newId = String(comments.length + 1);

      const updatedcomments = [
        ...comments,
        { id: newId, text: text, value: rate },
      ];

      return { ...singleQuote, comments: updatedcomments };
    } else {
      return singleQuote;
    }
  });
}

export function addReply(quotes, reply) {
  const { quoteId, commentId, text } = reply;

  return quotes.map((quote) => {
    if (quote.id === quoteId) {
      const { comments } = quote;

      const updatedComments = comments.map((comment) => {
        const { id, replys } = comment;

        if (id === commentId) {
          if (replys === undefined) {
            comment.replys = [];
          }

          const newId = comment.replys.length + 1;
          const updatedReplys = replys
            ? [...replys, { id: newId, text }]
            : [{ id: newId, text }];
          const updatedComment = { ...comment, replys: updatedReplys };
          return { ...updatedComment };
        } else {
          return comment;
        }
      });

      return { ...quote, comments: updatedComments };
    } else {
      return quote;
    }
  });
}

export function toggleForm() {
  this.setState((prev) => {
    return { showForm: !prev.showForm };
  });
}
