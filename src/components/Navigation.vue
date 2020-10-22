<template>
    <nav>
        <ul>
            <li>
                <router-link tag="a" to="/">Home</router-link>
            </li>
        </ul>
    </nav>
</template>


<style lang="scss">
    ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #4CAF50;
    }
    li {
        float: left;
    }
    li a {
        display: block;
        color: white;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
        font-weight: bold;
    }
    li a:hover {
        background-color: rgba(17, 17, 17, 0.22);
    }
</style>