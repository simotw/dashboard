<script lang="ts">
import Vue from 'vue';
import FileSelector from '@shell/components/form/FileSelector';
import TextAreaAutoGrow from '@/pkg/rancher-components/src/components/Form/TextArea/TextAreaAutoGrow';

export default Vue.extend<any, any, any, any>({
  name:       'JSONEditor',
  components: { FileSelector, TextAreaAutoGrow },

  methods: {
    onFileSelected(file) {
      this.file = file;
      this.closeModal();
    },
    swap() {
      try {
        const obj = JSON.parse(this.file);
        const nextobj = {};
        const shouldSwap = (v) => {
          return typeof v === 'string' || typeof v === 'number';
        };

        for (const [k, v] of Object.entries(obj)) {
          if (shouldSwap(v)) {
            nextobj[v] = k;
          } else {
            nextobj[k] = v;
          }
        }
        this.file = JSON.stringify(nextobj, null, 2);
      } catch (e) {
        // console.log(e);
      }
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    }
  },
  data() {
    return { file: '', showModal: false };
  },
  watch: {
    $route() {
      if (this.$route.hash === '#Tab3') {
        this.openModal();
      }
    }
  }
});

</script>

<template>
  <div>
    <div
      v-if="showModal"
      class="modal"
    >
      <div
        class="modal-content"
      >
        <div class="modal-actions">
          <FileSelector
            class="btn role-primary"
            :label="t('interview.components.JSONEditor.chooseFile')"
            @selected="onFileSelected"
          />
          <button
            class="btn role-primary"
            @click="closeModal"
          >
            {{ t('interview.components.JSONEditor.close') }}
          </button>
        </div>
      </div>
    </div>
    <TextAreaAutoGrow
      v-model="file"
      data-testid="textarea"
      :min-height="254"
    />
    <button
      class="btn role-primary swap-button"
      data-testid="swap-button"
      @click="swap"
    >
      {{ t('interview.components.JSONEditor.swap') }}
    </button>
  </div>
</template>

<style lang='scss' scoped>

.modal {
  position: fixed; /* Stay in place */
  z-index: 50; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
  border-radius: var(--border-radius);

  .modal-content {
    background-color: var(--default);
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 50%;
    max-width: 500px;

    .modal-actions {
      display: flex;
      justify-content: space-between;
    }
  }
}

.swap-button {
  margin-top: 5px;
}
</style>
