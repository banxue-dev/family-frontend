
layui.define(['laypage', 'form'], function (exports) {
    "use strict";

    var ImagePicker =function () {
        this.v = '0.1.beta';
    }, _MOD = 'imagePicker',
        _this = this,
        $ = layui.jquery,
        laypage = layui.laypage,
        form = layui.form,
        admin=layui.admin,
        BODY = 'body',
        TIPS = '请选择图标';

    /**
     * 渲染组件
     */
    ImagePicker.prototype.render = function(options){
        var opts = options,
            // DOM选择器
            elem = opts.elem,
            // 数据类型：fontClass/unicode
            type = opts.type || 'fontClass' ,
            // 是否分页：true/false
            page = opts.page,
            pageInfo={
                page:1,
                pageSum:1,
                limit:opts.limit||12
            },
            cellWidth=opts.cellWidth,
            cellHeight=opts.cellHeight,
            // 每页显示数量
            limit = opts.limit||12 ,
            iname=opts.name,
            getImgListUrl=layui.setter.backuprequesturl+'imgManager'+layui.setter.reqver,
            // 是否开启搜索：true/false
            search = opts.search==null?true:opts.search,
            // 点击回调
            click = opts.click,
            // json数据
            data = {},
            // 唯一标识
            // 是否使用的class数据
            tmp = new Date().getTime(),
            isFontClass = opts.type === 'fontClass',
            TITLE = 'layui-select-title',
            TITLE_ID = 'layui-select-title-' + tmp,
            ICON_BODY = 'layui-iconpicker-' + tmp,
            PICKER_BODY = 'layui-iconpicker-body-' + tmp,
            PAGE_ID = 'layui-iconpicker-page-' + tmp,
            LIST_BOX = 'layui-iconpicker-list-box',
            selected = 'layui-form-selected',
            unselect = 'layui-unselect';

        var a = {
            init: function () {
                //data = common.getData[type]();

                a.hideElem().createSelect().createBody().toggleSelect();
                common.loadCss();
                return a;
            },
            /**
             * 隐藏elem
             */
            hideElem: function () {
                $(elem).hide();
                return a;
            },
            /**
             * 绘制select下拉选择框
             */
            createSelect: function () {
                var isHave=$(elem).val();
                var selectHtml = '<div class="layui-iconpicker layui-unselect layui-form-select" style="width:100px;float:left;" id="'+ ICON_BODY +'">' +
                    '<div class="'+ TITLE +'" id="'+ TITLE_ID +'">' +
                        '<div class="layui-iconpicker-item">'+
                            '<span class="layui-iconpicker-icon layui-unselect">' +
                                '<i id="showIcon'+iname+'" class="layui-icon "></i>' +
                            '</span>'+
                            '<i class="layui-edge"></i>' +
                        '</div>'+
                    '</div>' +
                    '<div class="layui-anim layui-anim-upbit" style="width:300px;">' +
                        '123' +
                    '</div>';
                $(elem).after(selectHtml);
                return a;
            },
            /**
             * 展开/折叠下拉框
             */
            toggleSelect: function () {
                var item = '#' + TITLE_ID + ' .layui-iconpicker-item,#' + TITLE_ID + ' .layui-iconpicker-item .layui-edge';
                a.event('click', item, function (e) {
                    var $icon = $('#' + ICON_BODY);
                    //var index=$(item).index(this);
                    if ($icon.hasClass(selected)) {
                        $icon.removeClass(selected).addClass(unselect);
                    } else {
                        $icon.addClass(selected).removeClass(unselect);
                    }
                    e.stopPropagation();
                });
                return a;
            },
            /**
             * 绘制主体部分
             */
            createBody: function () {
                // 获取数据
                var searchHtml = '';

                if (search) {
                    searchHtml = '<div class="layui-iconpicker-search">' +
                        '<input id="searchInput" class="layui-input">' +
                        '<i class="layui-icon">&#xe615;</i>' +
                        '</div>';
                }

                // 组合dom
                var bodyHtml = '<div class="layui-iconpicker-body" id="'+ PICKER_BODY +'">' +
                    searchHtml +
                        '<div class="'+ LIST_BOX +'"><div class="layui-iconpicker-list"></div></div> '+
                     '</div>';
                $('#' + ICON_BODY).find('.layui-anim').eq(0).html(bodyHtml);
                a.search().createList().check().page();

                return a;
            },
            /**
             * 绘制图标列表
             * @param text 模糊查询关键字
             * @returns {string}
             */
            createList: function (text) {
                var sa=$('#searchInput').val();
                pageInfo.fileName=sa ||'';
                var listHtml = $('.layui-iconpicker-list'),pageHtml = '',
                lm = $('<div class="layui-iconpicker-icon-limit" id="layui-iconpicker-icon-limit-1">');
                common.getData(function(res){
                    pageInfo.pageSum=res.totalPage;
                    pageInfo.sumCount=res.count;
                    if(res.data.length<1){
                        listHtml.html('<p class="layui-iconpicker-tips">无数据</p>');
                    }else{
                        var icon ='';
                        for (var i = 0; i < res.data.length; i++) {
                            var obj = res.data[i];
                            // 每个图标dom
                            icon += '<div class="layui-iconpicker-icon-item" style="height:'+cellHeight+';width:'+(cellWidth||'20%')+'" title="'+ obj.fileName +'">';
                            
                            icon += '<img src="'+(obj.thumbnailLink||obj.link)+'" data="'+obj.link+'" style="width: 120px;height: 60px;">';
                           
                            icon += '</div>';

                        }
                        lm.html(icon);
                        listHtml.html(lm);
                    }

                    // 判断是否分页
                    if (page){
                        $('#' + PICKER_BODY).addClass('layui-iconpicker-body-page');
                        pageHtml = '<div class="layui-iconpicker-page" id="'+ PAGE_ID +'">' +
                            '<div class="layui-iconpicker-page-count">' +
                            '<span id="'+ PAGE_ID +'-current">1</span>/' +
                            '<span id="'+ PAGE_ID +'-pages">'+ pageInfo.pageSum +'</span>' +
                            ' (<span id="'+ PAGE_ID +'-length">'+ pageInfo.sumCount +'</span>)' +
                            '</div>' +
                            '<div class="layui-iconpicker-page-operate">' +
                            '<i class="layui-icon" id="'+ PAGE_ID +'-prev" data-index="0" prev>&#xe603;</i> ' +
                            '<i class="layui-icon" id="'+ PAGE_ID +'-next" data-index="2" next>&#xe602;</i> ' +
                            '</div>' +
                            '</div>';

                            var listBox=$('#' + ICON_BODY).find('.layui-anim').find('.' + LIST_BOX);
                            listBox.append(pageHtml);
                    }

                    page=false;
                });
                return a;
            },
            // 分页
            page: function () {
                var icon = '#' + PAGE_ID + ' .layui-iconpicker-page-operate .layui-icon';

                $(icon).unbind('click');
                a.event('click', icon, function (e) {

                   var elem = e.currentTarget,
                       isPrev = $(elem).attr('prev') !== undefined,
                       $cur = $('#' +PAGE_ID + '-current');
                       // 点击时正在显示的页码
                       if(isPrev){
                            if(pageInfo.page>1){
                               pageInfo.page-=1;
                            }
                       } else{
                            if(pageInfo.page<pageInfo.pageSum){
                                pageInfo.page+=1;
                            }
                       }
                        $cur.html(pageInfo.page);
                       a.createList();
                       e.stopPropagation();
                });
                return a;
            },
            /**
             * 搜索
             */
            search: function () {
                var icon = '#' + PICKER_BODY + ' .layui-iconpicker-search .layui-icon';
                var input = '#' + PICKER_BODY + ' .layui-iconpicker-search .layui-input';
                
                a.event('click', icon, function (e) {
                    a.createList();
                    e.stopPropagation();
                });
                a.event('click', input, function (e) {
                    e.stopPropagation();
                });
                return a;
            },
            /**
             * 点击选中图标
             */
            check: function () {
                var item = '#' + PICKER_BODY + ' .layui-iconpicker-icon-item';
                a.event('click', item, function (e) {
                    var el = $(e.currentTarget).find('img'),
                    icon=el.attr('data');
                    $('#' + TITLE_ID).find('.layui-iconpicker-item .layui-icon').html('').addClass(' layui-icon-ok');
                    // 回调
                    $(elem).val(icon);
                    if (click) {
                        click({
                            icon: icon
                        });
                    }

                });
                return a;
            },
            event: function (evt, el, fn) {
                $(BODY).on(evt, el, fn);
            }
        };

        var common = {
            /**
             * 加载样式表
             */
            loadCss: function () {
                var css = '.layui-iconpicker {max-width: 300px;}.layui-iconpicker .layui-anim{display:none;position:absolute;left:0;top:42px;padding:5px 0;z-index:899;min-width:100%;border:1px solid #d2d2d2;max-height:300px;overflow-y:auto;background-color:#fff;border-radius:2px;box-shadow:0 2px 4px rgba(0,0,0,.12);box-sizing:border-box;}.layui-iconpicker-item{border:1px solid #e6e6e6;width:90px;height:38px;border-radius:4px;cursor:pointer;position:relative;}.layui-iconpicker-icon{border-right:1px solid #e6e6e6;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;width:60px;height:100%;float:left;text-align:center;background:#fff;transition:all .3s;}.layui-iconpicker-icon i{line-height:38px;font-size:18px;}.layui-iconpicker-item > .layui-edge{left:70px;}.layui-iconpicker-item:hover{border-color:#D2D2D2!important;}.layui-iconpicker-item:hover .layui-iconpicker-icon{border-color:#D2D2D2!important;}.layui-iconpicker.layui-form-selected .layui-anim{display:block;}.layui-iconpicker-body{padding:6px;}.layui-iconpicker .layui-iconpicker-list{background-color:#fff;border:1px solid #ccc;border-radius:4px;}.layui-iconpicker .layui-iconpicker-icon-item{display:inline-block;width:20%;line-height:36px;text-align:center;cursor:pointer;vertical-align:top;height:36px;margin:4px;border:1px solid #ddd;border-radius:2px;transition:300ms;}.layui-iconpicker .layui-iconpicker-icon-item i.layui-icon{font-size:17px;}.layui-iconpicker .layui-iconpicker-icon-item:hover{background-color:#eee;border-color:#ccc;-webkit-box-shadow:0 0 2px #aaa,0 0 2px #fff inset;-moz-box-shadow:0 0 2px #aaa,0 0 2px #fff inset;box-shadow:0 0 2px #aaa,0 0 2px #fff inset;text-shadow:0 0 1px #fff;}.layui-iconpicker-search{position:relative;margin:0 0 6px 0;border:1px solid #e6e6e6;border-radius:2px;transition:300ms;}.layui-iconpicker-search:hover{border-color:#D2D2D2!important;}.layui-iconpicker-search .layui-input{cursor:text;display:inline-block;width:86%;border:none;padding-right:0;margin-top:1px;}.layui-iconpicker-search .layui-icon{position:absolute;top:11px;right:4%;}.layui-iconpicker-tips{text-align:center;padding:8px 0;cursor:not-allowed;}.layui-iconpicker-page{margin-top:6px;margin-bottom:-6px;font-size:12px;padding:0 2px;}.layui-iconpicker-page-count{display:inline-block;}.layui-iconpicker-page-operate{display:inline-block;float:right;cursor:default;}.layui-iconpicker-page-operate .layui-icon{font-size:12px;cursor:pointer;}.layui-iconpicker-body-page .layui-iconpicker-icon-limit{display:none;}.layui-iconpicker-body-page .layui-iconpicker-icon-limit:first-child{display:block;}';
                $('head').append('<style rel="stylesheet">'+css+'</style>');
            },
            /**
             * 获取数据
             */
            getData:function(recall){
                 admin.req({
                    url:getImgListUrl+'getImgManagerListByPage',
                    traditional:true,
                    data:pageInfo,
                    success:function(res){
                       if(res.code=='000000'){
                            recall(res);
                       }else{
                            console.log(res.msg);
                       }
                    }
                  });
            }
        };

        a.init();
        return new ImagePicker();
    };

    /**
     * 选中图标
     * @param filter lay-filter
     * @param iconName 图标名称，自动识别fontClass/unicode
     */
    ImagePicker.prototype.checkIcon = function (name){
        
        $('#showIcon'+name).html('').addClass(' layui-icon-ok');
    };

    var imagePicker = new ImagePicker();
    exports(_MOD, imagePicker);
});