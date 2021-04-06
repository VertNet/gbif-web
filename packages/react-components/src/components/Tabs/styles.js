import { css } from '@emotion/react';
import camelCase from 'lodash/camelCase';
// import { focusStyle } from '../../style/shared';

const opposite = {
  left: 'right',
  right: 'left',
  top: 'bottom',
  bottom: 'top'
}
const border = (width, color, dir, isActive) => ({
  border: '0 solid transparent',
  [camelCase(`border-${dir}`)]: `${width}px solid ${isActive ? color : 'transparent'}`,
  [camelCase(`border-${opposite[dir]}`)]: `${width}px solid transparent`,
});

export const tab = ({ theme, vertical, direction = 'bottom', isActive }) => css`
  ${border(3, theme.primary500, direction, isActive)}
  padding: ${vertical ? '8px 0' : '0 8px'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 1 auto;
  ${vertical ? 'width' : 'height'}: 100%;
  cursor: pointer;
  &:hover, &:focus {
    outline: none;
    background: rgba(0,0,0,.05);
  }
  ::-moz-focus-inner {
    border-style: none;
  }
`;

export const tabList = ({ theme, vertical }) => css`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: ${vertical ? 'column' : 'row'};
  flex-wrap: nowrap;
  align-items: center;
  ${vertical ? 'width' : 'height'}: 100%;
  /* overflow: hidden; */
  position: relative;
`;

export const more = (props) => css`
  /* position: absolute; */
  /* right: 0; */
  min-width: 3rem;
  ${tab(props)};
`;

export const tabSeperator = ({ theme, vertical }) => css`
  margin: 0 10px;
  width: 1px;
  margin: 5px 0;
  flex: 0 1 auto;
  border-left: 1px solid #ddd;
`;

export const tabSpacer = ({ theme, vertical }) => css`
  flex: 1 1 auto;
`;

export default {
  tab,
  tabList,
  tabSeperator,
  tabSpacer
}