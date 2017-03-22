$(function(){
	//菜单按钮动态生成
	$.ajax({
		type:"get",
		url:"http://mmb.ittun.com/api/getindexmenu",
		datatype:"json",
		async:true,
		success:function(data){
			
			$(".spinner").addClass("hide");
			var a =template("menu",data);
			$(".menu ul").html(a);
			
			//更多加载其他
			$(".menu ul li").eq(7).nextAll().addClass("hide");
			$(".menu ul li").eq(7).click(function(){
				$(this).nextAll().toggleClass("hide");
				return false;
			});
		}
	});
	
	//列表动态生成
	
	$.ajax({
		type:"get",
		url:"http://mmb.ittun.com/api/getmoneyctrl",
		datatype:"json",
		async:true,
		success:function(data){
			
			var b = template("list",data);
			$(".list").html(b);
		}
	});
	

	
})

















































