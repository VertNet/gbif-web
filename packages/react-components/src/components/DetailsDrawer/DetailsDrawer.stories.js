import React, { useState } from 'react';
// import { text, boolean, select } from '@storybook/addon-knobs';
import { DetailsDrawer } from './DetailsDrawer';
import readme from './README.md';
import { StyledProse } from '../typography/StyledProse';
import { useDialogState } from "reakit/Dialog";
import { OccurrenceSidebar } from '../../entities';

export default {
  title: 'Components/DetailsDrawer',
  component: DetailsDrawer,
};

export const Example = () => {
  const dialog = useDialogState();
  return <>
    <button onClick={e => dialog.show()}>toggle {JSON.stringify(dialog.visible)}</button>
    <DetailsDrawer dialog={dialog}>
      <OccurrenceSidebar id={930742715} style={{width: 700, height: '100%'}} />
    </DetailsDrawer>
    {/* <StyledProse source={readme}></StyledProse> */}
  </>
};

Example.story = {
  name: 'DetailsDrawer',
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
// {text('Text', 'DetailsDrawer text')}