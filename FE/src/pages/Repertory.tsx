import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import * as dance from '@/services/dance';
import * as com from '@/services/community';
import * as member from '@/services/member';
import * as project from '@/services/project';
const Btn = styled.button`
  background-color: #4e4e4e;
  margin: 4px;
  padding: 6px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 30rem;
`;
const Container = styled.div`
  display: flex;
`;
const RepertoryPage = () => {
  const [input, setInput] = useState();
  const [img, setImg] = useState();
  const onVideoUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      setInput(event.target.files[0]);
    }
  };

  const onImageUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImg(event.target.files[0]);
    }
  };

  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

  const memberJoinTest = () => {
    const url = `${BASE_URL}/member/join`;
    const data = {
      memberLoginId: 'rlagudwls3469',
      memberPassword: 'qwer1234!',
      memberName: '김형진입니다',
      memberEmail: 'rlagudwls3469@gmail.com',
    };
    axios
      .post(url, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const idValidationTest = () => {
    const url = `${BASE_URL}/member/id-validation`;
    const data = {
      memberLoginId: 'rlagudwls3469',
    };
    axios
      .post(url, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const subscribeTest = () => {
    const url = `${BASE_URL}/community/subscribe`;
    const data = {
      selectedMemberId: '23423098',
    };
    axios
      .post(url, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const community_tagSearch_Test = () => {
    const tagName = 'tag1';
    const url = `${BASE_URL}/dance/repertory?tag-name${tagName}`;
    const params = {
      page: 1,
      pageSize: 10,
      tag: tagName,
    };
    axios
      .get(url, { params })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sourceTest = () => {
    const data = {
      sourceName: 'string',
      sourceLength: 0,
      tagNameList: ['tag1', 'tag2'],
      start: 'string',
      end: 'string',
    };
    const formData = new FormData();
    formData.append('sourceThumbnail', img);
    formData.append('sourceVideo', input);
    formData.append(
      'postSource',
      new Blob([JSON.stringify(data)], { type: 'application/json' })
    );
    dance.postSource(formData);
  };

  const poseTest = () => {
    const formData = new FormData();
    formData.append('source', img);
    console.log(formData);
    console.log(img);
    project.detectPose(formData);
  };

  const repertoryTest = () => {
    const data = {
      repertoryName: 'test',
      sourceIdList: [123, 234, 345],
    };
    const formData = new FormData();
    formData.append('repertoryThumbnail', img);
    formData.append('repertoryVideo', input);
    formData.append(
      'postRepertoryRequest',
      new Blob([JSON.stringify(data)], { type: 'application/json' })
    );
    dance.postRepertory(formData);
  };
  return (
    <>
      <Container>
        <Wrapper>
          <Btn onClick={dance.communityTest}>GET/communityTest-OK</Btn>
          <Btn onClick={subscribeTest}>POST/subscribeTest-OK</Btn>
          <Btn onClick={sourceTest}>POST/sourceTest-OK</Btn>
          <Btn onClick={repertoryTest}>POST/repertoryTest-OK</Btn>
          <Btn onClick={memberJoinTest}>POST/memberJoinTest</Btn>
          <Btn onClick={idValidationTest}>POST/idValidationTest</Btn>
          <Btn onClick={() => dance.searchSourceName('hi')}>
            POST/searchSourceName
          </Btn>
          <Btn onClick={() => dance.fetchSourceInfo(123)}>
            POST/fetchSourceInfo
          </Btn>
          <Btn onClick={() => dance.patchSource(16)}>PATCH/patchSource</Btn>
          <Btn onClick={() => dance.deleteSource(16)}>DELETE/deleteSource</Btn>
          <Btn onClick={dance.getMySource}>GET/getMySource</Btn>
          <Btn onClick={dance.getMySourceClone}>GET/getMySourceClone</Btn>
          <Btn onClick={() => dance.deleteMySourceClone(123)}>
            DELETE/deleteMySourceClone
          </Btn>
          <Btn onClick={dance.getTags}>GET/getTags</Btn>
          <Btn onClick={() => dance.postTag('test')}>POST/postTagTest</Btn>
          <Btn onClick={() => dance.patchSourceIsAvailable(1234, true)}>
            PATCH/patchSourceIsAvailable
          </Btn>
          <Btn onClick={() => dance.getRepertoryByName('hi')}>
            GET/getRepertoryByName
          </Btn>
          <Btn
            onClick={() =>
              dance.getMyRepertory({
                page: 1,
                pageSize: 10,
              })
            }
          >
            GET/getMyRepertory
          </Btn>
          <Btn onClick={() => dance.deleteRepertory(1)}>
            DELETE/deleteRepertory
          </Btn>
          <Btn onClick={() => dance.patchRepertoryIsAvailable(1234, true)}>
            PATCH/patchSourceIsAvailable
          </Btn>
          <Btn onClick={() => dance.deleteTag(123, 'test')}>
            DELETE/delete tag
          </Btn>
        </Wrapper>
        <Wrapper>
          <Btn onClick={() => com.getFeedVideo(1)}>커뮤니티 동영상 조회</Btn>
          <Btn onClick={() => com.saveFeed()}>피드 데이터 저장</Btn>
          <Btn onClick={com.getSubscribersCount}>GET/getSubscribersCount</Btn>
          <Btn onClick={() => com.postSubscriber(123)}>POST/postSubscriber</Btn>
          <Btn onClick={() => com.patchFeedLike(123)}>PATCH/patchFeedLike</Btn>
          <Btn
            onClick={() =>
              com.getSubscribersFeed({
                page: 1,
                pageSize: 10,
              })
            }
          >
            GET/getSubscribersFeed
          </Btn>
          <Btn
            onClick={() =>
              com.getUserFeed({
                page: 1,
                pageSize: 10,
              })
            }
          >
            GET/getUserFeed
          </Btn>
          <Btn onClick={() => com.feedSetPublic(1234, 0)}>
            GET/feedSetPublic
          </Btn>
          <Btn onClick={() => com.feedSetPrivate(1234, 0)}>
            GET/feedSetPrivate
          </Btn>
          <Btn onClick={com.getSubscribersList}>GET/getSubscribersList</Btn>
        </Wrapper>
        <Wrapper>
          <Btn
            onClick={() =>
              member.postMember({
                memberName: '김형진',
                memberLoginId: 'rlagudwls3469',
                memberPassword: 'SSafy1234!!',
                memberEmail: 'rlagudwls3469@gmail.com',
                // memberProfile : 'checkMyProfile'
              })
            }
          >
            Join
          </Btn>
          <Btn
            onClick={() =>
              member.loginMember({
                memberLoginId: 'rlagudwls3469',
                memberPassword: 'SSafy1234!!',
              })
            }
          >
            Login
          </Btn>
          <Btn onClick={project.getProjectsList}>프로젝트 목록 조회</Btn>
          <Btn onClick={() => project.patchProject(1)}>프로젝트 이름 수정</Btn>
          <Btn onClick={() => project.postProject(2)}>프로젝트 생성</Btn>
          <Btn onClick={() => project.deleteProject(3)}>프로젝트 삭제</Btn>
          <Btn onClick={() => project.getProjectDetail(4)}>
            프로젝트 정보 조회
          </Btn>
          <Btn onClick={poseTest}>포즈 라벨링</Btn>
          <Btn onClick={community_tagSearch_Test}>
            [dance]community dance(tag검색)
          </Btn>
          <Btn onClick={() => member.getIdValidation('rlagudwls3469')}>
            rlagudwls3469 중복확인
          </Btn>
          <Btn onClick={() => member.getIdValidation('rlagudwls3459')}>
            rlagudwls3459 중복확인
          </Btn>
          <Btn onClick={member.logoutMember}>[member]Logout</Btn>
          <Btn onClick={member.getMemberInfo}>
            [member]정보 조회/getMemberInfo
          </Btn>
        </Wrapper>
      </Container>
      <div>
        {/* <input type="file" accept="image/*" onChange={onImageUpload}/> */}
        <input type='file' accept='video/*' onChange={onVideoUpload} />
        <input type='file' accept='image/*' onChange={onImageUpload} />
      </div>
    </>
  );
};

export default RepertoryPage;
