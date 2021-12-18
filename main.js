const p = 'Socks'
const b = 'Vue Mastery'

class Variant {
    constructor(id, color, image, quantity, onsale) {
        this.id = id
        this.color = color
        this.image = image
        this.quantity = quantity
        this.onsale = onsale
    }
}

const app = Vue.createApp({
    //el: '#app',
    data() {
        return {
            product: p,
            brand: b,
            altText: 'A pair of Socks',
            details: ["80% cotton", "20% polyester", "unisex"],
            variants: [
                new Variant(2234, "green",
                    'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
                    8, true
                ),
                new Variant(2235, "blue",
                    'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg',
                    5, false
                )
            ],
            currentVariant: null,
            sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
            cart: Vue.reactive([])
            /*,test: {
                22: "twenty two",
                333: "300 thirty three"
            }*/
        }
    },

    // ----- METHODS -----
    methods: {
        addToCart: function () {
            id = this.currentVariant.id
            if (this.currentVariant.quantity > 0) {
                --this.currentVariant.quantity
                this.cart.push(id)
            }
        },
        removeFromCart: function () {
            itemId = this.cart.pop()
            if (itemId) {
                id = this.variants.findIndex(
                    (el) => el.id === itemId
                )
                ++this.variants[id].quantity
            }
        },
        updateProduct: function (variantId) {
            this.currentVariant = this.variants.find(
                obj => obj.id === variantId
            )
            //console.log("variant updated " + this.vidx)
        }
    },

    created: function () {
        this.currentVariant = this.variants[0]
    },

    // ----- COMPUTED -----
    computed: {
        productTitle() {
            return this.brand + ' ' + this.product
        },
        inventory() {
            return this.currentVariant.quantity
        },
        image() {
            return this.currentVariant.image
        },
        onSale() {
            return this.currentVariant.onsale ? " ON SALE!" : ""
        },
        cartSize() {
            return this.cart.length
        }
    }
})