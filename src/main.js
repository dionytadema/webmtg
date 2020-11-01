import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import AudioSystem from './classes/AudioSystem'
import users from './data/users'
import decks from './data/decks'

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App),
  data: ()=>({
    path: "load",
    // Game
    game: {
        active: false,
        mode: "casual",
        players: [],
        teams: [],
    },
    // Data
    users: users,
    decks: decks,
    // Constants
    gurl: "https://gatherer.wizards.com/Handlers/Image.ashx?",
  })
}).$mount('#app')

// Utils
window.sleep = s=>new Promise(r=>setTimeout(r, s*1000))
window.audiosys = new AudioSystem()
// State
window.jid = Math.floor(Math.random()*256*256)
window.newId = ()=>{
  let t = Math.floor(new Date().getTime()/1000)
  let tx = t.toString(16)
  while (tx.length<8)
    tx = "0"+tx
  let cx = window.jid.toString(16)
  while (cx.length<4)
    cx = "0"+cx
  let r = Math.floor(Math.random()*256*256)
  let rx = r.toString(16)
  while (rx.length<4)
    rx = "0"+rx
  window.jid++
  return tx+cx+rx
}