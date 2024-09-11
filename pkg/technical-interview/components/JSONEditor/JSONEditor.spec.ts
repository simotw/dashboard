import { shallowMount } from '@vue/test-utils';
import { JSONEditor } from './index';

describe('JSONEditor.vue', () => {
  it('JSONEditor should update file', async() => {
    const wrapper = shallowMount(JSONEditor);
    const input = JSON.stringify({ a: 1, b: [] });

    wrapper.setData({ file: input });

    const textarea = wrapper.find('[data-testid="textarea"]');

    await textarea.trigger('input');

    const swapButton = wrapper.find('[data-testid="swap-button"]');

    await swapButton.trigger('click');

    const expectedSwappedJSON = JSON.stringify({ 1: 'a', b: [] }, null, 2);

    expect(wrapper.vm.file).toBe(expectedSwappedJSON);
  });
});
