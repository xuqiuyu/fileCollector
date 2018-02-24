const fs = require('fs');
const searchFile = (filePath, targetFileName, result =[]) => {
    //根据指定目录
    fs.readdirSync(filePath).every(filename => {
        //如果直接找到目标文件
        if(filename  === targetFileName){
            result.push(filePath);
            return true;
        } 
        //获取当前文件路径
        const fileDir = filePath + '/'+ filename;
        //获取文件信息
        if(fs.statSync(fileDir).isDirectory()) searchRouterPath(fileDir,targetFileName,result);
         return true;
    });

    return result;
} 

module.exports = searchFile;