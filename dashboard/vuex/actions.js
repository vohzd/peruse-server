import getters 				  						from "./getters.js";
import state 				    					  from "./state.js";

export default {
  setVisitorData({ commit }, allVisitorData){
    commit("SET_VISITOR_DATA", allVisitorData);
  }
};
