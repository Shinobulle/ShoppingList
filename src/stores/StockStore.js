import StorageEngine from "@/js/StorageEngine";
import { defineStore } from "pinia";
import products from "../data/products.json"
import Product from "@/js/Product"

export const useStockStore = defineStore("StockStore", {
    state: () => {
        return {
            products: [],
            persistenceEngine: new StorageEngine(),
            persistenceId: 'products',
        }
    },
    actions:{
        fill() {
            const rawProducts = products
            rawProducts.forEach(rawProduct => {
                this.create(rawProduct.label, rawProduct.price, rawProduct.image, rawProduct.id);
            })
        },
        create(label, price, image = "logo.png", id = null, quantity = null) {
            const product = new Product(label, price, image, id);
            this.add(product, quantity);
        },
        add(product, quantityItem) {
            const nextId = this.products.length;
            product.setId(nextId);
            const quantity = this.setQuantity(quantityItem);
            this.products.push({ product, quantity });
        },
        sort() {
            return this.products.sort((a,b) => a.product.compare(b.product));
        },
        save() {
            this.persistenceEngine.save(this.persistenceId, this.products);
        },
        load() {
            const rawProducts = this.persistenceEngine.load(this.persistenceId);
            if (rawProducts == null) return this.fill();
            this.products = [];
            rawProducts.forEach(rawProduct => {
                this.create(rawProduct.product.label, rawProduct.product.price, rawProduct.product.image, rawProduct.product.id, rawProduct.quantity);
            });
        },
        setQuantity(quantity) {
            if (quantity != null) return quantity;
            return Math.floor(Math.random()*10);
        },
        enoughQuantity(item) {
            const index = this.findIndexByProduct(item);
            if(this.products[index].quantity > 0 ) return true
            return false
        },
        removeQuantity(item) {
            const index = this.findIndexByProduct(item);
            this.products[index].quantity -= 1;
            this.save();
        },
        addQuantity(item, nbProduct = 1) {
            const index = this.findIndexByProduct(item);
            this.products[index].quantity += nbProduct;
            this.save();
        },
        findIndexByProduct(item) {
            let indexItem = null;
            this.products.forEach((product, index) => {
                if (product.product.id == item.id) {
                    indexItem = index;
                }
            });
            return indexItem;
        },
    }
})