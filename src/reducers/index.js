import { combineReducers } from 'redux';
import ArticlesReducer from "./reducer_articles";
import ArticleReducer from "./reducer_article";

const rootReducer = combineReducers({
    articles: ArticlesReducer,
    article: ArticleReducer,
});

export default rootReducer;
