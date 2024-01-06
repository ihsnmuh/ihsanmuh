import { IProject } from '@/types/interfaces/projects';

const ProjectCard = (props: IProject) => {
  const { title } = props;

  return (
    <div>
      <p>{title}</p>
    </div>
  );
};

export default ProjectCard;
