import { shallowMount } from '@vue/test-utils';
import { DateTimeForm } from './index';

describe('DateTimeForm.vue', () => {
  it('DateTimeForm time can be updated', async() => {
    const wrapper = shallowMount(DateTimeForm);
    const timeString = wrapper.find('h3');
    const hourInput = wrapper.find(`[data-testid="input-hour"]`);
    const minuteInput = wrapper.find(`[data-testid="input-minute"]`);
    const button = wrapper.find('button');

    expect(timeString.text()).not.toBe('');
    minuteInput.setData({ minute: 30 });
    await button.trigger('click');

    expect(timeString.text().endsWith('30'));
    hourInput.setData({ hour: 12 });
    await button.trigger('click');

    expect(timeString.text().endsWith('12-30'));
  });
});
