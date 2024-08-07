import { gql } from "@apollo/client";

export const FETCH_USER = gql`
    query fetchUser($email: String!) {
        fetchUser(email: $email){
            id
            email
            name
            gender
            age
            birthyear
        }
    }
`
export const CREATE_BOARD = gql`
    mutation createBoard($createBoardInput: CreateBoardInput!) {
        createBoard (createBoardInput: $createBoardInput)       
    }
`