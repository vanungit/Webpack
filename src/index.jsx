import Post from './Post'
import * as $ from 'jquery'
import './styles/styles.css'
import './less.less'
import './scss.scss'
import './babel'
import React from 'react'
import {render} from 'react-dom'
import json from './assets/json'
import xml from './assets/data.xml'
import WebpackLogo from './assets/img.png'

const post = new Post('Webpack post title', WebpackLogo)
$('pre').html(post.toString())

const App = () => (
    <div className="container">
        <h1>Webpack constructor</h1>
        <hr/>
        <div className="logo" />
        <hr/>
        <pre/>
        <div className="box">
            <h2>less</h2>
        </div>
        <div className="card">
            <h2>scss</h2>
        </div>
    </div>
)
render(<App/>, document.getElementById('app'))

// console.log(json)
// console.log("xml:",xml)