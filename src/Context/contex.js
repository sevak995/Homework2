import React from 'react';
import { useReducer } from 'react';
import { quotes } from '../utils/quotesData';
import {
  returnMean,
  search,
  setSectionNameToMain,
  addComment,
  addReply,
} from '../utils/utils';

const initialState = {
  page: 1,
  searchResult: null,
  quotes: quotes,
  addHandler: () => {},
  deleteHandler: () => {},
  searchHandler: () => {},
  addCommentHandler: () => {},
  onAddReply: () => {},
  paginate: () => {},
};

export const QuoteContext = React.createContext();

const ContextProvider = (props) => {
  const reducer = (state, action) => {
    if (action.type === 'select') {
      let highestMean = { mean: 0 };
      let updatedQuotes = [];

      state.quotes.forEach((quote) => {
        const { comments, id, sectionName } = quote;

        const currentMean = returnMean(comments);

        if (currentMean > highestMean.mean && sectionName === 'main') {
          highestMean = { id: id, mean: currentMean };
        }

        updatedQuotes.push({ ...quote, mean: currentMean });
      });

      updatedQuotes = updatedQuotes.map((quote) => {
        if (quote.id === highestMean.id) {
          return { ...quote, sectionName: action.container };
        } else {
          return quote;
        }
      });

      return {
        ...state,
        quotes: updatedQuotes,
      };
    } else if (action.type === 'delete') {
      const { quotes } = state;
      const { id } = action;

      const updatedQuotes = setSectionNameToMain(quotes, id);

      return {
        ...state,
        quotes: updatedQuotes,
      };
    } else if (action.type === 'search') {
      const { quotes } = state;

      if (action.query.trim().length < 3) {
        return {
          ...state,
          searchResult: null,
        };
      }

      const searchResult = search(action.query, quotes);

      return {
        ...state,
        searchResult: searchResult,
        page: 1,
      };
    } else if (action.type === 'addComment') {
      const { quotes } = state;
      const { newComment } = action;

      const updatedQuotes = addComment(quotes, newComment);

      return {
        ...state,
        quotes: updatedQuotes,
      };
    } else if (action.type === 'addReply') {
      const { reply } = action;
      const { quotes } = state;

      const updatedQuotes = addReply(quotes, reply);

      return {
        ...state,
        quotes: updatedQuotes,
      };
    } else if (action.type === 'paginate') {
      const { page } = state;
      const { Nextpage } = action;

      if (Nextpage === 'next') {
        return {
          ...state,
          page: page + 1,
        };
      } else if (Nextpage === 'prev') {
        return {
          ...state,
          page: page - 1,
        };
      } else {
        return {
          ...state,
          page: Nextpage,
        };
      }
    }
  };

  const [quotesState, dispatch] = useReducer(reducer, initialState);

  function addHandler(list) {
    dispatch({ type: 'select', container: list });
  }

  function deleteHandler(id) {
    dispatch({ type: 'delete', id: id });
  }

  function searchHandler(query) {
    dispatch({ type: 'search', query: query });
  }

  function addCommentHandler(newComment) {
    dispatch({ type: 'addComment', newComment: newComment });
  }

  function onAddReply(reply) {
    dispatch({ type: 'addReply', reply: reply });
  }

  function paginate(page) {
    dispatch({ type: 'paginate', Nextpage: page });
  }

  const ctxValue = {
    page: quotesState.page,
    searchResult: quotesState.searchResult,
    quotes: quotesState.quotes,
    addHandler,
    deleteHandler,
    searchHandler,
    addCommentHandler,
    onAddReply,
    paginate,
  };

  return (
    <QuoteContext.Provider value={ctxValue}>
      {props.children}
    </QuoteContext.Provider>
  );
};

export default ContextProvider;
