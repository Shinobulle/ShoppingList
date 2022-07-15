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
    emits: ['click', 'remove:product']
}
</script>