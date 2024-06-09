<script>

export default {
    data() {
        return {
            list: [],
            active: undefined,
            activeItem: {},
            loaded: false,
        };
    },
    async mounted() {
        let url;
        if (import.meta.env.MODE === 'development') {
            url = 'http://localhost:3500';
        } else {
            url = '';
        }
        const response = await fetch(url + "/list");
        this.list = await response.json();

        // Sort list by item name (cast insensitive)
        this.list.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

        this.loaded = true;
    },
    methods: {
        itemClick(item) {
            this.activeItem = item;
        },
    },
};
</script>

<template>
    <div>
        <div v-if="loaded && list.length === 0" class="pt-5 text-center">
            <h2>JSON files not found</h2>
            <h3>Please put all your .json files in the "json/" folder and refresh the page.</h3>
        </div>

        <div class="row">
            <div class="col-4">
                <div class="list-group">
                    <a class="list-group-item list-group-item-action" :class="{active: item.uid === activeItem.uid}" href="#" v-for="item in list" :key="item.uid" @click="itemClick(item)">
                        <img :src="item.profilePic" class="pic me-3" />
                        {{ item.name }}
                    </a>
                </div>
            </div>
            <div class="col-8">

                <div v-if="activeItem.uid" class="pt-4">

                    <img :src="activeItem.profilePic" class="mb-4" />

                    <h2>UID</h2>
                    <p v-if="activeItem.uid">{{ activeItem.uid }}</p>
                    <p v-else>N/A</p>

                    <h2>Name</h2>
                    <p v-if="activeItem.name">{{ activeItem.name }}</p>
                    <p v-else>N/A</p>

                    <h2>Phone</h2>
                    <p v-if="activeItem.phone">{{ activeItem.phone }}</p>
                    <p v-else>N/A</p>

                    <h2>About Me</h2>
                    <p v-if="activeItem.aboutMe">{{ activeItem.aboutMe }}</p>
                    <p v-else>N/A</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .list-group {
        height: 100vh;
        overflow: scroll;
    }

    .pic {
        width: 50px;
    }

    h2 {
        color: #AAA
    }
</style>
