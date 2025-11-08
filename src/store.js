const { configureStore } = require("@reduxjs/toolkit");
const projectSlice = require("./slices/projectSlice");
const store = configureStore({
  reducer: {
    projects: projectSlice.reducer,
  },
});

module.exports = store;