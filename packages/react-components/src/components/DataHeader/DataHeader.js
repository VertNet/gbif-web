import { jsx } from '@emotion/react';
import ThemeContext from '../../style/themes/ThemeContext';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { getClasses } from '../../utils/util';
import * as css from './styles';

import { Button } from '../Button/Button';
import { Menu, MenuAction, MenuToggle, Separator } from '../Menu/Menu';
import { DetailsDrawer } from '../DetailsDrawer/DetailsDrawer';
import { useDialogState } from "reakit/Dialog";
import Doi from '../Doi/Doi';
import { MdMoreVert, MdFileDownload, MdCode, MdFormatQuote, MdHelp, MdApps } from 'react-icons/md';
import { Tabs } from '../Tabs/Tabs'
const { TabList, Tab, TabPanel, TapSeperator, TapSpacer } = Tabs;

export function DataHeader({
  className,
  ...props
}) {
  const dialog = useDialogState({ animated: true, visible: false });
  const theme = useContext(ThemeContext);
  const { classNames } = getClasses(theme.prefix, 'dataHeader', {/*modifiers goes here*/}, className);
  return <div css={css.dataHeader({theme})} className={classNames.className} {...props}>
    <Item><MdApps /></Item>
    <Item>Occurrences</Item>
    <Seperator />
    <Tabs>
      <TabList aria-labelledby="My tabs">
        <Tab tabId="table">Table</Tab>
        <Tab tabId="map">Map</Tab>
        <Tab tabId="gallery">Gallery</Tab>
      </TabList>
    </Tabs>
    <Spacer />
    <Actions>
      <Item><Doi href="https://doi.org/10.15468/aomfnb"/></Item>
      <Seperator />
      <Item><MdFileDownload /></Item>
      <Seperator />
      <Action>
        <Item>
          <MdCode />
        </Item>
      </Action>
      <Item><MdFormatQuote /></Item>
      <Item><MdHelp onClick={e => dialog.show()} /></Item>
    </Actions>
    <DetailsDrawer dialog={dialog} style={{background: 'white'}}>
      <div style={{background: 'tomato'}}>Help goes here</div>
    </DetailsDrawer>
  </div>
};

export function DataHeader2({
  className,
  ...props
}) {
  const dialog = useDialogState({ animated: true, visible: false });
  const theme = useContext(ThemeContext);
  const { classNames } = getClasses(theme.prefix, 'dataHeader', {/*modifiers goes here*/}, className);
  return <div css={css.dataHeader({theme})} className={classNames.className} {...props}>
    <Spacer />
    <Actions>
      <Action>
        <Item>
          <MdCode />
        </Item>
      </Action>
      <Item><MdFormatQuote /></Item>
      <Item><MdHelp onClick={e => dialog.show()} /></Item>
    </Actions>
    <DetailsDrawer dialog={dialog} style={{background: 'white'}}>
      <div style={{background: 'tomato'}}>Help goes here</div>
    </DetailsDrawer>
  </div>
};

export function DataHeaderMobile({
  className,
  ...props
}) {
  const theme = useContext(ThemeContext);
  const { classNames } = getClasses(theme.prefix, 'dataHeader', {/*modifiers goes here*/}, className);
  return <div css={css.dataHeader({theme})} className={classNames.className} {...props}>
    <Item><MdApps /></Item>
    <Seperator />
    <Tabs>
      <Menu
        aria-label="Custom menu"
        trigger={<Button appearance="text">Table</Button>}
        items={menuState => [
          <MenuAction onClick={e => {console.log('1button action clicked', menuState); menuState.hide()}}>About this filter</MenuAction>,
          <MenuAction onClick={e => {console.log('2button action clicked', menuState); menuState.hide()}}>Something</MenuAction>,
          <MenuAction onClick={e => {console.log('3button action clicked', menuState); menuState.hide()}}>Something</MenuAction>,
          <MenuAction onClick={e => {console.log('4button action clicked', menuState); menuState.hide()}}>Something</MenuAction>,
          <MenuAction onClick={e => {console.log('5button action clicked', menuState); menuState.hide()}}>Something</MenuAction>,
          <MenuAction onClick={e => {console.log('6button action clicked', menuState); menuState.hide()}}>Something</MenuAction>,
          <MenuAction onClick={e => {console.log('7button action clicked', menuState); menuState.hide()}}>Something</MenuAction>,
          <MenuAction onClick={e => {console.log('8button action clicked', menuState); menuState.hide()}}>Something</MenuAction>,
          <MenuAction onClick={e => {console.log('9button action clicked', menuState); menuState.hide()}}>Something</MenuAction>,
          <MenuAction onClick={e => {console.log('1button action clicked', menuState); menuState.hide()}}>Something</MenuAction>,
          <MenuAction onClick={e => {console.log('2button action clicked', menuState); menuState.hide()}}>Something</MenuAction>,
          <MenuAction onClick={e => {console.log('3button action clicked', menuState); menuState.hide()}}>Something</MenuAction>,
          <MenuAction onClick={e => {console.log('4button action clicked', menuState); menuState.hide()}}>Something</MenuAction>,
          <MenuAction onClick={e => {console.log('5button action clicked', menuState); menuState.hide()}}>Something</MenuAction>,
        ]}
      />
    </Tabs>
    <Spacer />
    <Actions>
      <Menu
        aria-label="Custom menu"
        trigger={<Button appearance="text"><Item><MdMoreVert /></Item></Button>}
        items={menuState => [
          <Item><Doi href="https://doi.org/10.15468/aomfnb"/></Item>,
          <Item>sdf</Item>,
          <div>Something</div>,
          <Separator />,
          <MenuAction>
            <Item><MdFileDownload /> Download</Item>
          </MenuAction>,
          <MenuAction onClick={e => {console.log('button action clicked', menuState); menuState.hide()}}>About this filter</MenuAction>,
          <MenuAction onClick={e => {console.log('button action clicked', menuState); menuState.hide()}}>Something</MenuAction>,
        ]}
      />
    </Actions>
  </div>
};

DataHeader.propTypes = {
  as: PropTypes.element
};

const Action = ({compact, title, children, ...props}) => {
  return <div css={css.action} title={compact ? title : null}>{children}{compact ? null : <div css={css.actionTitle} >{title}</div>}</div>
}

const Item = props => <div css={css.item} {...props}/>
const Seperator = () => <div css={css.seperator} />
const Spacer = () => <div css={css.spacer} />
const Actions = props => <div css={css.actions} {...props}/>


/*
Signature

<DataHeader>
  <ResourceNav>
    <Resource title="Occurrences" description={description} />
  </ResourceNav>
  <Seperator />
  <TabList aria-labelledby="My tabs">
    <Tab tabId="table">Table</Tab>
    <Tab tabId="map">Map</Tab>
    <Tab tabId="gallery">Gallery</Tab>
  </TabList>
  <Spacer />
  <Actions>
    <Doi href="10.234/abc" />
    <Seperator>
    <Action title="Download"><Icon></Action>
    <Seperator>
    <Action title="Download"><Icon></Action>
    <Action title="Download"><Icon></Action>
  </Actions>
</DataHeader>
*/