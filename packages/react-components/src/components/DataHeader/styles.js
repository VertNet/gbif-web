import { css } from '@emotion/react';
// import { focusStyle } from '../../style/shared';

export const actionTitle = css`
  /* margin-left: 8px; */
`;

export const action = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const item = css`
  min-width: 24px;
  min-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const seperator = css`
  border-right: 1px solid #88888844;
  height: 1.5em;
  margin: 0 .25em;
`;

export const spacer = css`
  flex: 1 1 auto!important;
`;

export const dataHeader = ({...props}) => css`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  background: white;
  padding: 0 .5em;
  height: 2.5em;
  > * {
    flex: 0 0 auto;
    align-items: center;
    display: flex;
  }
`;

export const actions = css`
  ${dataHeader()};
  flex: 0 0 auto;
`;
