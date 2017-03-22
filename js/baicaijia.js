$(function() {

	//一进来就加载tab栏
	$.ajax({
		type: "get",
		url: "http://mmb.ittun.com/api/getbaicaijiatitle",
		async: true,
		datatype: "json",
		success: function(data) {
//			console.log(data);
			var html_t = template("tab", data);
			$(".tab ul").html(html_t);
			
			$(".tab ul li").eq(0).children("a").addClass("active");
			
			
			
			$(".search").click(function(){
				$(".input").toggleClass("hide");
			})
			
			
			
			var num = 0;
			
			//点击切换底下内容
			$(".tab ul li").click(function(e){
				
				$(this).children("a").addClass("active").parents("li").siblings("li").children("a").removeClass("active");
				
				
				//根据点击位置和屏幕宽度来决定导航条的移动。
				//	设置过度
				var addTransition = function() {
					/*imgBox.style.transition = "all .2s";
					imgBox.style.webkitTransition = "all .2s";*/
					$(".tab ul").css({
						"transition":"all .2s",
						"webkitTransition":"all .2s"
					})
				}
				//	移除过度
				var removeTransition = function() {
					/*imgBox.style.transition = "none";
					imgBox.style.webkitTransition = "none";*/
					$(".tab ul").css({
						"transition":"none",
						"webkitTransition":"none"
					})
				}
				//	设置定位
				var setTranslateX = function(x) {
					/*imgBox.style.transform = "translateX(" + x + "px)";
					imgBox.style.webkitTransform = "translateX(" + x + "px)";*/
					$(".tab ul").css({
						"transform":"translateX(" + x + "px)",
						"webkitTransform":"translateX(" + x + "px)"
					})
				}
				
				var index = $(this).index();
				addTransition();
				setTranslateX(-index*38);
				
				
				
				
				num = $(this).children("a").attr("abc");
				$.ajax({
					type: "get",
					url: "http://mmb.ittun.com/api/getbaicaijiaproduct",
					async: true,
					datatype: "json",
					data: { titleid: num },
					success: function(data) {
						console.log(data);
						var html_l = template("list", data);
						$(".list ul").html(html_l);
	
					}
				});
				
				return;
			})
			
			$.ajax({
					type: "get",
					url: "http://mmb.ittun.com/api/getbaicaijiaproduct",
					async: true,
					datatype: "json",
					data: { titleid: num },
					success: function(data) {
						console.log(data);
						var html_l = template("list", data);
						$(".list ul").html(html_l);
	
					}
				});
			
			
		}
	});

})