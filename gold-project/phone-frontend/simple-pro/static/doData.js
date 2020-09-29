    function tobg1(name) {
      $('#maini').show();
      $('#constd').hide();
    }
    function tobg2(name) {
      $('#maini').hide();
      $('#constd').show();
    }

    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null)
        return unescape(r[2]);
      return null;
    }

    function readFile() {

      $('#vteds').load('test.txt');
      console.log("dgcc=" + $('#vteds').html());
    }

    var loadtimes = 0;
    $(document).ready(
        function() {
          if (/Android|webOS|iPhone|iPod|BlackBerry/i
              .test(navigator.userAgent)) {

          } else {
            //window.location.href="http://www.banxue.fun:8085/wtjy/index-pc.html";
          }
          $('#timeshi').hide();
          readFile();

          var tg = self.setTimeout("allData()", 1000);//N毫秒刷新一次，1000毫秒＝1秒
        });
    function allData() {
      if (loadtimes == 1) {
        readFile();
      }
      getNew3Data();
      var tg2 = self.setInterval("getNew3Data()", 3000);//N毫秒刷新一次，1000毫秒＝1秒
      var tg3 = self.setInterval("readFile()", 10000);//N毫秒刷新一次，1000毫秒＝1秒
    }
    function getDgc() {

      var dgc = $('#vteds').html();
      var dgcc = "{" + dgc + "}";
      var res = eval("(" + dgcc + ")");
      if( res.isOpen==0){

       $('#openText').html('开盘');
      }else{
        $('#openText').html('停盘');
      }
      return res;
    }

    var ind = 0;
    function getNew3Data() {
      ind++;
      if(ind>2){
       // return;
      }
      var dgc = getDgc();
      $.ajax({
            type : "GET",
            url : "http://www.banxue.fun:8084/NewHtjApi",
            dataType : "json",
            condentType : 'application/json',
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
                            ASK:0,
                            HIGH:tdatamax * 0.997,
                            LOW:tdatamin * 0.997  
                          });
                          newdatas.push({
                            CODE:'au18',
                            BID:tdatabid * 0.745  ,
                            ASK:0,
                            HIGH:tdatamax * 0.745,
                            LOW:tdatamin * 0.745  
                          });
                        }else if(tnamecode == "xag"){

                          newdatas.push({
                            CODE:'ag925',
                            BID:tdatabid * 0.87 ,
                            ASK:0,
                            HIGH:tdatamax * 0.87 ,
                            LOW:tdatamin * 0.87 
                          });
                        }else if(tnamecode == "xpt"){
                          newdatas.push({
                            CODE:'pt990',
                            BID:tdatabid * 0.98 ,
                            ASK:0,
                            HIGH:tdatamax * 0.98,
                            LOW:tdatamin * 0.98
                          });
                          newdatas.push({
                            CODE:'pt950',
                            BID:tdatabid * 0.925 ,
                            ASK:0,
                            HIGH:tdatamax * 0.925 ,
                            LOW:tdatamin * 0.925 
                          });
                        }else if(tnamecode == "xpd"){
                           newdatas.push({
                            CODE:'pd990',
                            BID:tdatabid * 0.98 ,
                            ASK:0,
                            HIGH:tdatamax * 0.98 ,
                            LOW:tdatamin * 0.98 
                          });
                          newdatas.push({
                            CODE:'pd950',
                            BID:tdatabid * 0.925 ,
                            ASK:0,
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
                    tjb=dgc[tnamecode+"buy"]*1;
                    tja=dgc[tnamecode+"mai"]*1;
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
                    doValColor(tnamecode, tf, tdatabid,
                        oldBid, tdataask, oldAsk,
                        tdatamax, tdatamin);

                  }
                }
              }
              $('#timeshi').show();
              $('#loading').hide();
            },
            error : function(d) {
              console.log("eee" + JSON.stringify(d));
            }
          })
    }
    function doValColor(em, tf, newbid, oldbid, newask, oldask, tdatamax,
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
        doColor('.bid' + em, newbid, oldbid);
        $('.bid' + em).html(newbid);
      }
      if (newask && oldask) {
        newask = (newask * 1).toFixed(tf);
        doColor('.ask' + em, newask, oldask);
        $('.ask' + em).html(newask);
      }

    }
    function doColor(elem, av, bv) {
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
          "color" : "green"
        });
        $(elem).css({
          "background-color" : ""
        });
      }
    }