import { create } from '@storybook/theming';
import pkg from '../package.json';

export default create({
  base: 'light',
  brandTitle: `${pkg.name} v${pkg.version}`,
  brandUrl: pkg.homepage,
});
