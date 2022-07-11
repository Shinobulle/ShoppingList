import { defineStore } from "pinia";
import { groupBy } from "lodash";

export const useCartStore = defineStore("CartStore", {
    state: () => {
        return {
            items: []
        }
    },
    getters: {
        count: (state) => state.items.length,
        isEmpty: (state) => state.count === 0,
        total: (state) => state.items.reduce((p,c) => p + c.price, 0),
        grouped: (state) => {
            const grouped = groupBy(state.items, item => item.label);
            const sorted = Object.keys(grouped).sort();
            let inOrder = {};
            sorted.forEach((key) => (inOrder[key] = grouped[key]));
            return inOrder;
        },
        groupCount: (state) => (name) => state.grouped[name].length,
    },
    actions: {
        addItems(count, item) {
            count = parseInt(count)
            if (count < 1) throw new Error ("Vous devez choisir une quantité supérieur à 0 !")
            if (!this.enoughQuantity(count, item)) throw new Error("Il n'y a pas assez de stock !")
            for(let index = 0; index < count; index++){
                this.items.push({ ...item });
            }
            this.removeQuantity(count, item);
            return item.label + "ont été ajouter votre panier !"
        },
        clearItem(itemLabel) {
            this.items = this.items.filter(item => item.label !== itemLabel);
        },
        enoughQuantity(count, item) {
            if(count <= item.quantity) return true
            return false
        },
        removeQuantity(count, item) {
            item.quantity -= count;
        }
    }
})