const dummyName = '' // "Dummy-Name"
const dummyReview = '' // "Dummy-Text"
const dummyRating = null // 3

app.component('review-form', {
    // ----- HTML -----
    template:
    /* html */
    `
    <form class="review-form" @submit.prevent="onSubmit">
        <h3>Leave a review</h3>
        <label for="name">Name:</label>
        <input id="name" v-model="name" />

        <label for="review">Review:</label>
        <textarea id="review"  v-model="review"></textarea>

        <label for="rating">Rating:</label>
        <select id="rating"  v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
        </select>

        <input class="button" type="submit" value="Submit" />
    </form>
    `
    ,

    // ----- DATA -----
    data() {
        return {
            name: dummyName,
            review: dummyReview,
            rating: dummyRating
        }
    },

    // ----- METHODS -----
    methods: {
        onSubmit() {
            if (this.name === '' || this.review === '' || this.rating === null) {
                alert("ERROR: Can't submit an incomplete review!")
                return
            }

            let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating
            }

            this.$emit('review-submitted', productReview)

            this.name = dummyName
            this.review = dummyReview
            this.rating = dummyRating
        }
    }
})