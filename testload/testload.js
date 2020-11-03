
;!function(win){
    var te=function(){
        this.id="v.12323";
    }
    te.fn=te.prototype;
    var doc=document;
    var head = doc.getElementsByTagName('head')[0];

    
    te.fn.use=function(callback){
        // 用于监听文件加载完毕
        function onScriptLoad(e, url) {
            var readyRegExp = navigator.platform === 'PLaySTATION 3' ? /^complete$/ : /^(complete|loaded)$/
            if (e.type === 'load' || (readyRegExp.test((e.currentTarget || e.srcElement).readyState))) {
                head.removeChild(node);
                // 轮询查看当前模块是否已注册，每0.025秒轮询一次，共论询config.timeout秒。
                // config.timeout，文件加载超时，默认值为10秒。
                callback();
            }
        }
        var node = doc.createElement('script');
        // config.base，代表扩展模块的JS文件目录，默认值为空串，需要以斜杠结束。
        // modules，代表layui的内置模块集。
        // layui.modules[name]，代表模块name的相对路径(不包括后缀.js)，默认值为name。
        //         如果当前模块是内置模块，则相对路径相对于config.dir + "lay/"。
        //        如果当前模块是扩展模块，则相对路径相对于config.base。
        node.async = true;
        node.charset = 'utf-8';
        node.src = './testbeload.js';
        // config.modules[name]，代表已加载，或正在加载中的模块name的相对路径(不包括后缀.js)。
        head.appendChild(node);
        if (node.attachEvent && !(node.attachEvent.toString && node.attachEvent.toString().indexOf('[native code') < 0) && !isOpera) {
            node.attachEvent('onreadystatechange', function(e) {
                onScriptLoad(e);
            });
        } else {
            node.addEventListener('load', function(e) {
                onScriptLoad(e);
                //callback.apply(FMap);
                //callback();
            }, false);
        }
    }
    win.FMap=new te();
}(window);


FMap.use(function(){
    console.log('成功回调');
});
