<template>
    <div class="card">
        <div class="col-span-1">
            <img class="w-3/5 m-auto" :src="`../images/${ product.image }`">
        </div>
        <div class="col-span-1">
            <div class="cardCategory">
                <label class="labelCategory">Nom du produit :</label>
                <label class="labelProduct">{{ product.label }}</label>
            </div>
            <div class="cardCategory">
                <label class="labelCategory">Prix du produit :</label>
                <label class="labelProduct">{{ product.price }} </label>
            </div>
            <div class="cardCategory">
                <label class="labelCategory">Quantité restante :</label>
                <label class="labelProduct">{{ product.quantity }}</label>
            </div>
            <div class="cardCategory">
                <label class="labelCategory">Combien à ajouter :</label>
                <input class="inputNBProduct" type="number" placeholder="0" min="0" max="{{ product.quantity }}" v-model="nbProduct" >
            </div>
            <div class="grid grid-cols-1 mb-2 mt-3">
                <button class="btnCardAjout" @click="$emit('add:product', nbProduct), (nbProduct = 0)">Ajouter au panier</button>
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