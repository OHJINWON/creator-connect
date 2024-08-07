import { gql } from "@apollo/client";

export const FETCH_BOARD = gql`
    query fetchBoard($email: String!) {
        fetchBoard(email: $email) {
            id
            email
        }
    }
`
export const FETCH_BOARDS = gql`
    query fetchBoards {
        fetchBoards {
            id
            number
            name
            nickname
            age
            gender
            field
            email
            price
            aboutMe
        }
    }
`
export const FETCH_USER = gql`
    query fetchUser($email: String!) {
        fetchUser(email: $email){
            id
            email
            name
            gender
            age
        }
    }
`