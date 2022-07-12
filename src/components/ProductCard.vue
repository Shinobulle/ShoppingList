<template>
    <div class="col-span-2 w-3/6 m-auto mb-3 bg-red-300 hover:bg-red-500 grid grid-cols-1 rounded-lg p-2">
        <div class="col-1 ">
            <img class="m-auto" :src="`../images/${ product.image }`">
        </div>
        <div class="col-1 bg-gray-200">
            <div class="grid grid-cols-2 text-center mb-1">
                <label class="col-1">Nom du produit :</label>
                <label class="col-1">{{ product.label }}</label>
            </div>
            <div class="grid grid-cols-2 text-center mb-1">
                <label class="col-1">Prix du produit :</label>
                <label class="col-1">{{ product.price }} </label>
            </div>
            <div class="grid grid-cols-2 text-center mb-1">
                <label class="col-1">Quantité restante :</label>
                <label class="col-1">{{ product.quantity }}</label>
            </div>
            <div class="grid grid-cols-2 text-center mb-1">
                <label>Combien à ajouter</label>
                <input class="w-1/2 m-auto" type="number" placeholder="0" min="0" max="{{ product.quantity }}" v-model="nbProduct" >
            </div>
            <div class="grid grid-cols-1 mb-2 mt-2">
                <button class="rounded-lg bg-green-400 hover:bg-green-500 m-auto w-3/4" @click="$emit('add:product', nbProduct), (nbProduct = 0)">Ajouter au panier</button>
            </div>
        </div>
    </div>
</template>

<script>
import Product from '@/js/Product';

export default {
  name: 'ProductCard',
  props: {
    product: Product
  },
  data(){
    return {
        nbProduct: Number
    }
  }
}
</script>