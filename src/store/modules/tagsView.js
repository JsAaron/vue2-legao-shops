/**
 * 标题路径导航
 */
const tagsView = {
  state: {
    visitedViews: [],
    cachedViews: []
  },
  mutations: {
    ADD_VISITED_VIEWS: (state, view) => {
      // if (state.visitedViews.some(v => v.path === view.path)) return;
      // state.visitedViews.push(
      //   Object.assign({}, view, {
      //     title: view.meta.title || "no-name"
      //   })
      // );
      // if (!view.meta.noCache) {
      //   state.cachedViews.push(view.name);
      // }
    }
  },
  actions: {
    addVisitedViews({ commit }, view) {
      commit("ADD_VISITED_VIEWS", view);
    }
  }
};

export default tagsView;
