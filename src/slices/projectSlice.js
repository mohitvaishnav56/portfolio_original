const { createSlice } = require("@reduxjs/toolkit");
const projectSlice = createSlice({
    name: "projects",
    initialState: {
        projects: [],
    },
    reducers: {
        addProjects: (state, action) => {
            state.projects.push(action.payload);
        },

    },
});

module.exports = projectSlice;