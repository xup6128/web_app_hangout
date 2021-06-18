<template>
    <div class="container">
        <header><h1>管理活動</h1></header>
        <router-link  to="/Event" >
            <div class="event">
                <figure class="event__img">
                    <img class="image--resp"
                    src="https://www.tsc.taipei/wp-content/uploads/%E6%B4%BB%E5%8B%95%E5%9C%96%E6%A8%99.jpg" alt="">
                </figure>
                <div class="event__text">
                    <h3>桌遊團</h3>
                    <h4>(星期一) 六月14日 19：00</h4>
                    <h4>106台北市大安區師大路9號</h4>
                    <h5>參加者...</h5>
                </div>
            </div>
        </router-link>
        <div class="event">
            <figure class="event__img">
                <img class="image--resp"
                src="https://www.tsc.taipei/wp-content/uploads/%E6%B4%BB%E5%8B%95%E5%9C%96%E6%A8%99.jpg" alt="">
            </figure>
            <div class="event__text">
                <h3>桌遊團</h3>
                <h4>(星期一) 六月14日 19：00</h4>
                <h4>106台北市大安區師大路9號</h4>
                <h5>參加者...</h5>
            </div>
        </div>
    </div>
</template>

<script>

export default {

}
</script>


<style scoped>
header{
    text-align: center;
}
.container{
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid black;
}
.event{
    display: flex;
    border: 1px solid black;
}
.event__img{
    width: 250px;
    /* height: 250px; */
}
.image--resp{
    width: 100%;
    height: auto;
}
a{
    color: black;
    text-decoration: none;
}
</style>