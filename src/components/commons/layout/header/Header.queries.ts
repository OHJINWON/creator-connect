import { gql } from "@apollo/client";

export const FETCH_USER = gql`
    query fetchUser($email: String!) {
        fetchUser(email: $email){
            id
            email
            name
        }
    }
    
`
export const CREATE_USER = gql`
    mutation CreateUser($createUserInput: CreateUserInput!) {
        createUser(createUserInput: $createUserInput)
    }
`