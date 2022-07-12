<template>
    <h1>test</h1>
</template>

<script setup>
import { useStockStore } from '@/stores/StockStore';
import { useCartStore } from '@/stores/CartStore';
const stockStore =  useStockStore();
const cartStore = useCartStore();
stockStore.load();
cartStore.load();
try {
  cartStore.addItems("1", stockStore.products[0]);
  cartStore.count;
  cartStore.grouped;
  cartStore.addItems("1", stockStore.products[0]);
  console.log(stockStore.noQuantity(stockStore.products[0]));
  cartStore.addItems("2", stockStore.products[2]);
  cartStore.addItems("1", stockStore.products[3]);
  cartStore.addItems("3", stockStore.products[1]);
  console.log(cartStore.count);
  cartStore.clearItem(stockStore.products[1])
}catch(e){
  console.log(e.message);
}

</script>