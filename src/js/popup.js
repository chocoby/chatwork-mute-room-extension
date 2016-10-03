'use strict';

import Vue from 'vue'
import Popup from './Popup.vue'

const app = new Vue({
  el: '#app',
  render: h => h(Popup)
})

const popup = app.$children[0];
popup.load();
