import tippy from "tippy.js";
import { TippyCSS } from "./TippyCSS";
import { css, html } from "./utils/UtilityTypeDef";
import {
  CommentType,
  CreateCommentMutation,
  GetAllPostsQuery,
  GetAllPostsQueryVariables,
  Mutation,
  MutationCreateCommentArgs,
} from "./generated/graphql";

import DelinkedinComment, {
  DelinkedinCommentCSS,
} from "./components/DelinkedinComment";
import {
  DelinkedinModal,
  DelinkedinModalCSS,
} from "./components/DelinkedinModal";
import { createComment, doGraphQl, getAllPosts } from "./GraphQL";

const RootCSS = css`
  ${TippyCSS}

  .delinkedin {
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
  }

  input.delinkedin {
    outline-width: 0px;
    border: 0px;

    width: 100%;
    height: 28px;

    padding-left: 4px;

    background-color: #ffffff33;
    color: white;
  }

  /* Components */
  ${DelinkedinCommentCSS}
  ${DelinkedinModalCSS}

  .delinkedinButton {
    cursor: pointer;
  }
`;

const RootHTML = html`
  <style>
    ${RootCSS}
  </style>
`;

const DelinkedinPopOver = html`
  <div>
    <span id="delinkedin" class="delinkedin delinkedinButton">🔥</span>
  </div>
`;

document.body.innerHTML = RootHTML + DelinkedinPopOver;

const POST_ID = "123456";

tippy("#delinkedin", {
  content: DelinkedinModal({ postId: POST_ID }),
  allowHTML: true,
  interactive: true,
  trigger: "click",
  onShown: () => {
    let modalInput = document.querySelector(
      `#modal-input-${POST_ID}`
    ) as HTMLInputElement;
    let modalCommentList = document.querySelector(
      `#modal-comment-list-${POST_ID}`
    ) as HTMLDivElement;

    function renderCommentList(comments: CommentType[]) {
      modalCommentList.innerHTML = comments
        .reverse()
        .map((c) =>
          DelinkedinComment({
            text: c!.content,
            id: c!.userId,
          })
        )
        .join("\n");
    }

    (async () => {
      let result = await doGraphQl<GetAllPostsQuery, GetAllPostsQueryVariables>(
        getAllPosts,
        {
          postId: POST_ID,
        }
      );

      if (!result.getPostById) return;

      renderCommentList(result.getPostById.comments! as CommentType[]);
    })();

    modalInput.onchange = async (e) => {
      const input = e.target as HTMLInputElement;
      let comment = input.value.trim();

      if (!comment) {
        input.value = "";
        return;
      }

      input.value = "";

      let result = await doGraphQl<
        CreateCommentMutation,
        MutationCreateCommentArgs
      >(createComment, {
        content: comment,
        postId: POST_ID,
        userId: "pedro",
      });

      renderCommentList(result.createComment!.post!.comments! as CommentType[]);
      return;
    };
  },
});
