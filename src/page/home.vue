<template>
    <div>
        <head-top signin-up='home'>
            <span slot='logo' class="head_logo">ele.me</span>
        </head-top>
    </div>
</template>

<script>


export default {
    data(){
        return{
            guessCity: '',   //当前城市
            guessCityid: '', //当前城市id
            hotcity: [],     //热门城市列表
            groupcity: {},   //所有城市列表
        }
    }
}

</script>

<style lang="scss" scoped>
    .head_logo{
        left: 0.4rem;
        font-weight: 400;
        @include sc(0.7rem, #fff);
        @include wh(2.3rem, 0.7rem);
        @include ct;
    }
</style>
