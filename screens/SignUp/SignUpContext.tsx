import React, {useState} from 'react';
import {format} from 'date-fns';

type SignUpAppContextValue = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  reservedUsername: string;
  setReservedUsername: React.Dispatch<React.SetStateAction<string>>;
  email: string | null;
  setEmail: React.Dispatch<React.SetStateAction<string | null>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  repassword: string;
  setRepassword: React.Dispatch<React.SetStateAction<string>>;
  sex: 'M' | 'F';
  setSex: React.Dispatch<React.SetStateAction<'M' | 'F'>>;
  birthDay: string;
  setBirthDay: React.Dispatch<React.SetStateAction<string>>;
  avatarUri: string | null;
  setAvatarUri: React.Dispatch<React.SetStateAction<string | null>>;
  phoneNo: string | null;
  setPhoneNo: React.Dispatch<React.SetStateAction<string | null>>;
  instaUsername: string | null;
  setInstaUsername: React.Dispatch<React.SetStateAction<string | null>>;
  interestingSex: 'M' | 'F';
  setInterestingSex: React.Dispatch<React.SetStateAction<'M' | 'F'>>;
};

const SignUpAppContext = React.createContext<SignUpAppContextValue>(
  {} as SignUpAppContextValue,
);

const SignUpAppContextProvider = ({children}: any) => {
  const [username, setUsername] = useState<string>('');
  const [instaUsername, setInstaUsername] = useState<string | null>(null);
  const [reservedUsername, setReservedUsername] = useState<string>('');
  const [email, setEmail] = useState<string | null>(null);
  const [phoneNo, setPhoneNo] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [sex, setSex] = useState<'M' | 'F'>('M');
  const [birthDay, setBirthDay] = useState(format(new Date(), 'yyyy/MM/dd'));
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [interestingSex, setInterestingSex] = useState<'M' | 'F'>('F');

  const contextValue = {
    username,
    setUsername,
    reservedUsername,
    setReservedUsername,
    email,
    setEmail,
    password,
    setPassword,
    repassword,
    setRepassword,
    sex,
    setSex,
    birthDay,
    setBirthDay,
    avatarUri,
    setAvatarUri,
    phoneNo,
    setPhoneNo,
    instaUsername,
    setInstaUsername,
    interestingSex,
    setInterestingSex,
  };

  return (
    <SignUpAppContext.Provider value={contextValue}>
      {children}
    </SignUpAppContext.Provider>
  );
};

export {SignUpAppContext, SignUpAppContextProvider};
