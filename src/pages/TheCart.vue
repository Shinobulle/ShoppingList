<script setup>
import { ref } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { XIcon } from '@heroicons/vue/outline';
import { useCartStore } from '@/stores/CartStore';

const cartStore = useCartStore();

const open = ref(false);
</script>

<template>
    <div class="btnCart">
        <span @click="open = true">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <div class="cart-count absolute">{{ cartStore.count }}</div>
        </span>
    </div>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-10" @close="open = false">
            <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-hidden">
                <div class="absolute inset-0 overflow-hidden">
                <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                    <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
                    <DialogPanel class="pointer-events-auto w-screen max-w-md">
                        <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                        <div class="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                            <div class="flex items-start justify-between">
                            <DialogTitle class="text-lg font-medium text-gray-900"> Shopping cart </DialogTitle>
                            <div class="ml-3 flex h-7 items-center">
                                <button type="button" class="-m-2 p-2 text-gray-400 hover:text-gray-500" @click="open = false">
                                <span class="sr-only">Close panel</span>
                                <XIcon class="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                            </div>

                            <div class="mt-8">
                            <div class="flow-root">
                                <ul role="list" class="-my-6 divide-y divide-gray-200">
                                    <li v-if="cartStore.count == 0">
                                    <span>Votre panier est vide</span>
                                    </li>
                                    <li v-else v-for="product in cartStore.items" :key="product.id" class="flex py-6">
                                        <CartItem :product="product.item" :quantity="product.quantity"
                                        @remove:product="cartStore.clearItem(product)"
                                        @add:Quantity="cartStore.addItems($event)"
                                        @remove:Quantity="cartStore.removeItem(product)" />
                                    </li>
                                </ul>
                            </div>
                            </div>
                        </div>

                        <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
                            <div class="cartItemInfo">
                            <p>Subtotal</p>
                            <p>$ {{ cartStore.price() }}</p>
                            </div>
                            <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                            <div class="mt-6">
                            <a href="#" class="btnCheckout">Checkout</a>
                            </div>
                            <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                                or <button type="button" class="btnContinueShopping" @click="open = false">Continue Shopping<span aria-hidden="true"> &rarr;</span></button>
                            </p>
                            </div>
                        </div>
                        </div>
                    </DialogPanel>
                    </TransitionChild>
                </div>
                </div>
            </div>
        </Dialog>
  </TransitionRoot>
</template>



<script>
import CartItem from '../components/CartItem.vue';

export default {
    components: {
        CartItem,
    }
}
</script>