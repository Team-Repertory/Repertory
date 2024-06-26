interface Project {
  id: number;
  memberId: number;
  projectDate: string;
  projectName: string;
  projectThumbnailUrl: string;
  // sourceList
}

interface Tag {
  tagId: number;
  memberId: number;
  tagName: string;
}

interface Source {
  memberId: number;
  sourceCount: number;
  sourceEnd: string;
  sourceId: number;
  sourceLength: number;
  sourceName: string;
  sourceStart: string;
  sourceThumbnailUrl: string;
  sourceUrl: string;
  tagNameList: string[];
}

interface MySource extends Source {
  tagList: Tag[];
}

export class Tab {
  name: string;
  clicked: boolean;
  onClick: () => void;

  constructor(name: string, clicked: boolean, onClick: () => void) {
    this.name = name;
    this.clicked = clicked;
    this.onClick = onClick;
  }
}

interface Community {
  downloadCount: number;
  feedDate: string;
  feedDisable: boolean;
  feedId: number;
  feedName: string;
  feedThumbnailUrl: string;
  feedType: string;
  feedUrl: string;
  isDownloaded: boolean;
  isLiked: boolean;
  likeCount: number;
  memberId: number;
  memberName: string;
  memberProfile: string;
  originId: number;
}

interface CommunityDetail {
  feed: Community;
  profile: Profile;
  sources: Community[];
}

interface Member {
  memberId: number;
  memberName: string;
  memberProfile: string;
}

interface Profile extends Member {
  followed: boolean;
  followerCount: number;
}

interface Modal {
  isOpen: boolean;
  closeModal: () => void;
  dances: Community[];
  index: number;
  nextDance: () => void;
  prevDance: () => void;
}

interface IProject {
  imageUrl: string;
  title: string;
  detail: string;
}

export type {
  Project,
  Tag,
  Source,
  MySource,
  Community,
  CommunityDetail,
  Member,
  Modal,
  IProject,
  Profile,
};
