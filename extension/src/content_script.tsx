import { GetAllPostsQuery } from "./generated/graphql";
import tippy from "tippy.js";
import { TippyCSS } from "./TippyCSS";
import { css, html } from "./utils/UtilityTypeDef";
import { MD5 } from "./utils/MD5";
import { generateColorFromId } from "./utils/ColorGenerator";

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
  }

  .delinkedinButton {
    cursor: pointer;
  }

  .delinkedinModal {
    width: 200px;
    height: 300px;

    display: grid;
    grid-template-rows: 40px 1fr;

    padding: 12px 0px 12px 0px;
  }

  .delinkedinComment {
    min-height: 20px;
    width: 100%;
    padding: 6px;

    display: flex;
    align-items: center;

    border-bottom-style: solid;
    border-bottom-width: 2px;
    border-bottom-color: #ffffff11;
  }

  .delinkedinComment > img {
    width: 24.5px;
    height: 24.5px;

    padding: 3px;
    margin-right: 10px;

    border-radius: 50%;
  }

  .delinkedinCommentArea {
    width: 100%;
    height: 100%;
    overflow: auto;
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

  .delinkedinInputArea {
    width: 100%;
    height: 40px;
  }

  .delinkedinCommentInput {
    border-radius: 4px;
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

function DelinkedinComment(props: { text: string; id: string }) {
  return html`
    <div class="delinkedin delinkedinComment">
      <img
        style="background-color: ${generateColorFromId(props.id)}"
        src="http://anonymous-animals.herokuapp.com/avatar/${props.id}"
      />
      <span>${props.text}</span>
    </div>
  `;
}

const DelinkedinModal = html`
  <div class="delinkedin delinkedinModal">
    <div class="delinkedin delinkedinInputArea">
      <input
        class="delinkedin delinkedinCommentInput"
        placeholder="Spit some truths..."
      />
    </div>

    <div class="delinkedin delinkedinCommentArea">
      ${new Array(20)
        .fill(0)
        .map((_) =>
          DelinkedinComment({
            text: "Hello! Hello! Hello! Hello! Hello! Hello! Hello! Hello! Hello! Hello!",
            id: "Pedro",
          })
        )
        .join("\n")}
    </div>
  </div>
`;

tippy("#delinkedin", {
  content: DelinkedinModal,
  allowHTML: true,
  interactive: true,
  trigger: "click",
});
