<template>
    <div class="hello">
        <div class='nav'>
            <h1>{{ msg }}</h1>
        </div>
        <div class='nav'>
            <ul class='live type2'>
                <li @click='toCategory'>商品列表</li>
                <li>
                    <router-link :to="{name:'Login'}">合伙人后台</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
// import router from '@/router'
import $ from 'n-zepto'

export default {
    name: 'hello',
    data() {
        return {
            msg: '这是首页，稍候再进行修改'
        }
    },
    methods: {
        toCategory() {
            this.$router.push({
                name: 'Category'
            });
        },

    }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" scoped="" lang="scss">
*{
  box-sizing: border-box;
}
html,body{
  margin:0;
  padding:0;
  background: #EEE
}
.page-bubble{
  padding: 15px;
  max-width: 440px;
  width: 100%;
  margin: 0 auto;
  font-family:Helvetica Neue,Microsoft Yahei,sans-serif;
  background: #000;
  box-shadow: 0 0 3px #000
}
h6{
  color: #FFF;
  text-align: center;
  font-size: 20px;
  margin-bottom: 10px;
}
.page-bubble >div{
  overflow: hidden;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 1px solid #EEE;
  padding:15px 15px 30px;
}
i.msg{
  float: right;
  display: inline-block;
  height: 24px;
  min-width: 24px;
  background: red;
  color:#FFF;
  border:1px solid red;
  line-height: 24px;
  text-align: center;
  border-radius: 24px;
  font-style: normal;
  position: relative;
  z-index: 1;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.photo {
  width: 60px;
  height: 60px;
  border-radius: 100%;
  overflow: hidden;
}
.photo img{
  width: 60px;
  height: 60px;
}
.content{
  margin-left: 15px;
  flex:1;
  margin-right: 15px;
}
.content span,.content em{
  font-style:normal;display: block;margin-top: 10px
}
button {
  margin-top:20px;
  font-size: 20px;
  width:100%;height: 60px;line-height: 60px;
  border-radius:5px;
  color:#FFF;
  border: 0;
  appearance: none;
  background-color:#C60A1E;
}


.actionsheet-spec {
    top: auto;
    bottom: 0;
}

.hello .nav {
    display: block;
    text-align: center;
    margin-top: 50px
}





/*! normalize.css v3.0.2 | MIT License | git.io/normalize */

html {
    font-family: sans-serif;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%
}

body {
    margin: 0
}

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
main,
menu,
nav,
section,
summary {
    display: block
}

audio,
canvas,
progress,
video {
    display: inline-block;
    vertical-align: baseline
}

audio:not([controls]) {
    display: none;
    height: 0
}

[hidden],
template {
    display: none
}

a {
    background-color: transparent
}

a:active,
a:hover {
    outline: 0
}

abbr[title] {
    border-bottom: 1px dotted
}

b,
strong {
    font-weight: bold
}

dfn {
    font-style: italic
}

h1 {
    font-size: 2em;
    margin: 0.67em 0
}

mark {
    background: #ff0;
    color: #000
}

small {
    font-size: 80%
}

sub,
sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline
}

sup {
    top: -0.5em
}

sub {
    bottom: -0.25em
}

img {
    border: 0
}

svg:not(:root) {
    overflow: hidden
}

figure {
    margin: 1em 40px
}

hr {
    -moz-box-sizing: content-box;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    height: 0
}

pre {
    overflow: auto
}

code,
kbd,
pre,
samp {
    font-family: monospace, monospace;
    font-size: 1em
}

button,
input,
optgroup,
select,
textarea {
    color: inherit;
    font: inherit;
    margin: 0
}

button {
    overflow: visible
}

button,
select {
    text-transform: none
}

button,
html input[type="button"],
input[type="reset"],
input[type="submit"] {
    -webkit-appearance: button;
    cursor: pointer
}

button[disabled],
html input[disabled] {
    cursor: default
}

button::-moz-focus-inner,
input::-moz-focus-inner {
    border: 0;
    padding: 0
}

input {
    line-height: normal
}

input[type="checkbox"],
input[type="radio"] {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    height: auto
}

input[type="search"] {
    -webkit-appearance: textfield;
    -moz-box-sizing: content-box;
    -webkit-box-sizing: content-box;
    box-sizing: content-box
}

input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-decoration {
    -webkit-appearance: none
}

fieldset {
    border: 1px solid #c0c0c0;
    margin: 0 2px;
    padding: 0.35em 0.625em 0.75em
}

legend {
    border: 0;
    padding: 0
}

textarea {
    overflow: auto
}

optgroup {
    font-weight: bold
}

table {
    border-collapse: collapse;
    border-spacing: 0
}

td,
th {
    padding: 0
}

.live {
    overflow: hidden;
}

.live>li {
    list-style: none;
    position: relative;
    padding: 0 0 0 2em;
    margin: 0 0 .5em 10px;
    -webkit-transition: .12s;
    transition: .12s;
}

.live>li::before {
    position: absolute;
    content: '\2022';
    font-family: Arial;
    color: #FFF;
    top: 0;
    left: 0;
    text-align: center;
    font-size: 2em;
    opacity: .5;
    line-height: .75;
    -webkit-transition: .5s;
    transition: .5s;
}

.live>li:hover {
    color: #FFF;
}

.live>li:hover::before {
    -webkit-transform: scale(2);
    -ms-transform: scale(2);
    transform: scale(2);
    opacity: 1;
    text-shadow: 0 0 4px;
    -webkit-transition: .1s;
    transition: .1s;
}

.live.type2>li::before {
    content: '';
    width: 10px;
    height: 10px;
    background: #FFF;
    border-radius: 3px;
    line-height: 0;
    top: .27em;
    left: 5px;
}

.live.type2>li:hover::before {
    -webkit-transform: none;
    -ms-transform: none;
    transform: none;
    border-radius: 5px;
    width: 25px;
    left: -10px;
    background: #BA5353;
}

.live.numbers {
    counter-reset: xxx 0;
}

.live.numbers>li::before {
    content: counter(xxx, decimal) ".";
    counter-increment: xxx 1;
    font-family: 'Roboto Condensed';
    font-size: 1em;
    opacity: .5;
    line-height: 1.4;
    -webkit-transition: .5s;
    transition: .5s;
}

.live.numbers>li:hover:before {
    opacity: 1;
    left: -10px;
    -webkit-transform: none;
    -ms-transform: none;
    transform: none;
    text-shadow: none;
    -webkit-transition: .12s;
    transition: .12s;
}

@font-face {
    font-family: 'Roboto Condensed';
    font-style: normal;
    font-weight: 400;
    src: local("Roboto Condensed Regular"), local("RobotoCondensed-Regular"), url(http://themes.googleusercontent.com/static/fonts/robotocondensed/v7/Zd2E9abXLFGSr9G3YK2MsFzqCfRpIA3W6ypxnPISCPA.woff) format("woff");
}

html {
    height: 100%;
}

body {
    height: 100%;
    font: 1.33em 'Roboto Condensed', arial;
    color: #FFF;
    text-align: center;
    background-image: -webkit-radial-gradient(circle, #3c3b52 0%, #252233 80%);
    background-image: radial-gradient(circle, #3c3b52 0%, #252233 80%);
}

h1 {
    margin: .5em 0 0;
    padding: 0;
    text-shadow: 0 4px rgba(0, 0, 0, 0.2);
}

* {
    -moz-box-sizing: padding-box;
    box-sizing: padding-box;
}

ol,
ul {
    width: 68%;
    display: inline-block;
    text-align: left;
    vertical-align: top; // background: rgba(0, 0, 0, 0.2);
    // color: rgba(255, 255, 255, 0.5);
    border-radius: 5px;
    padding: 1.5em;
    margin: 2%;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
}

</style>
