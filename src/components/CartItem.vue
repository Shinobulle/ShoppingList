<template>
    <div class="cartItemImage">
        <img :src="`../images/${product.image}`" :alt="product.image" class="h-full w-full object-cover object-center" />
    </div>

    <div class="ml-4 flex flex-1 flex-col">
        <div>
            <div class="cartItemInfo">
            <h3>
                Nom du produit: <a href="#"> {{ product.label }} </a>
            </h3>
            </div>
            <div class="cartItemInfo">
                <p> Prix: $ {{ product.price }}</p>
            </div>
        </div>
        <div class="flex flex-1 items-end justify-between text-sm">
            <p class="text-gray-500">Quantité : {{ quantity }}</p>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" @click="$emit('remove:Quantity')">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" @click="$emit('add:Quantity', product)">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div class="flex">
            <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500" @click="$emit('remove:product')">Remove</button>
            </div>
        </div>
    </div>
</template>

<script>
import Product from '@/js/Product'
export default {
    props: {
        product: Product,
        quantity: Number
    },
    emits: ['click', 'remove:product', 'add:Quantity', 'remove:Quantity']
}
</script>