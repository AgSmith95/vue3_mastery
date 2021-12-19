class Product {
    constructor(color, quantity) {
        this.color = color
        this.quantity = quantity
    }
}

const app = Vue.createApp({
    data() {
        return {
            dict: {
                123: "Hello World",
                234: {a: 1, b: "str", c: false},
                456: [1, 2, 3]
            },

            products: {
                28: new Product("red", 8),
                82: new Product("green", 15)
            }
        }
    }
})

app.component("test-comp", {
    props: {
        somenum: {type: Number, default: 0},
        somestr: {type: String, default: "hello"}
    },
    template: `<div>{{ somenum }}</div><div>{{ somestr }}</div>`
})