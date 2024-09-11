import { shallowMount } from '@vue/test-utils';
import { Parentheses } from './index';

describe('Parentheses.vue', () => {
  it('Parentheses should print correct result', async() => {
    const wrapper = shallowMount(Parentheses);
    const ioPairs = [['()[]{}', 'true'], ['())', 'false']];

    for (const [input, expectedOutput] of ioPairs) {
      wrapper.setData({ input });

      const inputField = wrapper.find('[data-testid="input"]');

      await inputField.trigger('input');

      const executeButton = wrapper.find('button');

      await executeButton.trigger('click');

      const result = wrapper.find('[data-testid="output"]');

      expect(result.text().endsWith(expectedOutput)).toBe(true);
    }
  });
});
