<template>
  <div class="color">
    <div :class="c"
      v-for="(c, i) in color"
      :key="i"/>
  </div>
</template>

<script>
export default {
  name: 'Color',
  //components: {},
  props: {color: String}
  //data: ()=>({}),
  //computed: {},
  //methods: {},
  //watch: {},
}
</script>

<style>
  .color {
    height: 25px;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
  }
  .color div {
    width: 25px;
    height: 25px;
    background-size: contain;
  }
  .color.small div {
    width: 16px;
    height: 16px;
  }
  /*Icons*/
  .color .c {background-image: url(https://gatherer.wizards.com/Handlers/Image.ashx?size=medium&name=C&type=symbol);}
  .color .w {background-image: url(https://gatherer.wizards.com/Handlers/Image.ashx?size=medium&name=W&type=symbol);}
  .color .u {background-image: url(https://gatherer.wizards.com/Handlers/Image.ashx?size=medium&name=U&type=symbol);}
  .color .b {background-image: url(https://gatherer.wizards.com/Handlers/Image.ashx?size=medium&name=B&type=symbol);}
  .color .r {background-image: url(https://gatherer.wizards.com/Handlers/Image.ashx?size=medium&name=R&type=symbol);}
  .color .g {background-image: url(https://gatherer.wizards.com/Handlers/Image.ashx?size=medium&name=G&type=symbol);}
  .color .s {background-image: url(https://gatherer.wizards.com/Handlers/Image.ashx?size=medium&name=snow&type=symbol);}
</style>
