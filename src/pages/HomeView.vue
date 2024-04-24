<template>
    <article class="pc-widths mobile-paddings">
        <div class="intro-wrap">
            <h1>Minigame</h1>
            <p>vue.js 학습 목적으로 만들었습니다.</p>
        </div>
        <div v-if="isLoading">
            로딩중 . .
        </div>
        <div id="game-list" :class="{ 'hidden': isLoading }">
            <section v-for="(page, index) in pages" :key="index" @click="$router.push(`/${page.title}`)">
                <img v-bind:src="page.img" @load="onImageLoad" alt="game_img" />
                <p>{{ page.title }}</p>
            </section>
        </div>
    </article>
</template>
<script>

export default {

    data() {
        return {
            pages: [
                {
                    title: 'responsecheck',
                    img: require("../assets/images/responsecheck.png"),
                },
                {
                    title: 'numberbaseball',
                    img: require("../assets/images/numberbaseball.png"),
                },
            ],
            isLoading: true,
        }
    },
    mounted() {
        const images = document.querySelectorAll('#game-list img');
        let loadedImages = 0;
        images.forEach(image => {
            image.onload = () => {
                loadedImages++;
                if (loadedImages === images.length) {
                    this.isLoading = false;
                }
            }
        })
    },
}
</script>
<style>
#game-list {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, auto);
}

#game-list.hidden {
    display: none;
}

#game-list section img {
    width: 100%;
}

@media screen and (min-width: 1366px) {
    #game-list {
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, auto);
    }
}
</style>
