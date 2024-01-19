import React, {useState} from 'react';
import {format} from 'date-fns';

type SignUpAppContextValue = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  reservedUsername: string;
  setReservedUsername: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  repassword: string;
  setRepassword: React.Dispatch<React.SetStateAction<string>>;
  sex: string;
  setSex: React.Dispatch<React.SetStateAction<string>>;
  birthDay: string;
  setBirthDay: React.Dispatch<React.SetStateAction<string>>;
  avatarUri: string | null;
  setAvatarUri: React.Dispatch<React.SetStateAction<string | null>>;
  phoneNo: string;
  setPhoneNo: React.Dispatch<React.SetStateAction<string>>;
  instaUsername: string;
  setInstaUsername: React.Dispatch<React.SetStateAction<string>>;
  interestingSex: string;
  setInterestingSex: React.Dispatch<React.SetStateAction<string>>;
};

const SignUpAppContext = React.createContext<SignUpAppContextValue>(
  {} as SignUpAppContextValue,
);

const SignUpAppContextProvider = ({children}: any) => {
  const [username, setUsername] = useState('');
  const [instaUsername, setInstaUsername] = useState('');
  const [reservedUsername, setReservedUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [sex, setSex] = useState('');
  const [birthDay, setBirthDay] = useState(format(new Date(), 'yyyy/MM/dd'));
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [interestingSex, setInterestingSex] = useState('');

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
