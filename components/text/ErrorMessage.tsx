import styled from 'styled-components/native';
import {ReactNode} from 'react';

const ErrorMessageText = styled.Text`
  color: red;
  text-align: center;
`;

interface ErrorMessageProps {
  children: ReactNode;
}

export default function ErrorMessage({children}: ErrorMessageProps) {
  return <ErrorMessageText>{children}</ErrorMessageText>;
}
