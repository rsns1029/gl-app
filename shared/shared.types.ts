import {Location} from '../generated/graphql';

export type RootStackParamList = {
  StackMessagesNav: any;
  TabNav: any;
  StackLogin: {username: string; password: string} | undefined;
  Welcome: any;
  CreateAccount: any;
  EachRoom: any;
  ConditionStep: any;
  StepFour: any;
  StepBar: any;
  StepOne: any;
  StepTwo: any;
  StepThree: any;
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

export const validSignUpPages = (
  page: string,
): page is keyof RootStackParamList => {
  const validNextPages = ['StepTwo', 'StepThree', 'StepFour', 'ConditionStep'];
  return validNextPages.includes(page);
};
