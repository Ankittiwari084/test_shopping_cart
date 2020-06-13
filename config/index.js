'use strict';

const fs        = require('fs');
const path      = require('path');
const basename  = path.basename(__filename);
let all_config_file = [];
// read all file inside dir.
fs.readdirSync(__dirname).filter(file=>{
    // return all file name but not index.js.
    return (file.indexOf('.') !== 0) && (file !== basename);
}).forEach(file=>{
   // return file name without extension.
   var config_file_name = file.replace(file.slice(-5),'');
   // require all file and get all_config_file array.
   all_config_file[config_file_name]  = require(path.join(__dirname, config_file_name))

});
module.exports = all_config_file;