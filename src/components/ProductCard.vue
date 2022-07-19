<template>
    <div class="card">
        <div class="">
            <img class="w-3/5 m-auto" :src="`../images/${ product.image }`">
        </div>
        <div class="mt-4 mb-4">
            <div class="cardCategory">
                <label class="labelCategory">Nom du produit :</label>
                <label class="labelProduct">{{ product.label }}</label>
            </div>
            <div class="cardCategory">
                <label class="labelCategory">Prix du produit :</label>
                <label class="labelProduct">$ {{ product.price }}</label>
            </div>
            <div class="cardCategory">
                <label class="labelCategory">Quantité restante :</label>
                <label class="labelProduct">{{ quantity }}</label>
            </div>
            <!-- <div class="cardCategory">
                <label class="labelCategory">Combien à ajouter :</label>
                <input class="inputNBProduct" type="number" placeholder="1" min="1" max="{{ quantity }}" v-model="nbProduct" >
            </div> -->
        </div>
        <div class="grid grid-cols-1 mb-2 mt-3">
                <button class="btnCardAjout" @click="$emit('add:product')">Ajouter au panier</button>
        </div>
    </div>
</template>

<script>
import Product from '@/js/Product';

export default {
  name: 'ProductCard',
  props: {
    product: Product,
    quantity: Number,
  },
  emits: ['click', 'add:product'],
  data() {
    return {
        nbProduct: Number
    }
  }
}
</script>