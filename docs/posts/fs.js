const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
var beautify = require('js-beautify')
const jquery = require('./jquery.js');
const scssfmt = require('scssfmt')

exports.rmdir = (path) => {
    if (fs.existsSync(path)) {
        fse.emptyDirSync(path);
    }
};

exports.getFileList = (dir, dep) => {
    var list = [];
    if (!fs.existsSync(dir)) {
        return list;
    }
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
    var i = str.lastIndexOf(path.sep);
    i = i === -1 ? str.lastIndexOf('/') : i;
    return str.substr(i === -1 ? 0 : i + 1)
}

exports.saveFile = (filePath, content) => {
    var prefix = '';
    var arr = filePath.split(path.sep);
    arr.forEach((item, i) => {
        if (i === arr.length - 1) {
            return false
        }
        if (i !== 0) {
            prefix += path.sep + item;
            if (!fs.existsSync(prefix)) {
                fs.mkdirSync(prefix);
            }
        } else {
            prefix += item;
        }
    })
    fs.writeFileSync(filePath, content, {
        encoding: 'utf8'
    })
}


exports.beautifyJS = content => {
    return beautify.js(content, {
        indent_size: 4,
        space_in_empty_paren: true
    })
}
exports.beautifyHTML = content => {
    return beautify.html(content, {
        indent_size: 4,
        "html": {
            "end_with_newline": true,
            "js": {
                "indent_size": 4
            },
            "css": {
                "indent_size": 4
            }
        },
        "css": {
            "indent_size": 4
        },
        "js": {
            "indent_size": 4,
            "preserve-newlines": false
        }
    })
}
exports.beautifyCSS = content => {
    return beautify.css(content, {
        indent_size: 4
    })
}
exports.beautifySass = content => {
    return scssfmt(content)
}
exports.beautifyVueComponent = content => {
    var result = exports.beautifyHTML(content);
    return result;
}
