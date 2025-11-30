const { createSlice } = require("@reduxjs/toolkit");
const gangster = require("../assets/images/Gangster.png");
const prism = require("../assets/images/Prism.png");
const CRED = require("../assets/images/CRED.png");

const projectSlice = createSlice({
    name: "projects",
    initialState: {
        projects: [{
            id: 1,
            title: "Gangster the Street Wear Brand",
            tag: ["UI/UX Design", "Development"],
            coverImg: gangster,
            description: "A streetwear brand that embodies the spirit of urban culture with edgy designs and high-quality materials.",
            projectLink: "https://minor-project-5th-sem.vercel.app/",
            githubLink: "https://github.com/mohitvaishnav56/minor_project_5th_sem",
            figmaLink: "https://www.figma.com/design/9wsdjigW5mB8DxtFHhjYrm/the_one_creative_thing?node-id=1-2&t=6TKwzNbqtC4TOSoI-1",
        },
        {
            id: 2,
            title: "Prism Roadmap Generator",
            tag: ["UI/UX Design", "Development"],
            description: "A tool that helps users create detailed roadmaps for their projects with customizable templates and collaboration features.",
            projectLink: "https://prismroadmap.netlify.app",
            githubLink: "https://github.com/Hacktecher-04/SIH_frontend.git",
            coverImg: prism,
            figmaLink: "https://www.figma.com/design/N2JQc0KyJUaWGAdhsP49na/Prism?node-id=135-23&t=TYuIvFSURAcdzNvi-1",
        },
        {
            id: 3,
            title: "CRED Clone",
            tag: ["Frontend"],
            description: "A clone of the popular CRED app, featuring a sleek design and user-friendly interface for managing credit cards and rewards.",
            projectLink: "https://shiny-duckanoo-873a13.netlify.app/",
            githubLink: "",
            coverImg: CRED,
            figmaLink: "",
        }
        ],
    },
    reducers: {
        addProjects: (state, action) => {
            state.projects.push(action.payload);
        },

    },
});

module.exports = projectSlice;