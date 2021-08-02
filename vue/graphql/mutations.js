import gql from 'graphql-tag'

export const SIGN_IN = gql`
  mutation signinUser($email: String!, $password: String!) {
    signinUser(email: $email, password: $password) {
      token
    }
  }
`

export const SIGN_UP = gql`
  mutation signupUser($name: String!, $email: String!, $password: String!) {
    signupUser(email: $email, name: $name, password: $password) {
      token
    }
  }
`

export const USER_SETTINGS = gql`
  mutation userSettings($key: String!, $value: String!) {
    userSettings(key: $key, value: $value) {
      _id
      name
      email
      avatar
    }
  }
`

export const CHANGE_PASS = gql`
  mutation changePassword($oldPass: String!, $newPass: String!) {
    changePassword(oldPass: $oldPass, newPass: $newPass) {
      _id
    }
  }
`
