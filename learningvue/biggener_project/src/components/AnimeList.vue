<template>
    <h2>Free Animes to Watch</h2>
    <div v-if="showAnimes">
        <ul>
            <li v-for="anime in animes" class="animeList" :class="{ fav: anime.isFav }" @click="toggleFav(anime)">
                <img style="width: 200px; height: 200px" :src="anime.img">
                <p>{{ anime.name }}</p>
                <p>{{ anime.tags }}</p>
            </li>
        </ul>
    </div>
    <div>
        <button class="button" v-if="showAnimes" @click="toggleShow">Hide Animes</button>
        <button class="button" v-else @click="toggleShow">Show Animes</button>
    </div>
</template>

<script>

import img1 from "../assets/1.jpg"
import img2 from "../assets/2.jpg"
import img3 from "../assets/3.jpg"
import img4 from "../assets/4.jpg"
import img5 from "../assets/5.jpg"

export default {
    data() {
        return {
            showAnimes: true,
            title: "My First vue App :)",
            animes: [
                {
                    name: "Naruto",
                    tags: "*Action  *Emotion",
                    img: img1,
                    isFav: true,
                },
                {
                    name: "Naruto-Shippuden",
                    tags: "*Action  *Emotion",
                    img: img2,
                    isFav: true,
                },
                {
                    name: "Demon-Slayer",
                    tags: "*Action  *Emotion",
                    img: img3,
                    isFav: true,
                },
                {
                    name: "Deathnote",
                    tags: "*Action  *Inteligence",
                    img: img4,
                    isFav: true,
                },
                {
                    name: "Attack on Titans",
                    tags: "*Action  *Emotion",
                    img: img5,
                    isFav: true,
                },
            ],
        };
    },
    methods: {
        toggleFav(anime) {
            anime.isFav = !anime.isFav;
            console.log(anime);
        },
        toggleShow() {
            this.showAnimes = !this.showAnimes;
        },
    },
}
</script>

<style scoped>
.animeList {
    list-style-type: none;
    margin: 10px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.fav {
    list-style-type: none;
    margin: 10px;
    padding: 10px;
    display: flex;
    background: rgb(242, 166, 166);
    align-items: center;
    justify-content: space-between;
}

.button {
    margin-left: 50px;
    padding: 10px;
}
</style>