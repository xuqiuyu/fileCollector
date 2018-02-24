require('babel-register')({
    presets: ['env','stage-0'],
    plugins: ['add-module-exports']
  });

const fs = require('fs');
const searchFile = require('./tools/searchFile');

//get script command params
// const params = process.argv.reverse();

const pathArray = searchFile(params[0],params[1]);

//business code
const generateRouter = (pathArray) => {
    const routes = [
        {
          component: "require('./shared/pages/App')",
          routes: []
        }
    ];
    pathArray.forEach(item => {
        routes[0].routes.push("...require('"+ item + "/router.js').map(R => {R.path = '"+ item + "' + R.path; return R;})");
    });
    //写文件
    const result = `'use strict';\n\n module.exports = ${JSON.stringify(routes,null,2)}`.replace(/"/g,'');
    fs.writeFileSync('./shared/router.js',result);
}

generateRouter();
