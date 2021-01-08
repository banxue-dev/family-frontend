   //全局参数
   var goldconfig={};
    goldconfig.urlprex='http://www.banxue.fun';
    //goldconfig.urlprex='http://localhost';
    goldconfig.backendHost=goldconfig.urlprex+':8091/family',
    goldconfig.priceData={},
    goldconfig.personalInfo={},
    goldconfig.tempOrgCode='',
    goldconfig.times='2500',
    goldconfig.orgCode=function(){
      if(!goldconfig.tempOrgCode){
        goldconfig.tempOrgCode=getQueryVariable('orgCode') || '123';
      }
      return goldconfig.tempOrgCode;//每个账号不一样
    },
    goldconfig.weeks=['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];


    //开始其他方法定义
    function getQueryVariable(variable)
    {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
    }
    function tobg1(name) {
      window.location.href="index.html?orgCode="+goldconfig.orgCode();
    }
    function tobg3(name) {
       window.location.href="news.html?orgCode="+goldconfig.orgCode();
    }
    function tobg2(name) {
       window.location.href="c.html?orgCode="+goldconfig.orgCode();
    }
    function tobg4(id) {
      $('#showTitle').html($('#ntitle'+id).html());
      $('#showContent').html($('#ncontent'+id).html());
      $('#showTime').html($('#ntime'+id).html());
       $('#newsdetails').show();
       $('#newslist').hide();
    }
    function tobg5(name) {
       $('#newsdetails').hide();
       $('#newslist').show();
    }

    var changeevent={
      buyWaterAdd:function(id,ln){
        var tv=$("#buyBackWater"+id).val()*1+0.01;
        $("#buyBackWater"+id).val(tv.toFixed(2));
        var bidv=$('.bid'+id).html()*1+0.01;
        $('.bid'+id).html(bidv.toFixed(ln));
      },
      buyWaterSal:function(id,ln){
        var va=$("#buyBackWater"+id).val();
        va=va*1-0.01;
        if(va==0){
          va="0.00";
        }
        $("#buyBackWater"+id).val((va*1).toFixed(2));
        var bidv=$('.bid'+id).html()*1-0.01;
        $('.bid'+id).html(bidv.toFixed(ln));
      },
      saleWaterAdd:function(id,ln){
        var tv=$("#saleWater"+id).val()*1+0.01;
        $("#saleWater"+id).val(tv.toFixed(2));
        var askv=$('.ask'+id).html()*1+0.01;
        $('.ask'+id).html(askv.toFixed(ln));
      },
      saleWaterSal:function(id,ln){
        var va=$("#saleWater"+id).val();
        
        va=va*1-0.01;
        
        if(va==0){
          va="0.00";
        }
        $("#saleWater"+id).val((va*1).toFixed(2));
        var askv=$('.ask'+id).html()*1-0.01;
        $('.ask'+id).html(askv.toFixed(ln));
      },
      //type=bid?表示回购，=ask表示销售
      valueChanged:function(ele,id,type,ln){
        type=type==1?'bid':'ask';
        var v=$(ele).val();
        var odv=$(ele).attr('old');//输入框的旧值
        $(ele).attr('old',v);
        v=(v*1-odv*1).toFixed(ln);
        var ov=$("."+type+id).html();//指定的回购或销售的值
        var r= /^[-]?[1-9]?[0-9]*\.[0-9]*$/;  
        if(r.test(v)){
          $("."+type+id).html((ov*1+v*1).toFixed(ln));
        }else{
          $(ele).val('0.00');
          alert('只能是数字');
        }
      },saveChange:function(){
        var res=[];
        for(var d=0;d<goldconfig.metalConfig.length;d++){
          var tdb=goldconfig.metalConfig[d];
          var tid=tdb.goldUserDiyMetalConfigId;
          var buyv=$('#buyBackWater'+tid).val();
          var salv=$('#saleWater'+tid).val();
          if(buyv==tdb.buyBackWater && salv==tdb.saleWater){
            //没有变动就不改
            continue;
          }
          res.push({goldUserDiyMetalConfigId:tdb.goldUserDiyMetalConfigId,buyBackWater:buyv,saleWater:salv});
        }
        if(res.length>0){
          $.ajax({
            type : "POST",
            url : goldconfig.backendHost+"/userDiyMetalConfig/v1.0/api/modUserDiyMetalConfigByJson",
            data:{orgCode:goldconfig.orgCode(),resv:JSON.stringify(res)},
            dataType : "json",
            success : function(data) {
              alert("保存成功");
            },error:function(){

            }
          });
        }
      }
    }
    function dataLoadingStatus(show,height,width){
      if(height){
        $('#dataLoading').css('height',height+'px');
      }
      if(width){
        $('#dataLoading').css('width',width+'px');
      }
      if(show){
        $('#dataLoading').show();
        $('#mobile_htj').addClass('blur');
      }else{
        $('#dataLoading').hide();
        $('#mobile_htj').removeClass('blur');
      }
    }
   var gold=function(){
    this.id=1;
    this.DateTime=function(){
      
    }
    this.DataExce=function(){
      
    }
    this.DateTime.showLocale=function(objD) {
      var str, colorhead, colorfoot;
      var yy = objD.getYear();
      var MM = objD.getMonth() + 1;
      var dd = objD.getDate();
      var hh = objD.getHours();
      var mm = objD.getMinutes();
      var ss = objD.getSeconds();
      var ww = objD.getDay();
      if (yy < 1900)
        yy = yy + 1900;
      if (MM < 10)
        MM = '0' + MM;
      if (dd < 10)
        dd = '0' + dd;
      if (hh < 10)
        hh = '0' + hh;
      if (mm < 10)
        mm = '0' + mm;
      if (ss < 10)
        ss = '0' + ss;
      var isOpenText='开盘';
      if (ww > 0 && ww < 6){
        //colorhead = "<font color=\"green\">";
      }else{
        //colorhead = "<font color=\"red\">";
        isOpenText='停盘';
      }
      colorfoot = "</font>"
      str = yy + "-" + MM + "-" + dd + " " + hh + ":" + mm
          + ":" + ss + "  " + goldconfig.weeks[ww] + colorfoot;
      if(goldconfig.personalInfo.openStatus==1){
        isOpenText='停盘';
      }else if(goldconfig.personalInfo.openStatus==0){
        isOpenText='开盘';
      }
      $('#openText').html(isOpenText);
      
      return (str);
    }
    var that=this;
   this.DateTime.tick=function() {
      var today;
      today = new Date();
      document.getElementById("localtime").innerHTML = that.DateTime.showLocale(today);
      //window.setTimeout("that.DateTime.tick()", 1000);
    }

    this.DataExce.readFile=function(callback) {
      $.ajax({
        url:goldconfig.backendHost+'/userDiyMetalConfig/v1.0/api/getUserDiyWaterByOrgCode',
        type:'post',
        dataType : "json",
        data:{orgCode:goldconfig.orgCode()},
        success:function(res){
          if(res.code='000000'){

            goldconfig.metalConfig=res.data;

            /*if(goldconfig.priceData){

              goldconfig.priceData=res.data;
              callback && callback();
            }else{
              console.log("获取数据不正确");
            }
            console.log("实时行情:"+JSON.stringify(goldconfig.priceData));*/
          }else{
            console.log(res.msg);
          }
        },error:function(res){
          console.log('读取调价数据失败'+JSON.stringify(res));
        }
      })
    }
    //type:1普通页面，2：调价
    this.DataExce.createHtml=function(callback,type){
      $('#sj-headerHtml').html(goldconfig.personalInfo.tmpHeadHtml);
      var grouphtml='';
      $('#mobile_htj').html("");
      for(var t=0;t<goldconfig.groupConfig.length;t++){
          var tda=goldconfig.groupConfig[t];
          grouphtml=goldconfig.personalInfo.tmpStartHtml;
          grouphtml=grouphtml.replace('{{cellbackcolor}}',goldconfig.personalInfo.cellBackColor||'transparent').replace('{{groupId}}',tda.groupCode).replace('{{groupName}}',tda.groupName);
        
          var metalhtml='';
          var childCnt=0;
          for(var d=0;d<goldconfig.metalConfig.length;d++){
              if(goldconfig.metalConfig[d].groupId==tda.groupCode){
                var tdb=goldconfig.metalConfig[d];
                //tdb.goldUserDiyMetalConfigId
                if(type==1){
                  metalhtml+=goldconfig.personalInfo.tmpCellHtml;

                }else if(type==2){
                  $('.sj-zx-list-l2:last').html('调价');
                  metalhtml+=goldconfig.personalInfo.tmpChangeHtml;
                  metalhtml=metalhtml.replace(/{{buyBackWater}}/g,tdb.buyBackWater);
                  metalhtml=metalhtml.replace(/{{conLen}}/g,(tdb.constraintLen));
                  metalhtml=metalhtml.replace(/{{saleWater}}/g,tdb.saleWater);
                  metalhtml=metalhtml.replace(/{{defTextColor}}/g,(goldconfig.personalInfo.defaultTextColor||"black"));
                  metalhtml=metalhtml.replace(/{{cellBackColor}}/g,(goldconfig.personalInfo.cellBackColor||"transparent"));
                }
                metalhtml=metalhtml.replace('{{cellborder}}',goldconfig.personalInfo.cellBorder||"");
                metalhtml=metalhtml.replace(/{{configid}}/g,tdb.goldUserDiyMetalConfigId);
                metalhtml=metalhtml.replace('{{sname}}',(tdb.newName || tdb.metalName));

                childCnt++;
              }
          }
          if(childCnt<2){
            grouphtml=grouphtml.replace('{{font}}','font-size:2.5vw;');
          }else{

            grouphtml=grouphtml.replace('{{font}}','');
          }
          grouphtml=grouphtml.replace('{{height}}',(childCnt*4));
          grouphtml+=metalhtml;
          grouphtml+=goldconfig.personalInfo.tmpEndHtml;
          $('#mobile_htj').append(grouphtml);
      }
      //改变设置的颜色
      goldconfig.personalInfo.themBackColor && $('.sj-header').addClass('theme-bg'+goldconfig.personalInfo.themBackColor);
      goldconfig.personalInfo.contentColorType && $('#content-white-bg').css('background-color',goldconfig.personalInfo.contentColorType);
      //开启加载框
      dataLoadingStatus(true,$('#mobile_htj').height(),$('#mobile_htj').width());
      //回调
      callback();
    }
    //type:1普通页面，2：调价
    this.DataExce.createHtml1=function(callback,type){
      var grouphtml='';
      $('#mobile_htj').html("");
      for(var t=0;t<goldconfig.groupConfig.length;t++){
          var tda=goldconfig.groupConfig[t];
          grouphtml='';
          grouphtml='<li style="width:100%;background-color:'+(goldconfig.personalInfo.cellBackColor||'transparent')+';" id="group'+tda.groupCode+'">';
          grouphtml+='<div class="sl-zx-list-t " style="height: {{height}}rem;{{font}}"><span id="customerName">'+tda.groupName+'</span></div>';
          var metalhtml='';
          var childCnt=0;
          for(var d=0;d<goldconfig.metalConfig.length;d++){
              if(goldconfig.metalConfig[d].groupId==tda.groupCode){
                var tdb=goldconfig.metalConfig[d];
                //tdb.goldUserDiyMetalConfigId
                metalhtml+='<div class="sl-zx-tb1  sl-zx-tb-ys2" style="'+(goldconfig.personalInfo.cellBorder||"")+'">';
                metalhtml+='  <div class="sl-zx-tb2 sl-zx-cell">'+(tdb.newName || tdb.metalName)+'</div>';
                metalhtml+='  <div class="sl-zx-tb3 sl-zx-cell bid'+tdb.goldUserDiyMetalConfigId+'">0.00</div>';
                metalhtml+='  <div class="sl-zx-tb3 sl-zx-cell ask'+tdb.goldUserDiyMetalConfigId+'">0.00</div>';
                if(type==1){
                  metalhtml+='  <div class="sl-zx-tb3 sl-zx-cell">';
                  metalhtml+='    <div class="sl-zx-tb4 max'+tdb.goldUserDiyMetalConfigId+'">0.00</div>';
                  metalhtml+='    <div class="sl-zx-tb4 min'+tdb.goldUserDiyMetalConfigId+'">0.00</div>';
                  metalhtml+='  </div>';
                }else if(type==2){
                  metalhtml+='<div class="sl-zx-tb3 sl-zx-cell">  '; 
                    metalhtml+=' <div style="height:2rem;line-height:2rem;">';
                      metalhtml+='<label onclick="changeevent.buyWaterAdd('+tdb.goldUserDiyMetalConfigId+","+tdb.constraintLen+')" class="tj-label">+</label>';
                      metalhtml+='<input old="'+tdb.buyBackWater+'" onchange="changeevent.valueChanged(this,'+tdb.goldUserDiyMetalConfigId+',1,'+tdb.constraintLen+')"  type="text" id="buyBackWater'+tdb.goldUserDiyMetalConfigId+'" value="'+tdb.buyBackWater+'" class="tj-input" style="color:'+(goldconfig.personalInfo.defaultTextColor||"black")+';background-color:'+(goldconfig.personalInfo.cellBackColor||"transparent")+';">';
                      metalhtml+='<label  onclick="changeevent.buyWaterSal('+tdb.goldUserDiyMetalConfigId+","+tdb.constraintLen+')" class="tj-label" >-</label>';
                    metalhtml+='</div>';
                    metalhtml+=' <div style="height:2rem;line-height:2rem;">';
                       metalhtml+='<label  onclick="changeevent.saleWaterAdd('+tdb.goldUserDiyMetalConfigId+","+tdb.constraintLen+')" class="tj-label">+</label>';
                       metalhtml+='<input old="'+tdb.saleWater+'" onchange="changeevent.valueChanged(this,'+tdb.goldUserDiyMetalConfigId+',2,'+tdb.constraintLen+')" type="text" id="saleWater'+tdb.goldUserDiyMetalConfigId+'" value="'+tdb.saleWater+'" class="tj-input" style="color:'+(goldconfig.personalInfo.defaultTextColor||"black")+';background-color:'+(goldconfig.personalInfo.cellBackColor||"transparent")+';">';
                       metalhtml+='<label  onclick="changeevent.saleWaterSal('+tdb.goldUserDiyMetalConfigId+","+tdb.constraintLen+')" class="tj-label">-</label>';
                    metalhtml+='</div>';
                   metalhtml+='</div>';
                }
                metalhtml+='</div>';
                childCnt++;
              }
          }
          if(childCnt<2){
            grouphtml=grouphtml.replace('{{font}}','font-size:2.5vw;');
          }else{

            grouphtml=grouphtml.replace('{{font}}','');
          }
          grouphtml=grouphtml.replace('{{height}}',(childCnt*4));
          grouphtml+=metalhtml;
          grouphtml+='</li>';
          $('#mobile_htj').append(grouphtml);
      }
      //改变设置的颜色
      goldconfig.personalInfo.themBackColor && $('.sj-header').addClass('theme-bg'+goldconfig.personalInfo.themBackColor);
      goldconfig.personalInfo.contentColorType && $('#content-white-bg').css('background-color',goldconfig.personalInfo.contentColorType);
      //开启加载框
      dataLoadingStatus(true,$('#mobile_htj').height(),$('#mobile_htj').width());
      //回调
      callback();
    }
    //type:1普通页面，2：调价
    this.DataExce.createPCHtml=function(callback,type){
      var grouphtml='';
      $('#pc-content').html("");
      for(var t=0;t<goldconfig.groupConfig.length;t++){
          var tda=goldconfig.groupConfig[t];
          grouphtml='';
          grouphtml='<div  style="width: {{groupdwidth}}%; float: left;">';
          grouphtml+=' <div class="sl-zx-list-t bg" style="height: 1.5rem; width: 100%; font-size: 0.5rem;">';
          grouphtml+='  <span id="customerName">'+tda.groupName+'</span>';
          grouphtml+=' </div>';
          grouphtml+='<div class="sl-zx-tb1  sl-zx-tb-ys1">';
          grouphtml+='  <div class="sl-zx-tb2">品类</div>';
          grouphtml+='  <div class="sl_pc_header ">回购</div>';';';
          grouphtml+='  <div class="sl_pc_header " >销售</div>';
          grouphtml+='  <div class="sl_pc_header ">高/低</div>';
          grouphtml+='</div>';
          var metalhtml='';
          var childCnt=0;
          for(var d=0;d<goldconfig.metalConfig.length;d++){
              if(goldconfig.metalConfig[d].groupId==tda.groupCode){
                var tdb=goldconfig.metalConfig[d];
                metalhtml+='<div class="sl-zx-tb1  sl-zx-tb-ys1">';
                var tn=tdb.newName || tdb.metalName;
                metalhtml+='  <div class="sl-zx-tb2"'+(tn.length>=5?'style="font-size:0.25rem;"':'')+'>'+(tn)+'</div>';
                metalhtml+='  <div class="sl-zx-tb3 bid'+tdb.goldUserDiyMetalConfigId+'">0.00</div>';
                metalhtml+='  <div class="sl-zx-tb3 ask'+tdb.goldUserDiyMetalConfigId+'">0.00</div>';
                metalhtml+='  <div class="sl-zx-tb3">';
                metalhtml+='    <div class="sl-zx-tb4 max'+tdb.goldUserDiyMetalConfigId+'" >0.00</div>';';';
                metalhtml+='    <div class="sl-zx-tb4 min'+tdb.goldUserDiyMetalConfigId+'" >0.00</div>';
                metalhtml+='  </div>';
                metalhtml+='</div>';
                childCnt++;
              }
          }
          grouphtml=grouphtml.replace('{{groupdwidth}}',(100/goldconfig.groupConfig.length));
          grouphtml+=metalhtml;
          grouphtml+='</div>';
          $('#pc-content').append(grouphtml);
      }
      //根据分组的数量改变width
      //改变设置的颜色
      goldconfig.personalInfo.themBackColor && $('.sj-header').addClass('theme-bg'+goldconfig.personalInfo.themBackColor);
      goldconfig.personalInfo.contentColorType && $('#content-white-bg').css('background-color',goldconfig.personalInfo.contentColorType);
      //开启加载框
      dataLoadingStatus(true,$('#pc-content').height(),$('#pc-content').width());
      //回调
      callback();
    }

    var loadtimes = 0;
    
    this.DataExce.getDataFromList=function(lst,id){
      for(var i=0;i<lst.length;i++){
        if(lst[i].ID==id){
          return lst[i];
        }
      }
      return null;
    }
    this.DataExce.timeouts=function(open,times){
        if(open){
          setTimeout(function(){
            that.DataExce.getTimeData(open,times);
          },times||goldconfig.times);
        }
    }
    this.DataExce.getTimeData=function(open) {
      $.ajax({
            type : "POST",
            url : goldconfig.backendHost+"/changePrice/api/v1.0/NeedAuthPrice",
            data:{orgCode:goldconfig.orgCode()},
            dataType : "json",
            success : function(res) {
              if(res.code=='100004'){
                console.log('授权已过期');
                that.DataExce.timeouts(open,'60000');
                dataLoadingStatus(true,$('#pc-content').height(),$('#pc-content').width());
                return;
              }
              var ltimes=res.data.times;//过期时间
              if(ltimes<=5*86400){
                var lday=parseInt(ltimes/86400);
                var lhour=parseInt(ltimes/(60*60)%24);
                var lmin=parseInt(ltimes/60%60);
                //var lsen=parseInt(ltimes%60);
                $('#ltimes').html('授权剩余'+(lday)+'天'+(lhour)+'小时'+lmin+'分');
              }else{
                $('#ltimes').html();
              }
              //var data=res.data.parseJSON();
              var data=JSON.parse(res.data.data);
              var newdatas = data[0].concat(data[1]);
              if(goldconfig.groupConfig.length<1){
                alert('用户暂未注册');
                return;
              }
              for(var t=0;t<goldconfig.metalConfig.length;t++){
                var goldData=goldconfig.metalConfig[t];
                var sdata=that.DataExce.getDataFromList(newdatas,goldData.metalCode);
                if(!sdata){
                  console.log('未获取到数据：'+goldData.metalCode);
                  continue;
                }
                var tdatabid = sdata.BID*goldData.upDownRate+goldData.buyBackWater ;
                var tdataask = sdata.ASK*goldData.upDownRate+goldData.saleWater ;
                var tdatamax = sdata.HIGH*goldData.upDownRate+goldData.buyBackWater ;
                var tdatamin = sdata.LOW*goldData.upDownRate+goldData.saleWater;
                var oldBid = $('.bid' + goldData.goldUserDiyMetalConfigId)
                    .html();
                var oldAsk = $('.ask' + goldData.goldUserDiyMetalConfigId)
                    .html();
                /*赋值和变色*/
                that.DataExce.doValColor(goldData.goldUserDiyMetalConfigId, goldData.constraintLen, tdatabid,
                    oldBid, tdataask, oldAsk,
                    tdatamax, tdatamin);
              }
              that.DataExce.timeouts(open,goldconfig.times);
              dataLoadingStatus(false);
            },
            error : function(d) {
              console.log("getTimeDataError:" + JSON.stringify(d));
              that.DataExce.timeouts(open,goldconfig.times);
              
            }
          })
    }
    this.DataExce.doValColor=function(em, tf, newbid, oldbid, newask, oldask, tdatamax,
        tdatamin) {
      //最高和最低
      if (tdatamax) {

        $('.max' + em).html((tdatamax * 1).toFixed(tf));
      }
      if (tdatamin) {
        $('.min' + em).html((tdatamin * 1).toFixed(tf));
      }
      if (newbid && oldbid) {

        newbid = (newbid * 1).toFixed(tf);
        that.DataExce.doColor('.bid' + em, newbid, oldbid);
        $('.bid' + em).html(newbid);
      }
      if (newask && oldask) {
        newask = (newask * 1).toFixed(tf);
        that.DataExce.doColor('.ask' + em, newask, oldask);
        $('.ask' + em).html(newask);
      }

    }
    this.DataExce.doCss=function(elem,cn,cv){
     $(elem).css(cn,cv);
    }
    //av:新值，bv老值
    this.DataExce.doColor=function(elem, av, bv) {
      
      if (av < bv) {
        that.DataExce.doCss(elem,'color','white');
        that.DataExce.doCss(elem,"background-color",'green');
        that.DataExce.doCss(elem,'border-right','1px solid white');
        that.DataExce.doCss(elem,'border-bottom','1px solid white');
        
      } else if (av > bv) {
        that.DataExce.doCss(elem,'color','white');
        that.DataExce.doCss(elem,"background-color",'red');
        that.DataExce.doCss(elem,'border-right','1px solid white');
        that.DataExce.doCss(elem,'border-bottom','1px solid white');
      } else {
        $(elem).css({
          "color" : $(elem).css('background-color')=='rgb(255, 0, 0)'?'red':'green'
        });
        $(elem).css({
          "background-color" : ""
        });
        that.DataExce.doCss(elem,'background-color','');
        that.DataExce.doCss(elem,'color',($(elem).css('background-color')=='rgb(255, 0, 0)'?'red':'green'));
        that.DataExce.doCss(elem,'border-right','none');
        that.DataExce.doCss(elem,'border-bottom','none');
      }
    }
    this.feedback=function () {
        var customerTrueName = $.trim($("#customerTrueName").val());
        var customerPhone = $.trim($("#customerPhone").val());
        var customerRemark = $.trim($("#customerRemark").val());
        var customerMail = $.trim($("#customerMail").val());
      
      if (customerTrueName == "" || customerTrueName.length>8 ) {
            alert('请输入正确姓名！'); 
            $("#customerTrueName").focus();
            return;
        }
      
      if (customerPhone == "" || customerPhone.length!=11) {
         alert('请输入正确的电话号码！'); 
            $("#customerPhone").focus();
            return;
        }
      
      
      if (customerRemark == "") {
         alert('请输入留言内容！'); 
            $("#customerRemark").focus();
            return;
        }
        var data={
          customerTrueName:customerTrueName,
          customerPhone:customerPhone,
          customerRemark:customerRemark,
          customerMail:customerMail,
          orgCode:goldconfig.orgCode()
        };
        $.ajax({
            url: goldconfig.backendHost+"/customerMessage/v1.0/api/addCustomerMessage",
            data:  data,
            cache: false,
            type: "POST",
            success: function (obj) {
                if (obj.code == '000000') {
                   alert('留言成功,我们会尽快联系你');
                   
                }
                else {
            
              alert('留言失败,请重试或拨打联系电话');
                }
            },
            error: function () {
          alert('留言失败,请重试或拨打联系电话');
            }
        });
      
    }
   }