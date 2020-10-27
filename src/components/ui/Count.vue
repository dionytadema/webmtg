<template>
  <div class="count">
    <Card class="small"
      v-if="count.img"
      :image="count.img"/>
    <div class="value">
      <v-btn text class="text-h2 mx-1"
        @mousedown="dragStart"
        @touchstart="dragStart">{{val}}</v-btn>
      <slot/>
    </div>
    <div class="ctrl">
      <v-btn fab small class="my-1"
        @click="count.add(1)"
        @click.right.prevent="alt">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
      <v-btn fab small class="my-1"
        v-if="count.type=='life'"
        @click="count.add(-1)"
        @click.right.prevent="count.add(-5)">
      <v-icon>mdi-minus</v-icon>
    </v-btn>
    </div>
  </div>
</template>

<script>
import Card from '../ui/Card';

export default {
  name: 'mCount',
  components: {
    Card,
  },
  props: {
    count: Object,
  },
  data: () => ({
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
    alt() {
      if (this.count.type=="life")
        this.count.add(5)
      else
        this.count.add(-1)
    },
    dragStart(e) {
      e.preventDefault()
      this.drag = true
      this.y = e.clientY || e.touches[0].clientY
      this.v = this.count.val
      document.addEventListener("mousemove", this.dragMove)
      document.addEventListener("touchmove", this.dragMove)
      document.addEventListener("mouseup", this.dragEnd)
      document.addEventListener("touchend", this.dragEnd)
    },
    dragMove(e) {
      let ey = e.type=="mousemove"?e.clientY:e.changedTouches[0].clientY
      this.v = this.count.val + Math.floor((this.y - ey)/10)
    },
    dragEnd() {
      document.removeEventListener("mousemove", this.dragMove)
      document.removeEventListener("touchmove", this.dragMove)
      document.removeEventListener("mouseup", this.dragEnd)
      document.removeEventListener("touchend", this.dragEnd)
      this.count.val = this.v
      this.drag = false
      this.count.run()
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
    display: flex;
  }

  .count .value {
    flex: 1 0 auto;
    display: flex;
    flex-flow: column;
  }
  .count .value .v-btn {
    flex: 1 0 auto;
    padding: 0 8px;
  }
  @media only screen and (max-width: 1200px) {
    .count .value .v-btn {padding: 0 4px;}
  }
  
  .count .ctrl {
    align-self: stretch;
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;
  }

</style>
