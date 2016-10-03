<template>
  <div id="app">
    <h1>ChatWork Mute Room</h1>

    <h2>Mute rooms</h2>

    <div v-for="roomId in muteRoomIds">
      <p v-text="roomId" class="roomId"></p><button v-on:click="remove(roomId)">Remove</button>
    </div>

    <div class="form">
      <input type="text" size="15" placeholder="1234567" v-model="newMuteRoomId"><button v-on:click="add" v-bind:disabled="newMuteRoomId === ''">Add</button>
    </div>

    <h2>Options</h2>

    <div class="form">
      <label>
        <input type="checkbox" v-model="enabled">Enable
      </label>

      <br>

      <label>
        <input type="checkbox" v-model="displaySeparatedNames">Display separated room names
      </label>
    </div>

    <div>
      <p>{{ message }}</p>
      <button v-on:click="save">Save</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: '',
      muteRoomIds: [],
      newMuteRoomId: '',
      enabled: true,
      displaySeparatedNames: false,
    }
  },

  methods: {
    add() {
      this.muteRoomIds.push(this.newMuteRoomId);
      this.newMuteRoomId = '';
    },

    remove(roomId) {
      const index = this.muteRoomIds.indexOf(roomId);
      this.muteRoomIds.splice(index, 1);
    },

    load() {
      chrome.runtime.sendMessage({ mode: 'loadOptions' }, response => {
        const options = response.options;

        if (options.muteRoomIds) {
          options.muteRoomIds.forEach((roomId, _) => {
            this.muteRoomIds.push(roomId);
          });
        }

        this.enabled = options.enabled;
        this.displaySeparatedNames = options.displaySeparatedNames;
      });
    },

    save() {
      const options = {
        muteRoomIds: this.muteRoomIds,
        enabled: this.enabled,
        displaySeparatedNames: this.displaySeparatedNames,
      };
      chrome.runtime.sendMessage({
        mode: "saveOptions",
        options: options
      }, response => {
        this.message = 'Saved';
      });
    }
  }
}
</script>

<style scoped>
#app {
  width: 200px;
}

.roomId {
  width: 80px;
  display: inline-block;
  margin: 0;
}

.form {
  margin-top: 10px;
}

h1 {
  font-size: 16px;
}

h2 {
  font-size: 14px;
}
</style>
