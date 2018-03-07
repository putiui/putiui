import Global from '../global'
export default () => {
    var setItem = function(key, value, type, desc) {
        var item = getItem(key)
        if (item) {
            console.warn(`${key} 设置项已存在，已经覆盖设置！`)
        }
        item = item || {}
        item.key = key
        item.value = value
        item.type = type
        item.desc = desc
        item.time = new Date().getTime()
        localStorage.setItem(`Setting.${key}`, JSON.stringify(item))
    }
    var getItem = key => {
        var value = localStorage.getItem(`Setting.${key}`)
        try {
            if (value) {
                value = JSON.parse(value)
            }
        } catch (error) {}
        return value
    }
    var removeItem = key => {
        localStorage.removeItem(`Setting.${key}`)
    }
    var getList = () => {
        var list = {}
        for (var key in localStorage) {
            if (key.indexOf('Setting.') == 0) {
                var item = getItem(key.substr('Setting.'.length))
                if (item && item.key) {
                    list[key] = item
                }
            }
        }
        return list
    }

    Global.readOnly('clearSetting', function() {
        for (var key in localStorage) {
            if (key.indexOf('Setting.') == 0) {
                localStorage.removeItem(key)
            }
        }
    })
    Global.readOnly('setting', function(key, value) {
        var len = arguments.length
        if (len == 0) {
            return getList()
        } else if (len == 1) {
            return getItem(key)
        } else if (typeof value === 'undefined') {
            removeItem(key)
        } else {
            setItem.apply(null, arguments)
        }
    })
}
