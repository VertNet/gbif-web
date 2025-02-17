import { jsx } from '@emotion/react';
import ThemeContext from "../../../../style/themes/ThemeContext";
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Properties } from "../../../../components";
const { Term: T, Value: V } = Properties;

// import * as css from './styles';

export function DynamicProperties({ as: Div = "div", data, ...props }) {
  const theme = useContext(ThemeContext);
  if (!data) return null;
  try {
    const json = JSON.parse(data);
    return (
      <Properties horizontal={true}>
        {Object.keys(json).map((k) => (
          <React.Fragment key={k}>
            <T>{k}</T>
            <V>{json[k]}</V>
          </React.Fragment>
        ))}
      </Properties>
    );
  } catch (e) {
    return data;
  }
}

DynamicProperties.propTypes = {
  as: PropTypes.element,
};
