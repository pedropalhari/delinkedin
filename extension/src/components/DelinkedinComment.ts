import { generateColorFromId } from "../utils/ColorGenerator";
import { css, html } from "../utils/UtilityTypeDef";

export const DelinkedinCommentCSS = css`
  .delinkedinComment {
    min-height: 20px;
    width: 100%;
    padding: 12px 6px;

    display: flex;
    align-items: flex-start;

    border-bottom-style: solid;
    border-bottom-width: 2px;
    border-bottom-color: #ffffff11;
  }

  .delinkedinComment > img {
    min-width: 24.5px;
    min-height: 24.5px;
    width: 24.5px;
    height: 24.5px;

    padding: 3px;
    margin-right: 10px;

    border-radius: 50%;
  }

  .delinkedinComment > span {
    margin-top: 0.4rem; // To center one line comments
  }
`;

export default function DelinkedinComment(props: { text: string; id: string }) {
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
