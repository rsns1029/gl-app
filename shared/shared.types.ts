import {Location} from '../generated/graphql';
import {EditProfileProps} from '../screens/EditProfile.tsx';

export type RootStackParamList = {
  Chats: any;
  TabNav: any;
  StackLogin: {username: string; password: string} | undefined;
  Welcome: any;
  CreateAccount: any;
  EachRoom: {id: number; talkingTo: User | undefined};
  ConditionStep: any;
  StepFour: any;
  StepBar: any;
  StepOne: any;
  StepTwo: any;
  StepThree: any;
  Rooms: any;
  MyProfile: any;
  Map: undefined;
  Matches: undefined;
  StackProfileNavigation: any;
  StackFollowers: any;
  StackFollowing: any;
  StackProfile: any;
  StackEditProfile: any;
  StackMessagesNav: undefined;
  StackPhotoNavigation: any;
  StackSearch: any;
  StackPhoto: any;
  TabSelectPhoto: any;
  StackUploadPhotoNavigation: any;
};

export interface User {
  id: number;
  username: string;
  sex: string;
  interestingSex: string;
  interestingAge?: number;
  birthDay: string;
  phoneNo: string;
  password: string;
  instaUsername?: string;
  email?: string;
  following: User[];
  followers: User[];
  avatar?: string;
  photos: Photo[];
  location: Location;
  introduction?: string;
  createdAt: string;
  updatedAt: string;
  isFollowing: boolean;
  userType: string;
  userStatus?: string;
}

export interface Photo {
  id: number;
  user: User;
  file: string;
}

export type CreateAccountValidPage =
  | 'StepOne'
  | 'StepTwo'
  | 'StepThree'
  | 'StepFour'
  | 'ConditionStep';
