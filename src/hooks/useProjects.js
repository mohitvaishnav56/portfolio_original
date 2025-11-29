import { useSelector } from "react-redux";

const useProjects = () => {
  const project = useSelector((state) => state.projects.projects);
  return project;
};

export default useProjects;
