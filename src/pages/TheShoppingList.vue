<template>
    <div class="bg-blue-400 p-3 grid grid-cols-4 gap-1 ">
        <button class="bg-white rounded-lg text-black col-span-1 w-3/6 m-auto" v-for="link in links" :key="link.id">
            <a :href="`${ link.direction }`"> {{ link.label}}</a>
        </button>
    </div>
    <div class="m-auto bg-orange-500 text-center">
        <span class="text-xl font-bold underline underline-offset-2">Produits:</span>
    </div>
    <div class="grid grid-cols-4 mt-2">
        <product-card :product="product" @add:product="addProduct($event, product)" v-for="product in stockStore.products.sort()" :key="product.id" />
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