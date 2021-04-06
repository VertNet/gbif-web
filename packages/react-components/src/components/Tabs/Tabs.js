
// intersting warning about the standard story about aria tabs https://simplyaccessible.com/article/danger-aria-tabs/
import { jsx } from '@emotion/react';
import ThemeContext from '../../style/themes/ThemeContext';
import React, { useContext, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { uncontrollable } from 'uncontrollable';
import { MdMoreHoriz } from 'react-icons/md';
import { oneOfMany } from '../../utils/util';
import * as styles from './styles';
import { Button } from '../Button';
import { Menu, MenuAction } from '../Menu';

import { useMount } from 'react-use';
import useRefs from './useRefs';

export const TabsContext = React.createContext({});

const ControlledTabs = ({
  activeId,
  onChange,
  ...props
}) => {
  return (
    <TabsContext.Provider value={{ activeId, onChange }} {...props} />
  );
};
ControlledTabs.propTypes = {
  activeId: PropTypes.string,
  defaultActiveId: PropTypes.string,
  onChange: PropTypes.func,
}

export const TapSeperator = props => {
  const theme = useContext(ThemeContext);
  return <li css={styles.tabSeperator({ theme })} {...props}>&nbsp;</li>
}

export const TapSpacer = props => {
  const theme = useContext(ThemeContext);
  return <li css={styles.tabSpacer({ theme })} {...props}></li>
}

export const Tabs = uncontrollable(ControlledTabs, {
  activeId: 'onChange'
});

export const TabList = ({
  vertical = false,
  children,
  ...props
}) => {
  const theme = useContext(ThemeContext);
  const tabContext = useContext(TabsContext);
  const [getTabRef, removeTabRef] = useRefs();
  const [sizes, setSizes] = useState(new Map());
  const [elWidth, setElWidth] = useState();
  const ref = useRef();

  const hiddenTabs = [];
  let activeTab;
  const tabs = children.map(tab => {
    if (React.isValidElement(tab)) {
      // const isHidden = sizes.get(tab.props.tabId)?.offsetRight > elWidth;
      const isHidden = sizes.get(tab.props.tabId)?.isHidden;
      if (isHidden) {
        hiddenTabs.push(tab);
      }
      return React.cloneElement(tab, { vertical, ref: getTabRef(tab.props.tabId), key: tab.props.tabId, isHidden});
    }
    return tab;
  });

  useEffect(() => {
    const containerWidth = ref.current.offsetWidth;
    setElWidth(containerWidth);
    const sizeMap = new Map();
    let widest = 0;
    tabs.forEach(tab => {
      const ref = getTabRef(tab.props.tabId);
      if (!ref.current) return;
      const offsetLeft = ref.current.offsetLeft;
      const width = ref.current.offsetWidth;
      widest = Math.max(widest, width);
      const offsetRight = ref.current.offsetWidth + offsetLeft;
      const isActive = tabContext.activeId === tab.props.tabId;
      sizeMap.set(tab.props.tabId, {width, offsetLeft, offsetRight, isActive, tab});
    });
    tabs.forEach(tab => {
      const isHidden = sizeMap.get(tab.props.tabId) && sizeMap.get(tab.props.tabId).offsetRight + widest > containerWidth;
      sizeMap.set(tab.props.tabId, {isHidden, ...sizeMap.get(tab.props.tabId)});
    });
    setSizes(sizeMap);
  }, []);

  return <ul ref={ref}
    css={styles.tabList({ theme, vertical })}
    {...props}>
    {tabs}
    {/* {hiddenTabs.length > 0 && 
      <Button appearance="text" css={styles.more({ theme, vertical })}>
        <MdMoreHoriz />
      </Button>
    } */}
    {hiddenTabs.length > 0 && <Menu trigger={<Button 
      // css={styles.more({ theme, vertical })}
      css={styles.tab({ theme, isActive:sizes.get(tabContext.activeId).isHidden })}
      appearance="text">
        {sizes.get(tabContext.activeId).isHidden ? <> {sizes.get(tabContext.activeId).tab.props.children} <MdMoreHoriz /> </> : <MdMoreHoriz />}
      </Button>}
      items={menuState => hiddenTabs.map(tab => <MenuAction onClick={e => {tabContext.onChange(tab.props.tabId); menuState.hide()}}>{tab.props.children}</MenuAction>)}
      />}
  </ul>

};
TabList.displayName = 'TabList';
TabList.propTypes = {
  ['aria-label']: oneOfMany(['aria-label', 'aria-labelledby'])
};

export const Tab = React.forwardRef(({
  tabId,
  direction,
  vertical,
  isHidden,
  style = {},
  ...props
}, ref) => {
  const theme = useContext(ThemeContext);
  const tabContext = useContext(TabsContext);
  const isActive = tabContext.activeId === tabId;
  const tabProps = {
    'aria-selected': isActive ? true : false,
    'aria-controls': `${tabId}_panel`,
    'role': 'button',
    'id': `${tabId}_tab`,
    'onClick': () => tabContext.onChange(tabId)
  }
  return <li
    tabIndex="0"
    ref={ref}
    style={{...style, display: isHidden ? 'none' : null}}
    css={styles.tab({ theme, isActive, vertical, direction: vertical && !direction ? 'right' : direction })}
    {...tabProps}
    {...props}
  />
});

Tab.displayName = 'Tab';
Tab.propTypes = {
  as: PropTypes.node,
  tabId: PropTypes.string,
  direction: PropTypes.string,
  children: PropTypes.any,
};

export const TabPanel = ({
  tabId,
  lazy,
  ...props
}) => {
  // const theme = useContext(ThemeContext);
  const tabContext = useContext(TabsContext);
  const isActive = tabContext.activeId === tabId;
  if (lazy && !isActive) return null;
  return <div
    id={`${tabId}_panel`}
    aria-labelledby={`${tabId}_tab`}
    // css={styles.tabs({theme})}
    hidden={!isActive}
    {...props} />
};
TabPanel.displayName = 'TabPanel';
TabPanel.propTypes = {
  tabId: PropTypes.string,
  lazy: PropTypes.bool,
};

Tabs.Tab = Tab;
Tabs.TabList = TabList;
Tabs.TabPanel = TabPanel;
Tabs.TapSeperator = TapSeperator;
Tabs.TapSpacer = TapSpacer;