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
    <div class="m-auto mt-1 text-center p-3">
        <span class="text-xl font-bold underline underline-offset-2">Produits</span>
    </div>
    <div class="flex flex-wrap justify-center mt-2">
        <product-card :product="product.product" :quantity="product.quantity" @add:product="addProduct(product.product)" v-for="product in stockStore.sort()" :key="product.id" />
    </div>

</template>



<script>
import ProductCard from '@/components/ProductCard.vue';
import TheCart from './TheCart.vue';
import Links from '@/data/links.json';

export default {
    name: 'TheShoppingList',
    components: {
        ProductCard,
        TheCart,
    },
    data() {
        return {
            error: '',
            links: Links
        }
    },
    methods: {
        addProduct(product) {
            try {
                this.cartStore.addItems(product);
            } catch(e) {
                this.error = e.message;
                alert(this.error);
            }
        }
    }
}
</script>

<style scoped>

</style>