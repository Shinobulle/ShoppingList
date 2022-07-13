<script setup>
import { useStockStore } from '@/stores/StockStore';
import { useCartStore } from '@/stores/CartStore';
const stockStore =  useStockStore();
const cartStore = useCartStore();
stockStore.load();
cartStore.load();
</script>

<template>
    <div class="header">
        <button class="btnHeader" v-for="link in links" :key="link.id">
            <a :href="`${ link.direction }`"> {{ link.label}}</a>
        </button>
        <TheCart />
    </div>
    <div class="m-auto mt-1 text-center">
        <span class="text-xl font-bold underline underline-offset-2">Produits</span>
    </div>
    <div class="flex flex-wrap justify-center mt-2">
        <product-card :product="product" @add:product="addProduct($event, product)" v-for="product in stockStore.products.sort()" :key="product.id" />
    </div>
</template>



<script>
import ProductCard from '@/components/ProductCard.vue';
import TheCart from './TheCart.vue';
import Links from '@/data/links.json';

export default {
    name: 'TheShoppingList',
    components:{
        ProductCard,
    },
    data() {
        return {
            error: '',
            links: Links
        }
    },
    methods: {
        addProduct(count, product) {
            try{
                const panier = this.cartStore.addItems(count, product);
                this.error = '';
                alert(panier);
            }catch(e){
                this.error = e.message;
                alert(this.error);
            }
        }
    }
}
</script>

<style scoped>

</style>