import _ from "lodash"
import { FETCH_ARTICLES } from "../actions";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_ARTICLES:
         return _.mapKeys(action.payload.data.articles, "title");
        //return action.payload.data.articles;
    default:
      return state;
  }
}
