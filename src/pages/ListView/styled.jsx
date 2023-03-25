import { styled, css } from "@mui/material/styles";

export const CardStrucutureBook = styled("div")(
  ({ theme }) =>
    css`
      margin-top: 15px;
      border: 1px solid var(--borderColors);
      border-radius: 12px;
      background-color: var(--cardBackgraoundColor);
      padding: 7px;
    `
);

export const ChaptersUl = styled("ul")(
  ({ theme }) =>
    css`
      padding: 0;
      margin: 0;
      margin-left: 12px;
      border-left: 1px solid var(--greyColor);
    `
);

export const ChaptersLi = styled("li")(
  ({ theme }) => css`
    cursor: pointer;
    color: var(--fontColor);
    user-select: none;
    list-style: none;
    padding: 8px;
    // margin-bottom: 10px;
    // margin-left: 20px;
  `
);
