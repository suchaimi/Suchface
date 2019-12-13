<template>
  <div class="page-container">
    <div class="md-layout-item">
      <!-- Change room select -->
      <md-field>
        <label for="room">Room</label>
        <md-select v-model="room" @md-selected="onChangeRoom" name="room" id="room">
          <md-option v-for="room in this.$store.state.rooms" :key="room.id" :value="room.name">{{room.name}}</md-option>
        </md-select>
      </md-field>
    </div>

    <md-app md-waterfall md-mode="fixed">
      <!-- Room title and logout -->
      <md-app-toolbar class="md-primary">
        <span class="md-title page-container__room">{{room}}</span>
        <md-button class="md-icon-button page-container-logout" @click.native="logout()">
          <md-icon>power_settings_new</md-icon>
        </md-button>
      </md-app-toolbar>

      <!-- Connected users list -->
      <md-app-drawer md-permanent="full">
        <!-- Display the users and emit an event when the user open a private chat -->
        <UserList
          :users="users"
          :openPrivateChat="openPrivateChat.chat"
          @open-chat="openChat($event)"
        ></UserList>
      </md-app-drawer>

      <!-- Chat area with all the messages -->
      <md-app-content>
        <!-- As an input it display the messages received from the server -->
        <ChatArea :messages="messages"></ChatArea> 
      </md-app-content>
    </md-app>

    <!-- Text area to write on. It emits an event each time the user sends a message -->
    <MessageArea 
      @send-message="sendMessage($event)"> 
    </MessageArea>

    <!-- Private chat. The showDialog input controls whether we open a private chat or not -->
    <!-- The openPrivateChat is an object defined in the Vue chat component that contains 
         information to handle the private chat -->
    <ChatDialog 
      :showDialog="openPrivateChat" 
      @close-chat="closePrivateChat()">
    </ChatDialog>
  </div>
</template>

<script charset="utf-8">
export default {
  name: "chat",
  components: { UserList, ChatArea, MessageArea, ChatDialog },
  // Server evens listeners
  sockets: {
    newMessage: function({ message, username }) {
      if(message.replace(/\s/g, "")).length === 0) return
      const isMe = this.$store.state.username === username
      const msg = isMe ? ` ${message}` : {username, message}
      this.message.push({ msg, isMe })
    },
    // Rest of listeners
  },
  beforeCreate: function() {
    this.$socket.emit(WS_EVENTS.joinRoom, this.$store.state) 
  },
  data: //chat data,
  methods: {
    sendMessage(msg) {
      // Send new public message
      this.$socket.emit(WS_EVENTS.publicMessage, {
        ...this.$store.state,
        message: msg
      })
    }
  },
  // Rest of methods
}
</script>
