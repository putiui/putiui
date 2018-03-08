const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');

exports.rmdir = (path) => {
    if (fs.existsSync(path)) {
        fse.emptyDirSync(path);
    }
};

exports.getFileList = (dir, dep) => {
    var list = [];
    fs.readdirSync(dir).forEach(item => {
        var subPath = path.join(dir, `/${item}`);
        const state = fs.lstatSync(subPath);
        if (state.isFile()) {
            list.push(subPath)
        } else if (state.isDirectory() && dep) {
            list = list.concat(exports.getFileList(subPath, dep))
        }
    });
    return list;
}

exports.getFolderList = (dir, dep) => {
    var list = [];
    fs.readdirSync(dir).forEach(item => {
        var subPath = path.join(dir, `/${item}`);
        const state = fs.lstatSync(subPath);
        if (state.isDirectory()) {
            list.push(subPath);
            if (dep) {
                list = list.concat(exports.getFolderList(subPath, dep))
            }
        }
    });
    return list;
}

exports.readFile = file => {
    return fs.readFileSync(file, {
        encoding: 'UTF8'
    })
}

exports.getFileExp = file => {
    return file.substr(file.lastIndexOf('.') + 1);
}
exports.getFileName = file => {
    var str = file.substr(0, file.lastIndexOf('.'));
    var i = str.lastIndexOf('\\');
    i = i === -1 ? str.lastIndexOf('/') : i;
    return str.substr(i === -1 ? 0 : i + 1)
}

exports.saveFile = (path, content) => {
    var prefix = '';
    var arr = path.split('\\');
    arr.forEach((item, i) => {
        if (i === arr.length - 1) {
            return false
        }
        if (i !== 0) {
            prefix += '\\' + item;
            if (!fs.existsSync(prefix)) {
                fs.mkdirSync(prefix);
            }
        } else {
            prefix += item;
        }
    })
    fs.writeFileSync(path, content, {
        encoding: 'UTF8'
    })
}
