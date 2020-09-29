
var Page=function(options){

	return new Class(options);
},Class=function(options){
	this.params={
		url:'',
		data:{},
		pageNum:1,
		pageSize:6,
		sumPage:1,
		sumCounts:1,
		ele:'.page'
	}
	$.extend(this.params,options);
	//this.pageNum=options.pageNum,pageSize=options.pageSize,sumPage=1,sumCounts=1,ele=options.ele||'.page',done=options.done;
	var that=this;
	this.getNextPageNum=function(){
		if(that.params.pageNum>=that.params.sumPage){
			console.log('已是最后一页');
			return 1;
		}
		that.getData(that.params.pageNum+=1);
	}
	this.getPrePageNum=function(){
		if(that.params.pageNum<=1){
			console.log('已是第一页');
			return 1;
		}
		that.getData(that.params.pageNum-=1);
	}
	this.test=function(){
		console.log(JSON.stringify(that.params));
	}
	this.doHtml=function(data){
		that.params.sumPage=data.totalPage;
		that.params.sumCounts=data.count;
		that.params.done(data.data);
		$(that.params.ele).html('<div><span class="prev">上一页</span><span> 当前第'+that.params.pageNum+'页  共'+that.params.sumPage+'页</span><span class="next"> 下一页</span></div>');
		$('.prev').on('click',function(){
			that.getPrePageNum();
		})
		$('.next').on('click',function(){
			that.getNextPageNum();
		})
	}
	this.getData=function(pg){
		$.ajax({
			url:that.params.url,
			data:$.extend(that.params.data,{page:pg,limit:that.params.pageSize}),
			type:'post',
			success:function(res){
				if(res.code=='000000'){
					that.doHtml(res);
				}else{
					alert('无数据');
				}
			},error:function(){
				alert('获取失败');
			}
		})
	}
}