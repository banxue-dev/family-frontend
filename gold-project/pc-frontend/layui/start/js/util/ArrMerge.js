/**
 * 数据合并去重
 * @param arr1
 * @param arr2
 * @returns
 */
function MergeArray(arr1,arr2,idk){
    var _arr = new Array();
    for(var i=0;i<arr1.length;i++){
    	if(arr1[i]!=null){
    		
    		_arr.push(arr1[i]);
    	}
    }
    for(var i=0;i<arr2.length;i++){
        var flag = true;
        for(var j=0;j<arr1.length;j++){
        	if(arr1[j]!=null){
        		if(arr2[i][idk]){
            		if(arr2[i][idk]==arr1[j][idk]){
            			flag=false;
            			break;
            		}
            	}else{
            		if(arr2[i].uuid==arr1[j].uuid){
            			flag=false;
            			break;
            		}
            	}
        	}
        	
        }
        if(flag){
            _arr.push(arr2[i]);
        }
    }
    return _arr;
}