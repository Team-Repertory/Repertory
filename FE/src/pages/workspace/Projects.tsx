import styled from 'styled-components';

import { Tab } from '@/types';
import TabButtons from '@/components/common/Tab';
import SearchBar from '@/components/SearchBar';
import ProjectList from '@/components/dance/DanceGridBox';
import ProjectItem from '@/components/dance/Project';
import CreateButton from '@/components/dance/CreateButton';
// import { Link } from 'react-router-dom';
const DUMMY_LIST = [
  {
    imageUrl: 'images/index.jpg',
    title: 'Project #1',
    detail: '2 hours ago',
  },
  {
    imageUrl: 'images/index.jpg',
    title: 'Project #2',
    detail: '7 hours ago',
  },
];

const Wrapper = styled.div`
  margin: 24px 0;
  padding: 0 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TABS = [new Tab('My projects', true, () => {})];

const ProjectsPage = () => {
  return (
    <>
      <TabButtons tabs={TABS} />
      <Wrapper>
        <SearchBar />
        <CreateButton to="/workspace" target="_blank" />
      </Wrapper>
      <ProjectList column={3}>
        {DUMMY_LIST.map((item, idx) => {
          return <ProjectItem key={idx} project={item} />;
        })}
      </ProjectList>
    </>
  );
};

export default ProjectsPage;

import { getProjectsList } from '@/services/project';

export const projectsLoader = async () => {
  const response = await getProjectsList();
  return response.data;
};
