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
        noQuantity(item) {
            if(item.getQuantity() > 0) return false;
            return true;
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
            this.persistenceEngine.save(this.persistenceId, this.collection);
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
            const newQuantity = item.getQuantity() - count;
            item.setQuantity(newQuantity);
        },
        addQuantity(count, item){
            const newQuantity = item.getQuantity() + count;
            item.setQuantity(newQuantity);
        }
    }
})