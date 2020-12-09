
    var ghost=function(){
      var css='@keyframes ghostFloat { 0%, 100% {transform: translateY(0);}50% {transform: translateY(-8px);}}.ghost {animation: ghostFloat 3s ease-in-out infinite;position: fixed;right: 0px;top:70%;z-index: 999;cursor:pointer;}.tip {position: relative;background-color: transparent;color: black;text-align: center;border-radius: 10px;font-family: sans-serif;}.tip:after {content: "";position: absolute;width: 0;height: 0;border: 8px solid;}.right:after {border-left-color: rgba(126,126,126,0.4);left: 100%;top: 50%;margin-top: -7px;color:transparent;}';
      $('head').append('<style rel="stylesheet">'+css+'</style>');
      var html_2='<div id="jump_ghost" class="ghost" >';
          html_2+='    <div style="display: flex;flex-direction: row-reverse;align-items:flex-end;">';
          html_2+='        <div id="littleghost"><img  src="static/ghost.png" style="width:50px;height:50px;" /></div>';
          //html_2+='        <div id="adbox" style="line-height:23px;height:50px;width:70%;display:none;background-color: rgba(126,126,126,0.7);border-radius: 10px;"><div style="" class="tip right">也想要这样的网站?请联系<a href="tel:13524954089">13524954089</a> 唐先生(微信同号) </div></div>';
          html_2+='        <div id="adbox" style="line-height:23px;height:50px;width:70%;display:none;background-color: rgba(126,126,126,0.7);border-radius: 10px;"><div style="" class="tip right"><img scr="static/customer.jpg" style="width: 80px;height: 80px;"></div></div>';
          html_2+='    </div>';
          html_2+='</div>';
          $('body').append(html_2);
          $('#littleghost').on('click',function(){
            $('#adbox').toggle();
          });
          setTimeout(function(){
              $('#adbox').show();
          },5000);

    }();