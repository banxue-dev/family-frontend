   var goldconfig={};
      goldconfig.urlprex='http://www.banxue.fun';
    // goldconfig.urlprex='http://localhost';
    goldconfig.backendHost=goldconfig.urlprex+':8091/family',
    goldconfig.priceData={},
    goldconfig.personalInfo={},
    goldconfig.tempOrgCode='',
    goldconfig.orgCode=function(){
      if(!goldconfig.tempOrgCode){
        goldconfig.tempOrgCode=getQueryVariable('orgCode') || '2323030239191034321128336033411521596038584721531539511652393417';
      }
      return goldconfig.tempOrgCode;//每个账号不一样
    }
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
      window.location.href="index.html";
    }
    function tobg3(name) {
       window.location.href="news.html";
    }
    function tobg2(name) {
       window.location.href="c.html";
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
        var ov=$("."+type+id).html();
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
      $('#dataLoading').css('height',height+'px');
      $('#dataLoading').css('width',width+'px');
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
      if (yy < 1900)
        yy = yy + 1900;
      var MM = objD.getMonth() + 1;
      if (MM < 10)
        MM = '0' + MM;
      var dd = objD.getDate();
      if (dd < 10)
        dd = '0' + dd;
      var hh = objD.getHours();
      if (hh < 10)
        hh = '0' + hh;
      var mm = objD.getMinutes();
      if (mm < 10)
        mm = '0' + mm;
      var ss = objD.getSeconds();
      if (ss < 10)
        ss = '0' + ss;
      var ww = objD.getDay();
      if (ww == 0)
        colorhead = "<font color=\"red\">";
      if (ww > 0 && ww < 6)
        colorhead = "<font color=\"red\">";
      if (ww == 6)
        colorhead = "<font color=\"red\">";
      var isOpenText='开盘';
      if (ww == 0){
        ww = "星期日";
        isOpenText='停盘';
      }
      if (ww == 1)
        ww = "星期一";
      if (ww == 2)
        ww = "星期二";
      if (ww == 3)
        ww = "星期三";
      if (ww == 4)
        ww = "星期四";
      if (ww == 5)
        ww = "星期五";
      if (ww == 6){
        ww = "星期六";
        isOpenText='停盘';
      }
        //isOpenText='停盘';
      colorfoot = "</font>"
      str = colorhead + yy + "-" + MM + "-" + dd + " " + hh + ":" + mm
          + ":" + ss + "  " + ww + colorfoot;
      if(goldconfig.personalInfo.openStatus==1){
        isOpenText='停盘';
      }else{
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
      var grouphtml='';
      $('#mobile_htj').html("");
      for(var t=0;t<goldconfig.groupConfig.length;t++){
          var tda=goldconfig.groupConfig[t];
          grouphtml='';
          grouphtml='<li style="width:100%;background-color:'+(goldconfig.personalInfo.cellBackColor||'none')+';" id="group'+tda.groupCode+'"><div class="sl-zx-list-t " style="height: {{height}}rem;{{font}}">';
          grouphtml+='<span id="customerName">'+tda.groupName+'</span></div>';
          var metalhtml='';
          var childCnt=0;
          for(var d=0;d<goldconfig.metalConfig.length;d++){
              if(goldconfig.metalConfig[d].groupId==tda.groupCode){
                var tdb=goldconfig.metalConfig[d];
                //tdb.goldUserDiyMetalConfigId
                metalhtml+='<div class="sl-zx-tb1  sl-zx-tb-ys2">';
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
                      metalhtml+='<label onclick="changeevent.buyWaterAdd('+tdb.goldUserDiyMetalConfigId+","+tdb.constraintLen+')" style="margin-right: 0.4rem;cursor:pointer">+</label>';
                      metalhtml+='<input onchange="changeevent.valueChanged(this,'+tdb.goldUserDiyMetalConfigId+',1,'+tdb.constraintLen+')"  type="text" id="buyBackWater'+tdb.goldUserDiyMetalConfigId+'" value="'+tdb.buyBackWater+'" style="background-color:'+(goldconfig.personalInfo.cellBackColor||"transparent")+';width: 2.5rem;border: 0px;">';
                      metalhtml+='<label  onclick="changeevent.buyWaterSal('+tdb.goldUserDiyMetalConfigId+","+tdb.constraintLen+')" style="margin-left: 0.4rem;cursor:pointer">-</label>';
                    metalhtml+='</div>';
                    metalhtml+=' <div style="height:2rem;line-height:2rem;">';
                       metalhtml+='<label  onclick="changeevent.saleWaterAdd('+tdb.goldUserDiyMetalConfigId+","+tdb.constraintLen+')" style="margin-right: 0.4rem;cursor:pointer">+</label>';
                       metalhtml+='<input onchange="changeevent.valueChanged(this,'+tdb.goldUserDiyMetalConfigId+',2,'+tdb.constraintLen+')" type="text" id="saleWater'+tdb.goldUserDiyMetalConfigId+'" value="'+tdb.saleWater+'" style="background-color:'+(goldconfig.personalInfo.cellBackColor||"transparent")+';width: 2.5rem;border: 0px;">';
                       metalhtml+='<label  onclick="changeevent.saleWaterSal('+tdb.goldUserDiyMetalConfigId+","+tdb.constraintLen+')" style="margin-left: 0.4rem;cursor:pointer">-</label>';
                    metalhtml+='</div>';
                   metalhtml+='</div>';
                }
                metalhtml+='</div>';
                childCnt++;
              }
          }
          if(childCnt<2){
            grouphtml=grouphtml.replaceAll('{{font}}','font-size:2.5vw;');
          }else{

            grouphtml=grouphtml.replaceAll('{{font}}','');
          }
          grouphtml=grouphtml.replaceAll('{{height}}',(childCnt*4));
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

    var loadtimes = 0;
    
    this.DataExce.getDataFromList=function(lst,id){
      for(var i=0;i<lst.length;i++){
        if(lst[i].ID==id){
          return lst[i];
        }
      }
      return null;
    }
    this.DataExce.getTimeData=function(open) {
      $.ajax({
            type : "POST",
            url : goldconfig.backendHost+"/changePrice/api/v1.0/NeedAuthPrice",
            data:{orgCode:goldconfig.orgCode()},
            dataType : "json",
            success : function(data) {
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
              if(open){
                setTimeout(that.DataExce.getTimeData,3000);
              }
              dataLoadingStatus(false);
            },
            error : function(d) {
              console.log("eee" + JSON.stringify(d));
              if(open){
                setTimeout(that.DataExce.getTimeData,3000);
              }
              
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
    this.DataExce.doColor=function(elem, av, bv) {
      if (av < bv) {
        $(elem).css({
          "color" : "green"
        });
        $(elem).css({
          //"background-color" : "green"
        });
      } else if (av > bv) {
        $(elem).css({
          "color" : "red"
        });
        $(elem).css({
          //"background-color" : "red"
        });
      } else {
        $(elem).css({
          "color" : "black"
        });
        $(elem).css({
          //"background-color" : ""
        });
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