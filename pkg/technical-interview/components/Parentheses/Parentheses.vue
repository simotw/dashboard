
<script lang="ts">
import Vue from 'vue';
import LabeledInput from '@/pkg/rancher-components/src/components/Form/LabeledInput/LabeledInput';

export default Vue.extend<any, any, any, any>({
  name:       'Parentheses',
  components: { LabeledInput },
  methods:    {
    submit(event) {
      event.preventDefault();
      this.output = this.isValid(this.input) ? 'true' : 'false';
    },
    isValid(input) {
      const arr = input.split('');
      const m = {
        ')': '(',
        ']': '[',
        '}': '{',
      };
      const stack = [];

      for (const c of arr) {
        if (stack.length && stack[stack.length - 1] === m[c]) {
          stack.pop();
        } else {
          stack.push(c);
        }
      }

      return stack.length === 0;
    }
  },
  data() {
    return { input: '()', output: '' };
  }
});

</script>

<template>
  <div>
    <LabeledInput
      v-model="input"
      :label="t('interview.components.Parentheses.input')"
      data-testid="input"
    />
    <button
      class="btn role-primary execute-button"
      @click="submit"
    >
      {{ t('interview.components.Parentheses.execute') }}
    </button>
    <h3
      data-testid="output"
    >
      {{ t('interview.components.Parentheses.output') }}
      {{ output }}
    </h3>
  </div>
</template>

<style lang='scss' scoped>
.execute-button {
  margin: 10px 0;
}
</style>
