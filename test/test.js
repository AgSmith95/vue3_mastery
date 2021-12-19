const app = Vue.createApp({})

app.component("test-comp", {
    props: {
        somenum: {type: Number, default: 0},
        somestr: {type: String, default: "hello"}
    },
    template: `<div>{{ somenum }}</div><div>{{ somestr }}</div>`
})