import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { setDefaults } from '@storybook/addon-info';
import packageInfo from '../package.json';

function loadStories() {
  require('../stories/index.js');
  // You can require as many stories as you need.
}

setDefaults({
  header: true,
  inline: true,
  source: true
});

setOptions({
  name: `${packageInfo.name} v${packageInfo.version}`,
  url: packageInfo.homepage,
  addonPanelInRight: true
});

configure(loadStories, module);
