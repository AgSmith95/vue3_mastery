const p = 'Socks'
const b = 'Vue Mastery'

class Variant {
    constructor(id, color, image, quantity, onsale) {
        this.id = id // TODO: maybe fix data duplication
        this.color = color
        this.image = image
        this.quantity = quantity
        this.onsale = onsale
    }
}

app.component('product-display', {
    props: {
        cart: {
            required: true
        },
        defaultVariant: {
            type: Number,
            default: 0
        },
        premium: {
            type: Boolean,
            required: true
        }
    },

    // ----- HTML -----
    template:
    /*html*/
    `<div class="product">
        <div class="product-image">
            <img
                :src="image"
                :class="{ 'out-of-stock-img': inventory < 1 }"
                :alt="altText"/>
        </div>
        <div class="product-info">
            <h1>{{ productTitle }}</h1>

            <p v-if="inventory > 10">In Stock: {{ inventory }} left{{ onSale }}</p>
            <p v-else-if="inventory > 0 && inventory <= 10">Almost Sold Out! {{ inventory }} left{{ onSale }}</p>
            <p v-else :class="{ outOfStock: inventory < 1 }">Out of Stock</p>

            <p>Shipping: {{ shipping }}</p>

            <product-details :details="details" :sizes="sizes"></product-details>

            <div v-for="(variant, id) in variants" 
                :key="variant.id"
                class="color-circle"
                :style="{ backgroundColor: variant.color }"
                @mouseover="updateProduct(id)">
            </div>

            <button v-on:click="addProductToCart"
                :disabled="inventory < 1"
                :class="{ disabledButton: inventory < 1 }">
                Add to Cart
            </button>
            <button v-on:click="removeProductFromCart"
                :disabled="cartSize < 1"
                :class="{ disabledButton: cartSize < 1 }">
                Remove from Cart
            </button>
        </div>
    </div>`,
    // TODO: make different condition for disabling remove button
    //       because the current one won't work properly with
    //       multiple product-display components

    // ----- DATA -----
    data() {
        return {
            product: p,
            brand: b,
            altText: 'A pair of Socks',
            details: ["80% cotton", "20% polyester", "unisex"],
            variants: {
                2234: new Variant(2234, "green",
                    'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
                    2, true
                ),
                2235: new Variant(2235, "blue",
                    'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg',
                    5, false
                )
            },
            currentVariant: null,
            sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"]
        }
    },

    // ----- CREATED -----
    created: function () {
        variant = this.variants[this.defaultVariant]
        if (variant) {
            this.currentVariant = variant
        }
        else {
            this.currentVariant = Object.values(this.variants)[0]
        }
    },
    // ----- MOUNTED -----
    mounted: function () {
    },

    // ----- METHODS -----
    methods: {
        addProductToCart: function () {
            // console.log("quantity = " + this.currentVariant.quantity)
            if (this.currentVariant.quantity > 0) {
                this.$emit("add-to-cart", this.currentVariant.id)
                --this.currentVariant.quantity
                console.log("cart: ", this.cart)
            }
        },
        removeProductFromCart: function () {
            console.log("cart: ", this.cart)
            console.log("cart last: ", this.cart.at(-1))
            itemId = this.cart.at(-1)
            if (itemId) {
                el = this.variants[itemId]
                if (el) {
                    ++el.quantity
                    this.$emit("remove-from-cart")
                }
            }
        },
        updateProduct: function (variantId) {
            this.currentVariant = this.variants[variantId]
            //console.log("variant updated " + this.vidx)
        }
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
        shipping() {
            return this.premium ? "FREE" : "2.99"
        },
        cartSize() {
            return this.cart.length;
        }
    }
})