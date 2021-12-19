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
    // ----- DATA -----
    data() {
        return {
            premium: true,
            cart: Vue.reactive([])
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
        // noop
    },

    // ----- COMPUTED -----
    computed: {
        cartSize() {
            return this.cart.length
        }
    }
})