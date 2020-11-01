const path = require('path')
module.exports = {
    entry:'./src/index.js', //точка входа
    output:{
        filename:'bundle.js', //соберет все js получим один фаил
        path:path
    }
}