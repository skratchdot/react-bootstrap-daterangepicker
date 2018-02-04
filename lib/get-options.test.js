import getOptions from './get-options';
test('get-options', () => {
  expect(getOptions()).toMatchSnapshot();
});
