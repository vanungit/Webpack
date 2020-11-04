import Post from './Post'
import * as $ from 'jquery'
import './styles/styles.css'
import './less.less'
import './scss.scss'
import json from './assets/json'
import xml from './assets/data.xml'
import WebpackLogo from './assets/img.png'
const post = new Post('Webpack post title',WebpackLogo)
$('pre').html(post.toString())

// console.log(json)
// console.log("xml:",xml)