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
import DelinkedinPopOver, {
  DelinkedinPopOverCSS,
} from "./components/DelinkedinPopover";
import { nanoid } from "nanoid";

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
${DelinkedinPopOverCSS}
`;

const RootHTML = html`
  <style>
    ${RootCSS}
  </style>
`;

document.head.innerHTML += RootHTML;

const userId = nanoid();

function injectDelinkedinPopoverOnPost(
  currentPost: HTMLDivElement,
  postId: string
) {
  currentPost.innerHTML += html`<ul>
    ${DelinkedinPopOver({ postId })}
  </ul>`;

  tippy(`#delinkedin-${postId}`, {
    content: DelinkedinModal({ postId: postId }),
    allowHTML: true,
    interactive: true,
    trigger: "click",
    onShown: () => {
      let modalInput = document.querySelector(
        `#modal-input-${postId}`
      ) as HTMLInputElement;
      let modalCommentList = document.querySelector(
        `#modal-comment-list-${postId}`
      ) as HTMLDivElement;

      modalInput.focus();

      // Helper function to render the comment list
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

      // Get's initially the comments
      (async () => {
        let result = await doGraphQl<
          GetAllPostsQuery,
          GetAllPostsQueryVariables
        >(getAllPosts, {
          postId,
        });

        if (!result.getPostById) return;

        renderCommentList(result.getPostById.comments! as CommentType[]);
      })();

      // After every comment submission, get it again
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
          postId: postId,
          userId,
        });

        renderCommentList(
          result.createComment!.post!.comments! as CommentType[]
        );
        return;
      };
    },
  });
}

function getAllPostsAndInjectHTML() {
  let allPostsVisible = Array.from(
    document.querySelectorAll(".social-details-social-counts")
  ) as (HTMLDivElement & { delinked?: boolean })[];

  for (let i = 0; i < allPostsVisible.length; i++) {
    let currentPost = allPostsVisible[i];
    if (currentPost.delinked) return;
    currentPost.delinked = true;

    let possiblePostId =
      currentPost.parentElement?.parentElement?.parentElement?.dataset.urn;

    if (!possiblePostId) return;

    let postId = possiblePostId.split(":").join("-");
    injectDelinkedinPopoverOnPost(currentPost, postId);
  }
}

setInterval(() => {
  getAllPostsAndInjectHTML();
}, 300);

// document.body.innerHTML = RootHTML + DelinkedinPopOver;
