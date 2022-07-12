import { defineStore } from "pinia";
import { groupBy } from "lodash";
import { useStockStore } from "./StockStore";

export const useCartStore = defineStore("CartStore", {
    state: () => {
        return {
            items: [],
            stockStore: useStockStore()
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
            count = parseInt(count);
            if (count < 1) throw new Error ("Vous devez choisir une quantité supérieur à 0 !");
            if (!this.stockStore.enoughQuantity(count, item)) throw new Error("Il n'y a pas assez de stock !");
            for(let index = 0; index < count; index++){
                this.items.push({ ...item });
            }
            this.stockStore.removeQuantity(count, item);
            return item.label + "ont été ajouter votre panier !";
        },
        clearItem(item) {
            console.log(this.groupCount(item));
            const count = this.groupCount(item);
            this.stockStore.addQuantity(count, item);
            this.items = this.items.filter(product => product.label !== item.label);
        }
    }
})