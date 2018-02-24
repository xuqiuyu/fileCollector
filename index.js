#!/usr/bin/env node
// require('babel-register')({
//     presets: ['env','stage-0'],
//     plugins: ['add-module-exports']
//   });

const fs = require('fs');
const searchFile = require('./tools/searchFile');

//get script command params
// const params = process.argv.reverse();

console.log('collecting router files ....');

const pathArray = searchFile('./shared/pages','router.js');

//business code
const generateRouter = (pathArray) => {
    const routes = [
        {
          component: "require('./pages/App')",
          routes: [
            {
                path: "'/'",
                exact: true,
                component: "require('./components/welcome')"
            }
          ]
        }
    ];
    if(pathArray && Array.isArray(pathArray)){
        pathArray.forEach(item => {
            const routerPath = item.replace('/shared','');
            const routerPrefix = item.split('/').length > 4 ? item.replace('./shared/pages','') : '';
            routes[0].routes.push(
                "...require('"+ routerPath + "/router.js').map(R => {R.path = '"+ routerPrefix + "' + R.path; return R;})"
            );
        });
    }
    //写文件
    const result = `module.exports = ${JSON.stringify(routes,null,2)}`.replace(/"/g,'');
    fs.writeFileSync('./shared/router.js',result);
}

generateRouter(pathArray);
