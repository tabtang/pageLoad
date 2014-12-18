/*
* @页面加载预处理插件
* @des 只兼容移动端 只根据img个数计算加载百分比（未计算link script 等资源）
*/
(function(){
		//加载百分比
	var sum = 0,
		//获取页面中所有img
		imgs = document.getElementsByTagName('img'),
		//遮罩层
		box = document.getElementById('loadMash'),
		//显示百分比的节点
		numbox = document.getElementById('loadMashNum'),
		//计算每加载完一项所增加的百分比数值
		singleNum = 100 / (imgs.length);
	
	//imgs绑定onload
	for(var i=0; i<imgs.length; i++){
		(function(_i){
			if(imgs[_i].complete){
				callback('img', _i);
			}else{
				bind(imgs[_i], 'load', function(){
					callback('img', _i);
				});
			}
		})(i);
	}
	
	//单项加载完执行的回调
	function callback(type, idx){
		sum += singleNum;
		//留1%加载其他资源
		sum = sum === 100 ? 99 : sum;
		numbox.innerHTML = parseInt(sum, 10);
	}
	
	//所有资源加载完隐藏遮罩层
	bind(window, 'load', function(){
		numbox.innerHTML = 100;
		box.style.display = 'none';
	});
	
	//绑定事件函数
	function bind(obj, type, fn){
		obj.addEventListener(type, fn, false);
	}
})();