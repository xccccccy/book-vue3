<template>
    <div class="movie-item" @click="changeMovie">
        <div class="cover">
            <img :src="item.pic" alt="cover" />
            <div class="duration">{{item.duration}}</div>
        </div>
        <div class="detail flex-1 flex flex-col items-start">
            <div class="title">{{item.name}}</div>
            <div class="author">{{item.director}}</div>
            <div class="date">{{item.year}}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        item: Object,
    },
    name: 'PlayList',
    emits: ['selectVideo'],
    setup(props, context) {
        const changeMovie = () => {
            context.emit('selectVideo', props.item)
        }
        return { changeMovie }
    },
}
</script>

<style scoped>
.movie-item {
    cursor: pointer;
    display: flex;
    margin-bottom: 20px;
}

.movie-item .cover {
    position: relative;
    width: 166px;
    overflow: hidden;
    background: #000;
}

.movie-item:hover .cover img {
    opacity: .7;
    transform: scale(1.25, 1.25);

}

.movie-item .cover img {
    width: 100%;
    transition: transform ease .25s;
    aspect-ratio: 5/3;
    object-fit: contain;
}

.movie-item .cover .duration {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 3px 6px;
    line-height: 1.2em;
    background-color: rgba(0, 0, 0, .65);
    color: #fff;
    font-size: 12px;
    border-radius: 2px;
}

.movie-item .detail {
    padding-left: 10px;
    font-size: 14px;
}

.movie-item .detail div {
    margin-bottom: 3px;
}

.movie-item .detail .title {
    font-size: 16px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    text-overflow: -o-ellipsis-lastline;
    text-overflow: ellipsis;
    word-break: break-word;
    -webkit-line-clamp: 2;
}

.movie-item .detail .author {
    font-size: 13px;
    line-height: 1em;
}

.movie-item .detail .date {
    display: inline-block;
    padding: 3px 6px;
    line-height: 1em;
    background-color: #31C2F2;
    color: #fff;
    font-size: 12px;
    border-radius: 2px;
}

.movie-item .detail .data.hot {
    background-color: #ff6060;
}
</style>

