var warequrl=layui.setter.backuprequesturl+'deviceWarningInfo'+layui.setter.reqver;
      /*构建查找带回*/
      var addData={
          dateGroup:1,
          timeGroup:1,
          findLabelData:{search:[{name:'labelName',text:'标签名称',type:'0'}],cols:[
                    {type: 'checkbox', fixed: 'left', title: ''}
                    , {field: 'id', title: 'id', align: 'center', hide: true}
                    , {field: 'labelName', title: '标签名称', align: 'center',width:'90%'}
                ],url:lbrequrl+'/getDeviceLabelInfoListByPageAll',elem:'#findLabelData',calltype:0},
          findWarnData:{search:[{name:'warnName',text:'告警名称',type:'0'}],cols:[
                    {type: 'checkbox', fixed: 'left', title: ''}
                    , {field: 'id', title: 'id', align: 'center', hide: true}
                    , {field: 'warnName', title: '告警名称', align: 'center',width:'90%'}
                ],url:warequrl+'/getDeviceWarningInfoListByPage',datal:1,elem:'#findWarnData',calltype:1},
          findEventData:{search:[{name:'eventName',text:'事件名称',type:'0'}],cols:[
                    {type: 'checkbox', fixed: 'left', title: ''}
                    , {field: 'id', title: 'id', align: 'center', hide: true}
                    , {field: 'eventName', title: '事件名称', align: 'center',width:'90%'}
                ],url:evrequrl+'/getDeviceEventInfoListByPage',datal:1,elem:'#findEventData',calltype:1}
      }

    var showSearchHtml='';
    showSearchHtml+='<div class="layui-inline">';
    showSearchHtml+='    <label class="layui-form-label">{{text}}</label>';
    showSearchHtml+='    <div class="layui-input-block">';
    showSearchHtml+='         <input type="text" name="{{name}}" placeholder="请输入{{text}}" autocomplete="off" class="layui-input">';
    showSearchHtml+='    </div>';
    showSearchHtml+='</div>';
    var getSeartHtml=function(searchD){
      if(!searchD){
        return '';
      }
      var reshtml='';
      for(var i=0;i<searchD.length;i++){
        if(searchD[i].type==0){
          reshtml+=showSearchHtml.replace(/{{text}}/g,searchD[i].text).replace(/{{name}}/g,searchD[i].name);
        }else if(searchD[i].type==1){
          
        }
      }
      return reshtml;
    }
    var tableDatas={
      findLabelData:[]
    }
      // 显示框框
    var showFindBack=function(param,name){
      FindBack.initTable({
        url:param.url,
        datal:param.datal||-1 ,// -1表示不限制
         elem:'findBack',
        layui:layui,
        searchHtml :getSeartHtml(param.search),
        where:function(field){
          return field;
              },
        cols:[param.cols],
             callback:function(data){
               var showBackDataHtml='';
               if(!tableDatas[name]){
                 tableDatas[name]=[];
               }
               tableDatas[name]=MergeArray(tableDatas[name],data,'id');
               if(param.calltype==0){
                 showType0Html(tableDatas[name],param.elem,name);
               }else if(param.calltype==1){
                 showType1Html(tableDatas[name],param.elem,name);
               }
              
             }
      }); 
    }

    var showType0Html=function(data,elem){
      let showBackDataHtml='';
      for(var i=0;i<data.length;i++){
        showBackDataHtml+='<div class="cbx" style="float:left;"><input value="'+data[i].id+'" type="checkbox" name="checkLabel" lay-skin="primary" title="'+data[i].labelName+'" ></div>';
      }
      $(elem).html(showBackDataHtml);
      form.render('checkbox');
    }
    var showType1Html=function(data,elem,name){
      if(name.indexOf('Warn')>-1){
        $(elem).prev('.warningv').val(data[0].id);
        $(elem).prev().prev('.warningn').html(data[0].warnName);
      }else{
        $(elem).prev('.eventv').val(data[0].id);
        $(elem).prev().prev('.eventn').html(data[0].eventName);
      }
    }