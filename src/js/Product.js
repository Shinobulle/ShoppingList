export default class Product {
    constructor(label, price, quantity = 0, image = "default.png", id = null){
        this.label = label;
        this.price = price;
        this.quantity = quantity;
        this.image = image;
        this.id = id;
    }

    setId(id){
        this.id = id;
    }

    getId(){
        return this.id;
    }

    rename(label){
        this.label = label;
    }

    setQuantity(quantity){
        this.quantity = quantity;
    }

    getQuantity() {
        return this.quantity;
    }

    setPrice(price) {
        this.price = price;
    }

    getPrice() {
        return this.price
    }

    compare(productToCompare) {
        const label1 = this.label.toUpperCase();
        const label2 = productToCompare.label.toUpperCase();
        return label1 == label2 ? 0 : (label1 > label2 ? 1 : -1);
    }

}