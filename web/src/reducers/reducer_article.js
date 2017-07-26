import _ from "lodash"
import { FETCH_ARTICLE } from "../actions";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_ARTICLE:
        console.log('fetch article:', action.payload);
    //   return _.mapKeys(action.payload.data, "id");
        return action.payload;
    default:
      return state;
  }
}
