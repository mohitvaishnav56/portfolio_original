const { createSlice } = require("@reduxjs/toolkit");
const gangster = require("../../public/Gangster.png");
const prism = require("../../public/Prism.png");
const CRED = require("../../public/CRED.png");
const BST = require("../../public/BST.png");
const SBI = require("../../public/SBI.png");
const { idGenerator } = require("@/utils/commonUtils");

const projectSlice = createSlice({
    name: "projects",
    initialState: {
        projects: [{
            id: idGenerator(),
            title: "Gangster the Street Wear Brand",
            tag: ["UI/UX Design", "Development"],
            coverImg: gangster,
            description: "Brand identity and responsive e-commerce storefront for Gangster streetwear, featuring product galleries, cart functionality, and a bold urban visual style.",
            projectLink: "https://minor-project-5th-sem.vercel.app/",
            githubLink: "https://github.com/mohitvaishnav56/minor_project_5th_sem",
            figmaLink: "https://www.figma.com/design/9wsdjigW5mB8DxtFHhjYrm/the_one_creative_thing?node-id=1-2&t=6TKwzNbqtC4TOSoI-1",
        },
        {
            id: idGenerator(),
            title: "Prism Roadmap Generator",
            tag: ["UI/UX Design", "Development"],
            description: "An interactive roadmap generator that lets teams create, customize, and share project roadmaps with templates, milestones, and collaborative editing.",
            projectLink: "https://prismroadmap.netlify.app",
            githubLink: "https://github.com/Hacktecher-04/SIH_frontend.git",
            coverImg: prism,
            figmaLink: "https://www.figma.com/design/N2JQc0KyJUaWGAdhsP49na/Prism?node-id=135-23&t=TYuIvFSURAcdzNvi-1",
        },
        {
            id: idGenerator(),
            title: "CRED Clone",
            tag: ["Frontend"],
            description: "A frontend recreation of the CRED app showcasing a polished UI for managing credit cards, rewards, and transaction summaries.",
            projectLink: "https://shiny-duckanoo-873a13.netlify.app/",
            githubLink: "",
            coverImg: CRED,
            figmaLink: "",
        },
        {
            id: idGenerator(),
            title: "Binary Search Tree Visualizer",
            tag: ["Frontend"],
            description: "An interactive Binary Search Tree visualizer enabling real-time insertion, search, traversal, and deletion with animated visual feedback and explanations.",
            projectLink: "https://mohitvaishnav56.github.io/Binary_Search_Tree",
            githubLink: "https://github.com/mohitvaishnav56/Binary_Search_Tree",
            coverImg: BST,
            figmaLink: "",
        }, {
            id: idGenerator(),
            title: "SBI online main page reimagined",
            tag: ["UI/UX Design & Frontend", "frontend"],
            description: "A modern reimagining of the SBI Online main page focused on improved usability, responsive layout, clear information hierarchy, and a refreshed visual design.",
            projectLink: "",
            githubLink: "https://github.com/mohitvaishnav56/SBIOnline_clone",
            coverImg: SBI,
            figmaLink: "https://www.figma.com/design/iCfWVIegvH37kUr8U3cgzM/SBI?node-id=0-1&t=QXCbuIEkxhJrsb7a-1",
        },
        ],
    },
    reducers: {
        addProjects: (state, action) => {
            state.projects.push(action.payload);
        },

    },
});

module.exports = projectSlice;