<script lang="ts">
import Vue from 'vue';

export default Vue.extend<any, any, any, any>({
  name: 'Counter',

  methods: {
    decrement() {
      this.count--;
    }
  },
  data() {
    return { count: 42 };
  }
});

</script>

<template>
  <div>
    <button
      class="btn role-primary"
      @click="decrement"
    >
      {{ count }}
    </button>
  </div>
</template>
