import { css, html } from "../utils/UtilityTypeDef";

export const DelinkedinPopOverCSS = css`
  .delinkedinButton {
    cursor: pointer;
  }
`;

export default function DelinkedinPopOver(props: { postId: string }) {
  return html`
    <div>
      <span id="delinkedin-${props.postId}" class="delinkedin delinkedinButton"
        >🔥</span
      >
    </div>
  `;
}
