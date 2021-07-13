/**
	查找带回js
*
*/
var FindBack={
		openDivHtml:'',
		initTable:function(param){
			
			var shade='<div class="layui-layer-shade" id="layui-layer-findback-shade1" times="1" style="z-index: 99999998; background-color: rgb(0, 0, 0); opacity: 0.3;"></div>';
			var searchHtml='<div class="layui-form layui-card-header layuiadmin-card-header-auto">';
			searchHtml+=' <div class="layui-form-item">';
			searchHtml+=param.searchHtml||'';
			 searchHtml+=' <div class="layui-inline">';
			 searchHtml+='    <button class="layui-btn layuiadmin-btn-findback" lay-submit="" lay-filter="lay-findback-search">';
			 searchHtml+='       <i class="layui-icon layui-icon-search layuiadmin-button-btn"></i>';
			 searchHtml+='   </button>';
			 searchHtml+=' </div>';
			 searchHtml+=' </div>';
			 searchHtml+='</div>';
			 var bodywidth=param.layui.jquery('body').width();
			var tbhtml=searchHtml+'<table id="table'+param.elem+'" lay-filter="lay_findback_table"></table>';
			//shade+
			var body='<div class="layui-layer layui-layer-iframe" id="layui-findback-layer1" type="iframe" times="1" showtime="0" contype="string" style="z-index: 99999999;top:10px; width: 700px; height: 430px; left:'+(bodywidth<700?0:(bodywidth-700)/2)+'px;">';
			body+='<div class="layui-layer-title" style="padding: 0px; text-align: center; cursor: move;">查找带回</div>';
			body+='<div id="center'+param.elem+'" class="layui-layer-content"><div>'+tbhtml+'</div></div>';
			body+='<div class="layui-layer-btn layui-layer-btn-c" style="padding:0px;">';
			body+=' <a id="findbackok" class="">带回</a>';
			body+='  <a id="findbackcn" class="">关闭</a>';
			body+='</div>';
			body+='<span class="layui-layer-resize"></span>';
			body+='</div>';
			// param.layui.jquery('body').append(body);
			param.layui.layer.open({
			  type: 1,
			  title: '查找带回',
			  offset: 'auto',
			  btn: ['带回','关闭'],
			  shadeClose: true,
			  area: ['700px', '500px'],
			  content: tbhtml,
			  btnAlign: 'c',
			  yes: function(index, layero){
			    backOfData(index);
			  },btn2: function(index, layero){
			    param.layui.layer.close(index);
			  }
			})
			//分页
			var wh=param.layui.jquery.extend(layui.setter.authParams,param.where||{});
	        var ts = param.layui.table.render({
	            elem: '#table'+param.elem
	            , url: param.url
	            , method: 'post'
      			,headers:layui.setter.headers
	            ,limit:5
	            , where:wh
	            , page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
	                layout: ['count', 'prev', 'page', 'next', 'refresh']//自定义分页布局
	                , groups: 5 //只显示 1 个连续页码
	                ,limit:5
	                , first: '首页'
	                , last: '尾页'
	            }
	            , cols:param.cols
	            , text: {
	                none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
	            }
	        });

	      //监听搜索
	        param.layui.form.on('submit(lay-findback-search)', function (data) {
	            var field = data.field;
	            //执行重载
	            param.layui.table.reload('table'+param.elem, {
	                where: param.where?param.where(field):{}
	            });
	        });
	        param.layui.form.render();

	        param.layui.jquery('#findbackok').click(function(index){
	        	var checkData=param.layui.table.checkStatus('table'+param.elem).data;
	        	if(checkData.length>0){
	        		param.callback&&param.callback(checkData);
	        		param.layui.layer.close(index);
	        	}else{
	        		param.layui.layer.msg('请选择一条数据');
	        	}
	        })
	        function backOfData(index){
	        	var checkData=param.layui.table.checkStatus('table'+param.elem).data;
	        	if(checkData.length>0){
	        		if(param.datal!=-1){
	        			if(checkData.length!=param.datal){

	        		param.layui.layer.msg('只能选择'+param.datal+'条数据');
	        				return;
	        			}
	        		}
	        		param.callback&&param.callback(checkData);
	        		param.layui.layer.close(index);
	        	}else{
	        		param.layui.layer.msg('请选择一条数据');
	        	}
	        }
	        var closeFindBack=function(){
	        	param.layui.jquery('#layui-layer-findback-shade1').remove();
	        	param.layui.jquery('#layui-findback-layer1').remove();
	        }
	        param.layui.jquery('#findbackcn').click(function(){

	        	closeFindBack();
	        })
		}
}