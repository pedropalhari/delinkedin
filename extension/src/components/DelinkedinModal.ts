import { css, html } from "../utils/UtilityTypeDef";
import DelinkedinComment from "./DelinkedinComment";

export const DelinkedinModalCSS = css`
  .delinkedinModal {
    width: 200px;
    height: 300px;

    display: grid;
    grid-template-rows: 40px 1fr;

    padding: 12px 0px 12px 0px;
  }

  .delinkedinCommentArea {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .delinkedinInputArea {
    width: 100%;
    height: 40px;
  }

  .delinkedinCommentInput {
    border-radius: 4px;
  }

  .delinkedinCommentArea::-webkit-scrollbar {
    width: 5px;
    height: 5px;

    margin-left: 12px;
  }
  .delinkedinCommentArea::-webkit-scrollbar-track {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;

    margin-left: 12px;
  }
  .delinkedinCommentArea::-webkit-scrollbar-thumb {
    background-color: #11171a;
    border-radius: 10px;

    margin-left: 12px;
  }
`;

export function DelinkedinModal(props: { postId: string }) {
  return html`
    <div class="delinkedin delinkedinModal">
      <div class="delinkedin delinkedinInputArea">
        <input
          id="modal-input-${props.postId}"
          class="delinkedin delinkedinCommentInput"
          placeholder="Spit some truths..."
        />
      </div>

      <div
        id="modal-comment-list-${props.postId}"
        class="delinkedin delinkedinCommentArea"
      ></div>
    </div>
  `;
}
