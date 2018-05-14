module.exports = {
    env: {
        development: 'development',
        product: 'product',
        stage: 'stage'
    },
    requestMethods: {
        GET: 'GET',
        POST: 'POST',
        DELETE: 'DELETE',
        PUT: 'PUT'
    },
    settingType: {
        remember: {
            name: 'remember',
            title: '敏感操作弹出确认框设置',
            desc:
                '在进行某些操作时（如未保存编辑的数据就离开当前页面）系统会弹出确认框加以警示，如果你觉得此警示每次弹出很烦人，那可以勾选【下次不再弹出】复选框，下次进行同种操作时将不再弹出确认框；但你想恢复这种警示，请在此处设置。',
            options: {
                '0': '弹出',
                '1': '不弹出'
            }
        },
        leftMenuCollapse: {
            name: 'leftMenuCollapse',
            title: '左侧菜单展开/收起设置',
            options: {
                '0': '展开',
                '1': '收起'
            }
        }
    }
};
