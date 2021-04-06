import React from 'react';
// import { text, boolean, select } from '@storybook/addon-knobs';
import { DataHeader, DataHeaderMobile } from './DataHeader';
import readme from './README.md';
import { StyledProse } from '../typography/StyledProse';
import DocsWrapper from '../DocsWrapper';

export default {
  title: 'Components/DataHeader',
  component: DataHeader,
};

export const Example = () => <DocsWrapper>
  <DataHeader style={{border: '1px solid #eee'}}>
    DataHeader
  </DataHeader>
  <DataHeaderMobile style={{marginTop: 24, border: '1px solid #eee'}}>
    DataHeader
  </DataHeaderMobile>
  {/* <StyledProse source={readme}></StyledProse> */}
</DocsWrapper>;

Example.story = {
  name: 'DataHeader',
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
// {text('Text', 'DataHeader text')}