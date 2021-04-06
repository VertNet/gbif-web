import React from 'react';
// import { text, boolean, select } from '@storybook/addon-knobs';
import { Tabs } from './Tabs';
import readme from './README.md';
import { StyledProse } from '../typography/StyledProse';
import { Button, Row, Col } from '../index';
import { MdMenu } from "react-icons/md";
import DocsWrapper from '../DocsWrapper';

import { MdMoreHoriz } from 'react-icons/md';

const { TabList, Tab, TabPanel } = Tabs;

export default {
  title: 'Components/Tabs',
  component: Tabs,
};

export const Example = () => <DocsWrapper>
  <Tabs defaultActiveId="table">
    <div style={{height: '3rem', width: 370, background: 'white'}}>
      <TabList aria-labelledby="My tabs" id="tabList">
        <Tab tabId="table">Table</Tab>
        <Tab tabId="map">Map</Tab>
        <Tab tabId="gallery">Gallery</Tab>
        <Tab tabId="gallery2">Gallery2</Tab>
        <Tab tabId="gallery3">Gallery3</Tab>
        <Tab tabId="gallery4">Gallery4</Tab>
        <Tab tabId="gallery5">Gallery5</Tab>
        <Tab tabId="gallery6">Gallery6</Tab>
        <Tab tabId="gallery7">Gallery7</Tab>
      </TabList>
    </div>
    <button>can recieve focus</button>
    <TabPanel tabId="table">This component still needs accesability considerations. There seem to be great disagreement on the most friendly implementation of tabs</TabPanel>
    <TabPanel tabId="map">Tab content 2</TabPanel>
    <TabPanel tabId="gallery">Tab content 3</TabPanel>
    <TabPanel tabId="gallery2">Gallery 2</TabPanel>
    <TabPanel tabId="gallery3">Gallery 3</TabPanel>
    <TabPanel tabId="gallery4">Gallery 4</TabPanel>
    <TabPanel tabId="gallery5">Gallery 5</TabPanel>
    <TabPanel tabId="gallery6">Gallery 6</TabPanel>
    <TabPanel tabId="gallery7">Gallery 7</TabPanel>
  </Tabs>

  {/* <Tabs defaultActiveId="table">
    <div style={{height: '3rem', height: 200, background: 'white'}}>
      <TabList aria-labelledby="My tabs" vertical style={{width: '5rem'}}>
        <Tab tabId="table">T</Tab>
        <Tab tabId="map">M</Tab>
        <Tab tabId="gallery">G</Tab>
      </TabList>
    </div>
    <TabPanel tabId="table">This component still needs accesability considerations. There seem to be great disagreement on the most friendly implementation of tabs</TabPanel>
    <TabPanel tabId="map">Tab content 2</TabPanel>
    <TabPanel tabId="gallery">Tab content 3</TabPanel>
  </Tabs> */}
  {/* <StyledProse source={readme}></StyledProse> */}
</DocsWrapper>;

Example.story = {
  name: 'Tabs',
};


// // OPTIONS
// const options = {
//   primary: 'primary',
//   primaryOutline: 'primaryOutline',
//   outline: 'outline',
//   danger: 'danger',
// };
// type={select('Type', options, options.primary)}

// // BOOLEAN
// boolean("loading", false)

// // TEXT
// {text('Text', 'Tabs text')}