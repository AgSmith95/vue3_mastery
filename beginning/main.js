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
        addToCart: function (id) {
            this.cart.push(id)
        },
        removeFromCart: function () {
            this.cart.pop()
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