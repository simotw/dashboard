<script lang="ts">
import Vue from 'vue';
import LabeledInput from '@/pkg/rancher-components/src/components/Form/LabeledInput/LabeledInput';

export default Vue.extend<any, any, any, any>({
  name:       'MinCoins',
  components: { LabeledInput },
  methods:    {
    submit(event) {
      event.preventDefault();
      this.minCoins();
    },
    minCoins() {
      const coins = JSON.parse(this.coins);

      if (!Array.isArray(coins)) {
        return;
      }
      const amount = this.amount;
      const dp = { 0: [] };

      coins.sort((a, b) => a - b);
      for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
          const from = i - coin;

          if (from < 0 || !Object.hasOwnProperty.call(dp, from)) {
            continue;
          }
          if (!Object.hasOwnProperty.call(dp, i) || dp[i].length > dp[from].length + 1) {
            dp[i] = [...dp[from], coin];
          }
        }
      }
      this.result = Object.hasOwnProperty.call(dp, amount) ? JSON.stringify(dp[amount]) : 'null';
    }
  },
  data() {
    return {
      coins:  '[]',
      amount: 0,
      result: '[]'
    };
  }
});

</script>

<template>
  <div>
    <LabeledInput
      v-model="coins"
      :label="t('interview.components.MinCoins.coins')"
      data-testid="coin-input"
    />
    <LabeledInput
      v-model="amount"
      :label="t('interview.components.MinCoins.amount')"
      data-testid="amount-input"
    />
    <button
      class="btn role-primary submit-button"
      data-testid="submit-button"
      @click="submit"
    >
      {{ t('interview.components.MinCoins.amount') }}
    </button>
    <h3
      data-testid="result"
    >
      {{ t('interview.components.MinCoins.result') }} {{ result }}
    </h3>
  </div>
</template>

<style lang='scss' scoped>
.submit-button {
  margin: 10px 0;
}
</style>
