export default {
  namespaced: true,

  state: {
    modals: {
      contentPalace: false,
      exchangeBuilding: false,
      communityBuilding: false,
      milcTower: false,
      shoppingCenter: false,
      supportBuilding: false,
      mouseInstructions: true,
      navigateConfirmation: false,
      underConstruction: false,
      tower3: false,
      navigationProps: {},
    },
  },

  getters: {
    modals: (state) => state.modals,
  },

  mutations: {
    SET_MODAL(state, { key, value }) {
      state.modals[key] = value;
    },

    TOGGLE_MODAL(state, modal) {
      state.modals[modal] = !state.modals[modal];
    },

    SHOW_MODAL(state, modal) {
      state.modals[modal] = true;
    },

    HIDE_MODAL(state, modal) {
      state.modals[modal] = false;
    },

    SHOW_NAVIGATE(state, props) {
      state.modals[props.name] = true;
      state.modals.navigationProps = props.props;
    },

    HIDE_NAVIGATE(state, modal) {
      state.modals[modal] = false;
      state.modals.navigationProps = {};
    },
  },
};
