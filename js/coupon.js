$(function() {
	
	$(".list").hide();
	$.ajax({
		type: "get",
		url: "http://mmb.ittun.com/api/getcoupon",
		async: true,
		datatype: "json",
		success: function(data) {
			console.log(data);
			var html_q = template("quan", data);
			$(".quan").html(html_q);
			
			
			//点击每一个显示相关的页面
			var num;
			$(".quan li").click(function(){
				num = $(this).attr("abc");
				
				$(".quan").hide();
				$(".list").show();
				$.ajax({
					type: "get",
					url: "http://mmb.ittun.com/api/getcouponproduct",
					async: true,
					datatype: "json",
					data: { couponid: num },
					success: function(data) {
						console.log(data);
						var html_l = template("list", data);
						$(".list >ul").html(html_l);
						
						
						for(var i=0;i<data.result.length;i++){
							var li = document.createElement("li");
							li.innerHTML = data.result[i].couponProductImg;
							document.getElementById("images").appendChild(li);
						}
						$("#images").css({"width":data.result.length*100+'%'});
						
						
						
						var a = 0;
						//点击每一项列表出现遮罩和轮播图
						$(".list ul li").click(function(){
							
							$(".shade").removeClass("hide");
							a = $(this).index();
							document.getElementById("images").style.transform = 'translateX('+(-200*a)+'px)';
							
							
						})
						
						//点击遮罩，让遮罩消失
						$(".shade").click(function(){
							$(this).addClass("hide");
						})
						
						//点击箭头左右切换图片
						//上一张
						$(".arrow a").eq(0)[0].onclick = function(e){
							console.log(1);
							a--;
							if(a<0){
								a=-1;
								e.stopPropagation();
								return false;
							}
							tr(e);
							
						}
						
						//下一张
						$(".arrow a").eq(1)[0].onclick = function(e){
							console.log(2);
							a++;
							if(a>=data.result.length){
								a=data.result.length;
								e.stopPropagation();
								return;
							}
							tr(e)
							
						}
						
						function tr(e){
							document.getElementById("images").style.transition = 'all 0.2s';
							document.getElementById("images").style.transform = 'translateX('+(-200*a)+'px)';
							e.stopPropagation();
						}
					}
				});
			})
			
			

		}
	});
	
	
	
	
	
	
	
	
	var num = 0;

	

})