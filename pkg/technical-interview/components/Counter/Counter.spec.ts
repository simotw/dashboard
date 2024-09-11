import { shallowMount } from '@vue/test-utils';
import { Counter } from './index';

describe('Counter.vue', () => {
  it('Counter default value should be 42', () => {
    const wrapper = shallowMount(Counter);

    expect(wrapper.find('button').text()).toMatch('42');
  });
  it('Counter value after a click should be 41', async() => {
    const wrapper = shallowMount(Counter);
    const button = wrapper.find('button');

    await button.trigger('click');

    expect(button.text()).toMatch('41');
  });
});
