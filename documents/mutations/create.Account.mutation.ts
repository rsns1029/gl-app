import gql from "graphql-tag";

gql`
  mutation createAccount(
    $username: String!
    $password: String!
    $sex: String!
    $interestingSex: String
    $birthDay: String!
    $phoneNo: String
    $email: String
    $instaUsername: String
    $avatar: Upload
  ) {
    createAccount(
      username: $username
      password: $password
      sex: $sex
      interestingSex: $interestingSex
      birthDay: $birthDay
      phoneNo: $phoneNo
      email: $email
      instaUsername: $instaUsername
      avatar: $avatar
    ) {
      ok
      error
    }
  }
`;
