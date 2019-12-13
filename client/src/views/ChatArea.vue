<template>
  <div class="message">
    <div v-for="msg in messages" :key="msg.msg" class="message__container">
      <p
        v-if="!msg.join"
        class="message__text"
        :class="{ own: msg.isMe, other: !msg.isMe}"
        v-message="msg.msg"></p>
      <p v-if="msg.join" class="message__joined">{{msg.msg}}</p>
    </div>
  </div>
</template>

<script charset="utf-8">
export default {
  props: // message
  directives: {
    message: {
      bind: function(el, binding, vnode) {
        let chunks
        const maxLength = vnode.context.maxMessageLength
        if(typeof binding.value === 'object') {
          chunks = Math.ceil(binding.value.message.length / maxLength)
          el.innerHTML = `<span style="font-weight:bold">${ binding.value.username }</span>: ${ vnode.context.getChunkText(binding.value.message, maxLength, chunks)}`
        } else {
          chunks = Math.ceil(binding.value.length / maxLength)
          el.innerHTML = vnode.context.getChunkText(binding.value, maxLength, chunks)
        }
      }
    }
  },
  methods: {
    // Calculate the chunks text to fit within the chat area
    getChunkText(message, maxLength, index){}
  }
}
</script>
