export default class Product {
    constructor(label, price, image = "default.png", id = null){
        this.label = label;
        this.price = price;
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