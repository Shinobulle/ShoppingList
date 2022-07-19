import { defineStore } from "pinia";
import { groupBy } from "lodash";
import { useStockStore } from "./StockStore";
import StorageEngine from "@/js/StorageEngine";
import Product from "@/js/Product";

export const useCartStore = defineStore("CartStore", {
    state: () => {
        return {
            items: [],
            stockStore: useStockStore(),
            persistenceEngine: new StorageEngine(),
            persistenceId: "cartItem"
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
        addItems(item) {
            if (!this.stockStore.enoughQuantity(item)) throw new Error(100);
            if(this.productInCart(item)) this.addQuantityToItem(item);
            else {
                const quantity = 1;
                this.items.push({ item, quantity });
            }
            this.stockStore.removeQuantity(item);
            this.save();
        },
        clearItem(item) {
            this.stockStore.addQuantity(item.item, item.quantity);
            this.items = this.filter(item);
            this.save();
        },
        save() {
            this.persistenceEngine.save(this.persistenceId, this.items);
        },
        load() {
            const rawProducts = this.persistenceEngine.load(this.persistenceId);
            if (rawProducts == null) return this.items;
            this.items = [];
            rawProducts.forEach(rawProduct => {
                const item = new Product(rawProduct.item.label, rawProduct.item.price, rawProduct.item.image, rawProduct.item.id);
                const quantity = rawProduct.quantity;
                this.items.push({ item, quantity });
            });
        },
        filter(item) {
            return this.items.filter(product => product !== item);
        },
        productInCart(item) {
            let present = false;
            this.items.forEach(product => {
                if (product.item.id == item.id) {
                    present = true;
                }
            });
            return present;
        },
        addQuantityToItem(item) {
            const index = this.findIndex(item);
            this.items[index].quantity += 1;
        },
        findIndex(item) {
            let indexItem = null;
            this.items.forEach((product, index) => {
                if (product.item.id == item.id) {
                    indexItem = index;
                }
            });
            return indexItem;
        },
        price() {
            let price = 0;
            this.items.forEach(product => {
                const priceItem = product.item.price * product.quantity;
                price += priceItem;
            });
            return price;
        },
        removeItem(item){
            if (item.quantity == 1) this.clearItem(item);
            else {
                item.quantity -= 1;
                this.stockStore.addQuantity(item.item);
                this.save();
            }
        },
        ItemsInCart(){
            return this.items.length;
        },
        sort() {
            return this.items.sort((a,b) => a.item.compare(b.item));
        },
    }
})