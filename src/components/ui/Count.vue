<template>
  <div class="count">
    <Card class="small"
      v-if="count.img"
      :image="count.img"/>
    <v-btn text x-large class="val text-h2 mx-2"
      @mousedown="dragStart">{{val}}</v-btn>
    <div class="ctrl">
      <v-btn small
        @click="add()"
        @click.right.prevent="add(5)"
      >+</v-btn>
      <v-btn small
        @click="add(-1)"
        @click.right.prevent="add(-5)"
      >-</v-btn>
    </div>
  </div>
</template>

<script>
import Card from '../ui/Card';

export default {
  name: 'Count',
  components: {
    Card,
  },
  props: {
    count: Object,
  },
  data: () => ({
    active: false,
    drag: false,
    y: 0,
    v: 0,
  }),
  computed: {
    val() {
      if (this.drag) return this.v
      return this.count.disp
    }
  },
  methods: {
    act() {
      if (this.active)
        return
      this.active = true
      this.upd()
    },
    upd() {
      let c = this.count
      if (c.val>c.disp) {
        this.gain()
        c.disp++
      }
      if (c.val<c.disp) {
        this.lose()
        c.disp--
      }
      // Check if done
      if (c.val==c.disp) {
        this.active = false
        return
      }
      setTimeout(this.upd,100)
    },
    add(x=1) {
      this.count.val+=x
      this.act()
    },
    scroll(e) {
      if (e.deltaY<0)
        this.count.val++
      else
        this.count.val--
      this.act()
    },
    dragStart(e) {
      this.drag = true
      this.y = e.clientY
      this.v = this.count.val
      document.addEventListener("mousemove", this.dragUpd)
      document.addEventListener("mouseup", this.dragEnd)
    },
    dragUpd(e) {
      this.v = this.count.val + Math.floor((this.y - e.clientY)/20)
    },
    dragEnd() {
      document.removeEventListener("mousemove", this.dragUpd)
      document.removeEventListener("mouseup", this.dragEnd)
      this.count.val = this.v
      this.drag = false
      this.act()
    },
    async gain() {
      let sound;
      if(this.count.sound_gain)
        sound = this.count.sound_gain
      else// Default
        sound = require("@/assets/sound/gain.mp3")
      let audio = new Audio(sound)
      await new Promise((r) => {
        audio.onended = r
        audio.play()
      })
    },
    async lose() {
      let sound;
      if(this.count.sound_lose)
        sound = this.count.sound_lose
      else// Default
        sound = require("@/assets/sound/lose.mp3")
      let audio = new Audio(sound)
      await new Promise((r) => {
        audio.onended = r
        audio.play()
      })
    }
  }
  //methods: {},
  //watch: {},
}
</script>

<style>
  .count {
    align-self: stretch;
    margin: 4px;
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .count .val {
    flex: 1 0 auto;
    text-align: center;
  }
  
  .count .ctrl {
    align-self: stretch;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
  }

</style>
