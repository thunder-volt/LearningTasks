<template>
    <ul class="nav">
        <li><a href="#" title="login" @click.self="openForm"> LOGIN </a></li>
        <li><a href="#" title="about us"> ABOUT </a></li>
        <li><a href="#" title="contacts"> CONTACT-US </a></li>
    </ul>
</template>

<script>
export default {
    methods: {
        openForm() {
            this.$emit('open')
        }
    }
}
</script>

<style scoped>
ul {
    position: sticky;
    top: 0px;
    float: right;
}

ul li {
    display: inline-block;
    margin: 5px;
}

ul li a {
    color: black;
}
</style>