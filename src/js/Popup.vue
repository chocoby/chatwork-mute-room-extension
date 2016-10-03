<template>
  <div id="app">
    <h1>ChatWork Mute Room</h1>

    <h2>Mute rooms</h2>

    <div v-for="roomId in roomIds">
      <p v-text="roomId" class="roomId"></p><button v-on:click="remove(roomId)">Remove</button>
    </div>

    <div class="form">
      <input type="text" size="15" placeholder="1234567" v-model="newRoomId"><button v-on:click="add" v-bind:disabled="newRoomId === ''">Add</button>
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
      newRoomId: '',
      roomIds: [],
    }
  },

  methods: {
    add() {
      this.roomIds.push(this.newRoomId);
      this.newRoomId = '';
    },

    remove(roomId) {
      const index = this.roomIds.indexOf(roomId);
      this.roomIds.splice(index, 1);
    },

    load() {
      chrome.runtime.sendMessage({ mode: 'loadOptions' }, response => {
        const options = response.options;

        if (options.excludeRooms) {
          options.excludeRooms.forEach((roomId, _) => {
            this.roomIds.push(roomId);
          });
        }
      });
    },

    save() {
      const options = {
        excludeRooms: this.roomIds
      };
      chrome.runtime.sendMessage({
        mode: "saveOptions",
        options: options
      }, response => {
        this.message = 'Saved'
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
