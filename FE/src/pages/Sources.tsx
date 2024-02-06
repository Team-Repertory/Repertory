import { useState } from 'react';
import styled from 'styled-components';

import SourcesContextProvider from '@/store/sources-context';

import TabButtons, { Tab } from '@/components/common/Tab';
import SearchBar from '@/components/SearchBar';
import SourceList from '@/components/dance/DanceGridBox';
import SourceItem from '@/components/dance/Source';
import Wrapper from '@/components/Wrapper';
import CreateButton from '@/components/dance/CreateButton';
import SelectTagButton from '@/components/dance/SelectTagButton';
import TagList from '@/components/dance/TagList';

const Box = styled.div`
  margin: 24px 0;
  padding: 0 12px;
  width: 100%;
`;

const TABS: Tab[] = [
  new Tab('My Sources', true),
  new Tab('Cloned Sources', false),
];

const DUMMY_LIST = [
  {
    imageUrl: 'images/index.jpg',
    title: 'Source #1',
    detail: '2 minutes ago',
  },
  {
    imageUrl: 'images/index.jpg',
    title: 'Source #2',
    detail: '7 minutes ago',
  },
];

const SourcesPage = () => {
  const [tabs, setTabs] = useState<Tab[]>(TABS);

  const handleClickTab = (clickedTabName: string) => {
    setTabs(
      tabs.map((tab) => {
        const clicked: boolean = tab.name == clickedTabName;
        return {
          ...tab,
          clicked,
        };
      })
    );
  };

  const [isTagListOpen, setIsTagListOpen] = useState(false);

  const handleOpenTag = () => {
    setIsTagListOpen((prev) => !prev);
  };

  return (
    <SourcesContextProvider>
      <TabButtons tabs={tabs} margin="48px 0 0" onClickTab={handleClickTab} />
      <Box>
        <Wrapper $margin="0">
          <div style={{ display: 'flex' }}>
            <SearchBar></SearchBar>
            <SelectTagButton openTagList={handleOpenTag} />
          </div>
          <CreateButton />
        </Wrapper>
        {isTagListOpen && <TagList />}
      </Box>
      {/* TODO: 프로젝트 생성 버튼 */}
      <SourceList column={4}>
        {DUMMY_LIST.map((item, idx) => {
          return <SourceItem key={idx} source={item} />;
        })}
      </SourceList>
    </SourcesContextProvider>
  );
};

export default SourcesPage;
