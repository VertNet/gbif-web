import React, { useContext } from 'react';
import get from 'lodash/get';
import { Popover as SuggestPopover, FilterContent as SuggestContent } from '../../widgets/Filter/types/SuggestFilter';
import { Popover as RangePopover, FilterContent as RangeContent } from '../../widgets/Filter/types/RangeFilter';
import { Popover as EnumPopover, FilterContent as EnumContent } from '../../widgets/Filter/types/EnumFilter';
import { FilterContext } from '../../widgets/Filter/state';
import { TriggerButton } from '../../widgets/Filter/utils/TriggerButton';

export function getButton(Popover, { translations, filterHandle, LabelFromID }) {
  return function Trigger(props) {
    const currentFilterContext = useContext(FilterContext);
    return <Popover modal >
      <TriggerButton {...props}
        translations={translations}
        filterHandle={filterHandle}
        DisplayName={LabelFromID}
        options={get(currentFilterContext.filter, `must.${filterHandle}`, [])}
      />
    </Popover>
  }
}

export function filterBuilder({ labelMap, suggestConfigMap, filterWidgetConfig, context }) {
  const filters = Object.entries(filterWidgetConfig).reduce((acc, [widgetHandle, { type, config }]) => {
    const builderConfig = { widgetHandle, config, labelMap, suggestConfigMap, context };
    let filter;
    if (type === 'SUGGEST') {
      filter = buildSuggest(builderConfig);
    } else if (type === 'NUMBER_RANGE') {
      filter = buildNumberRange(builderConfig);
    } else if (type === 'ENUM') {
      filter = buildEnum(builderConfig);
    }
    const trNameId = config.std?.translation?.name || `filter.${config?.std?.filterHandle || widgetHandle}.name`;
    acc[widgetHandle] = {
      ...filter,
      displayName: context.formatMessage({id: trNameId})
    };
    return acc;
  }, {});
  return filters;
}

function buildSuggest({ widgetHandle, config, labelMap, suggestConfigMap, context }) {
  const conf = {
    filterHandle: config.std.filterHandle || widgetHandle,
    translations: config.std.translations,
    config: {
      suggestConfig: suggestConfigMap[config.specific.suggestHandle || widgetHandle],
      LabelFromID: labelMap[config.specific.id2labelHandle],
      ...config
    },
    LabelFromID: labelMap[config.std.id2labelHandle || widgetHandle],
  }

  const Popover = props => <SuggestPopover {...conf} {...props} />;
  return {
    Button: getButton(Popover, conf),
    Popover,
    Content: props => <SuggestContent {...conf} {...props} />,
    LabelFromID: config.LabelFromID
  };
}

function buildNumberRange({ widgetHandle, config, labelMap, context }) {
  const conf = {
    filterHandle: config.std.filterHandle || widgetHandle,
    translations: config.std.translations,
    config: config.specific,
    LabelFromID: labelMap[config.std.id2labelHandle || widgetHandle],
  }
  const Popover = props => <RangePopover {...conf} {...props} />;
  return {
    Button: getButton(Popover, conf),
    Popover,
    Content: props => <RangeContent {...conf} {...props} />,
    LabelFromID: config.LabelFromID,
  };
}

function buildEnum({ widgetHandle, config, labelMap }) {
  const conf = {
    filterHandle: config.std.filterHandle || widgetHandle,
    translations: config.std.translations,
    config: {
      ...config.specific,
      options: config.specific.hasOptionDescriptions
        ? config.specific.options
        : config.specific.options.map(x => ({ key: x }))
    },
    LabelFromID: labelMap[config.std.id2labelHandle || widgetHandle],
  }
  const Popover = props => <EnumPopover {...conf} {...props} />;
  return {
    Button: getButton(Popover, conf),
    Popover,
    Content: props => <EnumContent {...conf} {...props} />,
    LabelFromID: config.LabelFromID,
  };
}