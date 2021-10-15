import { gql } from "./utils/UtilityTypeDef";

export const getAllPosts = gql`
  query getAllPosts($postId: String!) {
    getPostById(postId: $postId) {
      comments {
        id
        content
        upvoteCount
        userId
      }
    }
  }
`;

export const createComment = gql`
  mutation createComment(
    $userId: String!
    $postId: String!
    $content: String!
  ) {
    createComment(userId: $userId, postId: $postId, content: $content) {
      post {
        comments {
          id
          content
          upvoteCount
          userId
        }
      }
    }
  }
`;

export async function doGraphQl<T, U = undefined>(
  gqlQuery: string,
  variables?: U
) {
  let response = await fetch("http://localhost:4000", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: gqlQuery, variables }),
  });

  let responseJSON = await response.json();

  return responseJSON.data as T;
}
