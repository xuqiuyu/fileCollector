#!/usr/bin/env node
const fs = require('fs');
const searchFile = require('./tools/searchFile');

// get script command params
// const params = process.argv.reverse();

console.log('collecting router files ....');

const filePathArray = searchFile('./shared/pages', 'router.js');

// business code
const generateRouter = (pathArray) => {
  const routes = [
    {
      component: "require('./pages/App')",
      routes: [
        {
          path: "'/welcome'",
          exact: true,
          component: "require('./components/welcome')"
        }
      ]
    }
  ];
  if (pathArray && Array.isArray(pathArray)) {
    pathArray.forEach((item) => {
      const routerPath = item.replace('/shared', '');
      const routerPrefix = item.split('/').length > 3 ? item.replace('./shared/pages', '') : '';
      routes[0].routes.push(
        `...require('${routerPath}/router.js').map(R => {R.path = '${routerPrefix}' + R.path || ''; R.exact = R.exact || true; R.moduleName = R.component.moduleName || ''; return R;})`
      );
    });
  }
  // 写文件
  const result = `module.exports = ${JSON.stringify(routes, null, 2)}`.replace(/"/g, '');
  fs.writeFileSync('./shared/router.js', result);
};

generateRouter(filePathArray);
