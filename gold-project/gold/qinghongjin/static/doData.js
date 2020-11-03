   var goldconfig={};

    goldconfig.urlprex='http://www.banxue.fun';
    //goldconfig.urlprex='http://localhost';
    goldconfig.backendHost=goldconfig.urlprex+':8091/family',
    goldconfig.priceData={"openStatus":0,"xaubuy":0,"xausale":0,"xagbuy":0,"xagsale":0,"ptbuy":0,"ptsale":0,"pdbuy":0,"pdsale":0,"au18buy":0,"au18sale":0,"ag925buy":0,"ag925sale":0,"pt990buy":0,"pt990sale":0,"pt950buy":0,"pt950sale":0,"pd990buy":0,"pd990sale":0,"pd950buy":0,"pd950sale":0,"au1000buy":0,"au1000sale":0};
    goldconfig.orgCode='2323030239191034321128336033411521596038584721531539511652393417';//每个账号不一样
    goldconfig.shopPhone='13524954089';
    goldconfig.shopAddress='四川成都市';
    goldconfig.normalPhone='020-1100234';
    goldconfig.mailCode='10001';
   /* $('#shopPhone').html(goldconfig.shopPhone);
    $('#normalPhone').html(goldconfig.normalPhone);
    $('#shopAddress').html(goldconfig.shopAddress);
    $('#mailCode').html(goldconfig.mailCode);
    $('#shopPhone').attr('href','tel://'+goldconfig.shopPhone);*/
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
      if(goldconfig.priceData){
        if(goldconfig.priceData.openStatus==2){
          $('#openText').html(isOpenText);
        }else if(goldconfig.priceData.openStatus==1){
          $('#openText').html('停盘');
        }else{
          $('#openText').html('开盘');
        }
      }
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
        url:goldconfig.backendHost+'/changePrice/api/v1.0/getChangePriceSingle',
        type:'post',
        dataType : "json",
        data:{orgCode:goldconfig.orgCode},
        success:function(res){
          if(res.code='000000'){
            if(goldconfig.priceData){

              goldconfig.priceData=res.data;
              callback && callback();
            }else{
              console.log("获取数据不正确");
            }
            console.log("实时行情:"+JSON.stringify(goldconfig.priceData));
          }else{
            console.log(res.msg);
          }
        },error:function(res){
          console.log('读取调价数据失败'+JSON.stringify(res));
        }
      })
    }

    var loadtimes = 0;
    
    

    var ind = 0;
    this.DataExce.getTimeData=function() {
      ind++;
      if(ind>2){
       // return;
      }
      $.ajax({
            type : "POST",
            url : "http://www.banxue.fun:8084/NewHtjApi",
            //url : "http://localhost:8091/family/changePrice/api/v1.0/NewHtjApi",
            //data:{orgCode:'11'},
            data:{orgCode:goldconfig.orgCode},
            dataType : "json",
            success : function(data) {

              var sdata = data[0];//获取到第一组的
              var tf = 2;
              var tja = 0;
              var tjb = 0;

              for (var j = 0; j < data.length; j++) {
                var sdata = data[j];
                if (sdata) {
                  if(j==0){
                    //增加1K金这些数据
                        var newdatas=[];
                     for (var i = 0; i < sdata.length; i++) {
                        var tnamecode = sdata[i].CODE
                            .toLowerCase().replace(/\+|\-|\./gi,'');

                        var tdatabid = (sdata[i].BID - 0)
                            .toFixed(tf);
                        var tdataask = (sdata[i].ASK - 0)
                            .toFixed(tf);
                        var tdatamax = (sdata[i].HIGH - 0)
                            .toFixed(tf);
                        var tdatamin = (sdata[i].LOW - 0)
                            .toFixed(tf);
                        if (tnamecode == "xau") {
                          newdatas.push({
                            CODE:'au1000',
                            BID:tdatabid * 0.997 ,
                            ASK:tdataask*0.997,
                            HIGH:tdatamax * 0.997,
                            LOW:tdatamin * 0.997  
                          });
                          newdatas.push({
                            CODE:'au18',
                            BID:tdatabid * 0.745  ,
                            ASK:tdataask*0.745,
                            HIGH:tdatamax * 0.745,
                            LOW:tdatamin * 0.745  
                          });
                        }else if(tnamecode == "xag"){

                          newdatas.push({
                            CODE:'ag925',
                            BID:tdatabid * 0.87 ,
                            ASK:tdataask*0.87,
                            HIGH:tdatamax * 0.87 ,
                            LOW:tdatamin * 0.87 
                          });
                        }else if(tnamecode == "xpt"){
                          newdatas.push({
                            CODE:'pt990',
                            BID:tdatabid * 0.98 ,
                            ASK:tdataask*0.98,
                            HIGH:tdatamax * 0.98,
                            LOW:tdatamin * 0.98
                          });
                          newdatas.push({
                            CODE:'pt950',
                            BID:tdatabid * 0.925 ,
                            ASK:tdataask*0.925,
                            HIGH:tdatamax * 0.925 ,
                            LOW:tdatamin * 0.925 
                          });
                        }else if(tnamecode == "xpd"){
                           newdatas.push({
                            CODE:'pd990',
                            BID:tdatabid * 0.98 ,
                            ASK:tdataask*0.98,
                            HIGH:tdatamax * 0.98 ,
                            LOW:tdatamin * 0.98 
                          });
                          newdatas.push({
                            CODE:'pd950',
                            BID:tdatabid * 0.925 ,
                            ASK:tdataask*0.925,
                            HIGH:tdatamax * 0.925 ,
                            LOW:tdatamin * 0.925 
                          });
                        }else{
                          continue;
                        }
                      }
                        if(newdatas){
                         sdata= sdata.concat(newdatas);
                        }
                  }
                  for (var i = 0; i < sdata.length; i++) {
                     tf = 2;
                    var tnamecode = sdata[i].CODE
                        .toLowerCase().replace(/\+|\-|\./gi,'');
                    tjb=goldconfig.priceData[tnamecode+"buy"]*1;
                    tja=goldconfig.priceData[tnamecode+"sale"]*1;
                    if(!tjb){
                      tjb=0;
                    }
                    if(!tja){
                      tja=0;
                    }
                    var tdatabid = sdata[i].BID*1+tjb ;
                    var tdataask = sdata[i].ASK*1+tja ;
                    var tdatamax = sdata[i].HIGH*1+tjb ;
                    var tdatamin = sdata[i].LOW*1+tjb;
                    if(tnamecode.indexOf('ag')!=-1){
                      tf=3;
                    }
                    //console.log(tnamecode+'--'+sdata[i].BID+"-----"+tdatabid);
                    var oldBid = $('.bid' + tnamecode)
                        .html();
                    var oldAsk = $('.ask' + tnamecode)
                        .html();
                    /*赋值和变色*/
                    that.DataExce.doValColor(tnamecode, tf, tdatabid,
                        oldBid, tdataask, oldAsk,
                        tdatamax, tdatamin);

                  }
                }
              }
              $('#timeshi').show();
              $('#loading').hide();
              setTimeout(that.DataExce.getTimeData,3000);

            },
            error : function(d) {
              console.log("eee" + JSON.stringify(d));
              setTimeout(that.DataExce.getTimeData,3000);
              
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
          "color" : "white"
        });
        $(elem).css({
          "background-color" : "green"
        });
      } else if (av > bv) {
        $(elem).css({
          "color" : "white"
        });
        $(elem).css({
          "background-color" : "red"
        });
      } else {
        $(elem).css({
          "color" : "black"
        });
        $(elem).css({
          "background-color" : ""
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
          orgCode:goldconfig.orgCode
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
$(document).ready(
  function() {

    $.ajax({
      url:goldconfig.backendHost+'/personalInfo/v1.0/api/getPersonalInfoSingleByOrgCode',
      data:{orgCode:goldconfig.orgCode},
      type:'post',
      success:function(res){
        if(res.code=='000000'){
            $('[name=shopPhone]').html(res.data.customerContactPersonal+"   "+res.data.customerContactPhone);
            $('#shopAddress').html(res.data.customerAddr);
            $('#customerName').html(res.data.customerName);
            $('#mailCode').html(res.data.customerMailCode);
            $('#orgAddrImg').attr('src',goldconfig.backendHost+'/'+res.data.customerAddrImg);
            $('#showLogo').attr('src',goldconfig.backendHost+'/'+res.data.customerLogo);
            $('[name=shopPhone]').attr('href','tel://'+res.data.customerContactPhone);
        }
      }
    })
});