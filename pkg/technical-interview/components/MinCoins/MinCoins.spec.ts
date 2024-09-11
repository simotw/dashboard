import { shallowMount } from '@vue/test-utils';
import { MinCoins } from './index';

describe('MinCoins.vue', () => {
  it('MinCoins should print correct result', async() => {
    const wrapper = shallowMount(MinCoins);
    const testCases = [
      {
        coinsInput:  '[1, 2, 5]',
        amountInput: '11',
        expectEnd:   '[5,5,1]'
      },
      {
        coinsInput:  '[2]',
        amountInput: '3',
        expectEnd:   'null'
      },
      {
        coinsInput:  '[1]',
        amountInput: '0',
        expectEnd:   '[]'
      }
    ];

    for (const testCase of testCases) {
      const { coinsInput, amountInput, expectEnd } = testCase;

      wrapper.setData({ coins: coinsInput, amount: amountInput });

      const coinInputField = wrapper.find('[data-testid="coin-input"]');
      const amountInputField = wrapper.find('[data-testid="amount-input"]');

      await coinInputField.trigger('input');
      await amountInputField.trigger('input');

      const submitButton = wrapper.find('[data-testid="submit-button"]');

      await submitButton.trigger('click');

      const result = wrapper.find('[data-testid="result"]');

      expect(result.text().endsWith(expectEnd)).toBe(true);
    }
  });
});
