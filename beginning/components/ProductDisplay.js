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
    // ----- PROPERTIES -----
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
    // TODO: this all looks AWFUL when resizing - fix that!!!
    template:
    /*html*/
    `
    <div
        style="display: grid; position: relative;"
        class="product">
        <div
            style="
                grid-column: 1 / span 3; grid-row: 1 / span 2;
                display:grid;
                grid-template-columns: repeat(4, minmax(0, 1fr));
            "
            id="product-image-and-info-holder">

            <div
                style="grid-column: 1 / span 2; grid-row: 1 / 1"
                class="product-image">
                <img
                    :src="image"
                    :class="{ 'out-of-stock-img': inventory < 1 }"
                    :alt="altText"
                />
            </div>

            <div
                style="grid-column: 3 / span 1; grid-row: 1 / 1"
                class="product-info">

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
        </div>

        <review-form
            @review-submitted="addReview"
            style="grid-column: 4 / span 2; grid-row: 1/1;"
        >
        </review-form>
        <review-list
            v-if="reviews.length"
            :reviews="reviews"
            style="grid-column: 1/ span 5; grid-row: 3/ span 1;"
        >
        </review-list>
    </div>
    `
    ,
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
            sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
            reviews: []
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
        addProductToCart() {
            // console.log("quantity = " + this.currentVariant.quantity)
            if (this.currentVariant.quantity > 0) {
                this.$emit("add-to-cart", this.currentVariant.id)
                --this.currentVariant.quantity
                //console.log("cart: ", this.cart)
            }
        },
        removeProductFromCart () {
            // console.log("cart: ", this.cart)
            // console.log("cart last: ", this.cart.at(-1))
            itemId = this.cart.at(-1)
            if (itemId) {
                el = this.variants[itemId]
                if (el) {
                    ++el.quantity
                    this.$emit("remove-from-cart")
                }
            }
        },
        updateProduct(variantId) {
            this.currentVariant = this.variants[variantId]
            //console.log("variant updated " + this.vidx)
        },
        addReview(review) {
            this.reviews.push(review)
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