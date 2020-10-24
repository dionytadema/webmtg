<template>
  <div class="card"
    :style="style"/>
</template>

<script>
export default {
  name: 'Card',
  //components: {},
  props: {
    image: [Number, String, Object]
  },
  //data: ()=>({}),
  computed: {
    url() {
      switch (typeof this.image) {
      case("number"):
        return `${this.$root.gurl}multiverseid=${this.image}&type=card`
      case("string"):
        return this.image
      default:// Image object
        if (typeof this.image.img == "number")
          return `${this.$root.gurl}multiverseid=${this.image.img}&type=card`
        return this.image.img
      }
    },
    style() {
      let s = {backgroundImage: `url(${this.url})`}
      // Url image so center by default
      if (typeof this.image == "string" || typeof this.image.id == "string") {
        s.backgroundSize = "cover"
        s.backgroundPosition = "center"
      }// Cusotom positioning
      if (this.image.x)
        s.backgroundPositionX = this.image.x+"%"
      if (this.image.y)
        s.backgroundPositionY = this.image.y+"%"
      if (this.image.scale) {
        if (typeof this.image.scale == "number")
          s["--scale"] = this.image.scale
        else
          s.backgroundSize = this.image.scale
      }
      return s
    },
  },
  //methods: {},
  //watch: {},
}
</script>

<style>
.card {
  --scale: 1;
  width: 132px;
  height: 96px;
  border-radius: 4px;
  background-size: calc(125% * var(--scale));
  background-position: 50% 22%;
}
.card.small {
  width: 64px;
  height: 64px;
  border-radius: 4px;
  background-size: calc(170% * var(--scale));
}
.card.full {
  width: 265px;
  height: 370px;
  border-radius: 16px;
  background-size: cover !important;
  background-position: center !important;
}
.card.full.small {
  width: 132px;
  height: 185px;
  border-radius: 8px;
  background-size: cover !important;
  background-position: center !important;
}
</style>
