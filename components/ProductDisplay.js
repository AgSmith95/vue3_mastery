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

            <div v-for="variant in variants" 
                :key="variant.id"
                class="color-circle"
                :style="{ backgroundColor: variant.color }"
                @mouseover="updateProduct(variant.id)">
            </div>

            <button v-on:click="addToCart"
                :disabled="inventory < 1"
                :class="{ disabledButton: inventory < 1 }">
                Add to Cart
            </button>
            <button v-on:click="removeFromCart"
                :disabled="cartSize < 1"
                :class="{ disabledButton: cartSize < 1 }">
                Remove from Cart
            </button>
        </div>
    </div>`,

    // ----- DATA -----
    data() {
        return {
            product: p,
            brand: b,
            altText: 'A pair of Socks',
            details: ["80% cotton", "20% polyester", "unisex"],
            variants: [
                new Variant(2234, "green",
                    'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
                    2, true
                ),
                new Variant(2235, "blue",
                    'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg',
                    5, false
                )
            ],
            currentVariant: null,
            sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"]
        }
    },

    // ----- METHODS -----
    methods: {
        addToCart: function () {
        },
        removeFromCart: function () {
        },
        updateProduct: function (variantId) {
            this.currentVariant = this.variants.find(
                obj => obj.id === variantId
            )
            //console.log("variant updated " + this.vidx)
        }
    },

    created: function () {
        // console.log("created: this.defaultVariant = " + this.defaultVariant)
        index = (this.defaultVariant >= 0) ? Math.floor(this.defaultVariant) : 0
        // console.log("index = " + index)
        this.currentVariant = this.variants[(index <= this.variants.length) ? index : 0]
    },
    mounted: function () {
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
            return 0;
        }
    }
})