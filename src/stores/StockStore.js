import StorageEngine from "@/js/StorageEngine";
import { defineStore } from "pinia";
import products from "../data/products.json"
import Product from "@/js/Product"

export const useStockStore = defineStore("StockStore", {
    state: () => {
        return {
            products: [],
            persistenceEngine: new StorageEngine(),
            persistenceId: 'products'
        }
    },
    actions:{
        fill(){
            const rawProducts = products
            rawProducts.forEach(rawProduct => {
                this.create(rawProduct.label, rawProduct.price, rawProduct.quantity, rawProduct.image, rawProduct.id);
            })
        },
        create(label, price, quantity, image = "default.png", id = null) {
            const product = new Product(label, price, quantity, image, id);
            this.add(product);
        },
        add(product) {
            const nextId = this.products.length;
            product.setId(nextId);
            this.products.push(product);
        },
        sort() {
            return this.products.sort((a,b) => a.compare(b));
        },
        save() {
            this.persistenceEngine.save(this.persistenceId, this.products);
        },
        load() {
            const rawProducts = this.persistenceEngine.load(this.persistenceId);
            if (rawProducts == null) return this.fill();
            this.products = [];
            rawProducts.forEach(rawProduct => {
                this.create(rawProduct.label, rawProduct.price, rawProduct.quantity, rawProduct.image, rawProduct.id);
            });
        },
        enoughQuantity(count, item) {
            if(count <= item.getQuantity()) return true
            return false
        },
        removeQuantity(count, item) {
            const index = this.findIndexByProduct(item);
            const newQuantity = this.products[index].quantity - count;
            this.products[index].setQuantity(newQuantity);
            this.save();
        },
        addQuantity(count, item){
            const index = this.findIndexByProduct(item);
            const newQuantity = this.products[index].quantity + count;
            this.products[index].setQuantity(newQuantity);
            this.save();
        },
        findIndexByProduct(item){
            return this.products.findIndex(product => product.label == item.label)
        },
    }
})