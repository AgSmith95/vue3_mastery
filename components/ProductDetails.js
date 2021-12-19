app.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        },
        sizes: {
            type: Array,
            required: true
        }
    },

    template:
    /*html*/
    `
    <div>
        DETAILS:
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
    </div>
    <div>
        SIZES:
        <ul>
            <li v-for="size in sizes">{{ size }}</li>
        </ul>
    </div>
    `
})