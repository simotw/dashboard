<script lang="ts">
import dayjs from 'dayjs';
import Vue from 'vue';
import LabeledInput from '@/pkg/rancher-components/src/components/Form/LabeledInput/LabeledInput';
import Banner from '@components/Banner/Banner.vue';

const DATE_FORMAT = 'YYYY-M-D HH:mm';
const MESSAGE_TYPE = {
  EMPTY:  0,
  BEFORE: 1,
  AFTER:  2,
  SAME:   3,
};

export default Vue.extend<any, any, any, any>({
  name:       'DateTimeForm',
  components: {
    LabeledInput,
    Banner
  },
  data() {
    const currentTime = dayjs();
    const timeString = currentTime.format(DATE_FORMAT);
    const second = currentTime.second();
    const minute = currentTime.minute();
    const hour = currentTime.hour();
    const message = MESSAGE_TYPE.EMPTY;

    return {
      currentTime, timeString, second, minute, hour, message, MESSAGE_TYPE
    };
  },

  methods: {
    updateTime(event) {
      event.preventDefault();
      const nextTime = dayjs()
        .hour(this.hour)
        .minute(this.minute)
        .second(this.second);

      this.compareDate(nextTime);
      this.currentTime = nextTime;
      this.timeString = nextTime.format(DATE_FORMAT);
    },
    compareDate(nextTime) {
      // Compare currentTime and compareTime
      if (this.currentTime.isBefore(nextTime)) {
        this.message = MESSAGE_TYPE.BEFORE;
      } else if (this.currentTime.isAfter(nextTime)) {
        this.message = MESSAGE_TYPE.AFTER;
      } else {
        this.message = MESSAGE_TYPE.SAME;
      }
    }
  }
});

</script>

<template>
  <div>
    <h3>{{ timeString }} </h3>
    <div>
      <LabeledInput
        v-model="hour"
        :label="t('interview.components.DateTimeForm.hour')"
        data-testid="input-hour"
      />
      <LabeledInput
        v-model="minute"
        :label="t('interview.components.DateTimeForm.minute')"
        data-testid="input-minute"
      />
      <LabeledInput
        v-model="second"
        :label="t('interview.components.DateTimeForm.second')"
        data-testid="input-second"
      />
      <button
        class="btn role-primary"
        data-testid="submit-button"
        @click="updateTime"
      >
        {{ t('interview.components.DateTimeForm.submit') }}
      </button>
      <Banner
        v-if="message===MESSAGE_TYPE.BEFORE"
        color="info"
        data-testid="banner-before"
      >
        {{ t('interview.components.DateTimeForm.beforeUpdatedTime') }}
      </Banner>
      <Banner
        v-if="message===MESSAGE_TYPE.AFTER"
        color="info"
        data-testid="banner-after"
      >
        {{ t('interview.components.DateTimeForm.afterUpdatedTime') }}
      </Banner>
      <Banner
        v-if="message===MESSAGE_TYPE.SAME"
        color="info"
        data-testid="banner-same"
      >
        {{ t('interview.components.DateTimeForm.sameAsUpdatedTime') }}
      </Banner>
    </div>
  </div>
</template>
