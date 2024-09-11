<script lang="ts">
import Vue from "vue";
import Tabbed from "@shell/components/Tabbed/index.vue";
import Tab from "@shell/components/Tabbed/Tab.vue";
import { Counter } from "../components/Counter";
import { DateTimeForm } from "../components/DateTimeForm";
import { JSONEditor } from "../components/JSONEditor";
import { MinCoins } from "../components/MinCoins";
interface Data {}

// Data, Methods, Computed, Props
export default Vue.extend<Data, any, any, any>({
  components: { Tabbed, Tab, Counter, DateTimeForm, JSONEditor, MinCoins },

  layout: "plain",

  data() {
    return {};
  },

  computed: {},

  methods: {},
});
</script>

<template>
  <Tabbed 
    :useHash="false" 
  >
    <Tab 
      label="Tab1" 
      name="Tab1"
    >
      <div name="Tab1"><Counter /></div>
    </Tab>
    <Tab 
      label="Tab2" 
      name="Tab2"
    >
      <div name="Tab2"><DateTimeForm /></div>
    </Tab>
    <Tab 
      label="Tab3" 
      name="Tab3"
    >
      <div name="Tab3"><JSONEditor /></div>
    </Tab>
    <Tab 
      label="Tab4" 
      name="Tab4"
    >
      <div name="Tab4"><MinCoins /></div>
    </Tab>
    <Tab 
      label="Tab5" 
      name="Tab5"
    >
      <div name="Tab5">Tab5 tab content.</div>
    </Tab>
  </Tabbed>
</template>
