
<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return{
    }
  },
  // mounted(){
  //   this.productStore.fill();
  // }
}
</script>

<script setup>
import { useProductStore } from './stores/ProductStore';
import { useCartStore } from '@/stores/CartStore';
const productStore =  useProductStore();
const cartStore = useCartStore();
productStore.fill();
try {
  cartStore.addItems("1", productStore.products[0]);
  cartStore.count;
  cartStore.grouped;
  cartStore.addItems("1", productStore.products[0]);
  console.log(productStore.noQuantity(productStore.products[0]));
  cartStore.addItems("2", productStore.products[2]);
  cartStore.addItems("1", productStore.products[3]);
  cartStore.addItems("3", productStore.products[1]);
  console.log(cartStore.count);
  cartStore.clearItem(productStore.products[1].label)
}catch(e){
  console.log(e.message);
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
