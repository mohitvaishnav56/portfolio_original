export const filterProjectsByTag = (projects, tag) => {
    if (tag === "All") {
        return projects;
    }
    return projects.filter(project => project.tag.includes(tag));
}