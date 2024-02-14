// import { List } from 'lodash';
import Image from '../common/ImageSquare';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';
import { ISource } from '@/services/interface';
interface BoxProps {
  width: string;
}
const Box = styled.div<BoxProps>`
  background-color: white;
  padding: 6px;
  border-radius: 10px;
  margin: 10px;
  width: ${(props) => props.width};
`;
interface sourceProps {
  target: string;
  sourceInfo: ISource;
}
const SourceLabel = styled.div`
  display: flex;
  flex-direction: column;
  width: parent;
  background-color: var(--background-color);
`;
const Source = ({ sourceInfo, target }: sourceProps) => {
  const [
    ,
    // { isDragging }
    drag,
  ] = useDrag({
    type: 'source',
    item: sourceInfo,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const boxWidth =
    target === 'workbench' ? `${sourceInfo.sourceLength * 60}px` : 'auto';
  return (
    <>
      <Box ref={drag} width={boxWidth}>
        <Image size={140} src={sourceInfo.sourceThumbnailUrl} />
        {target === 'sourceList' && (
          <SourceLabel>
            <div>{sourceInfo.sourceName}</div>
            <div>{sourceInfo.sourceStart}</div>
            <div>{sourceInfo.sourceEnd}</div>
          </SourceLabel>
        )}
      </Box>
    </>
  );
};

export default Source;
