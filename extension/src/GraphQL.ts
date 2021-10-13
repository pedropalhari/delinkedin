import { gql } from "./utils/UtilityTypeDef";

const getAllPosts = gql`
  query getAllPosts {
    getPostById(postId: "first_post") {
      comments {
        id
        content
        upvoteCount
        userId
      }
    }
  }
`;

async function doGraphQl<T>(gqlQuery: string) {
  let response = await fetch("http://localhost:4000", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: gqlQuery }),
  });

  let responseJSON = await response.json();

  return responseJSON.data as T;
}
