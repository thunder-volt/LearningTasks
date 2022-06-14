<template>
    <form>
        <label>Name : </label>
        <input type="text" v-model="name" required>

        <label>Degree : </label>
        <select v-model="degree">
            <option value="B.Tech">B.Tech</option>
            <option value="Dual Degree">Dual Degree</option>
            <option value="Phd">PHD</option>
        </select>

        <label>Graduation Year : </label>
        <select v-model="year">
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
        </select>
    </form>
    <span v-if="name !== ''">Your Name Is : {{ name }}, </span>
    <span v-if="degree !== ''">Your Degree Is : {{ degree }}, </span>
    <span v-if="year !== ''">You are graduating in {{ year }}.</span>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            degree: '',
            year: '',
        }
    }
}
</script>

<style>
form {
    max-width: 420px;
    margin: 30px auto;
    background: white;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
}

label {
    color: #aaa;
    display: inline-block;
    margin: 25px 0 15px;
    font-size: 0.6em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
}

input,
select {
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ddd;
    color: #555;
}
</style>
