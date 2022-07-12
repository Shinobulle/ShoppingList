<template>
    <div>
        <button v-for="link in links" :key="link.id">
            <a :href="`${ link.direction }`"> {{ link.label}}</a>
        </button>
    </div>
    <h1>Produits:</h1>
    <div class="grid grid-cols-4">
        <div class="col-span-2 w-3/6 m-auto" v-for="product in stockStore.products.sort()" :key="product.id">
            <product-card :product="product" @add:product="addProduct($event, product)" />
        </div>
    </div>
</template>

<script setup>
import { useStockStore } from '@/stores/StockStore';
import { useCartStore } from '@/stores/CartStore';
const stockStore =  useStockStore();
const cartStore = useCartStore();
stockStore.load();
cartStore.load();
</script>

<script>
import ProductCard from '@/components/ProductCard.vue';
import Links from '@/data/links.json'

export default {
    name: 'TheShoppingList',
    components:{
        ProductCard
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
                this.cartStore.addItems(count, product);
                this.error = '';
            }catch(e){
                this.error = e.message;
                alert(this.error);
            }
        }
    }
}
</script>