$(function() {

	//分类页标题栏 请求数据
	$.ajax({
		type: "get",
		url: "http://mmb.ittun.com/api/getcategorytitle",
		async: true,
		datatype: "json",
		success: function(data) {
			console.log(data);
			var html_f = template("f_list", data);
			$("#main_ul").html(html_f);

			//分类页下拉菜单  请求数据

			$(".a_list").click(function() {
				$(this).next("a").children("b").toggleClass("top_5");

				var id = $(this).attr("myAttr");
				console.log(id)
				$(".table").eq(id).toggleClass("hide");
				$(".table").eq(id).parent().siblings(".div_list").children(".table").addClass("hide");
				
				if(!$(".table").eq(id).hasClass("hide")) {
					$(this).parent(".div_list").siblings().children(".arrow").children("b").removeClass("top_5");
					$.ajax({
						type: "get",
						url: "http://mmb.ittun.com/api/getcategory",
						data: { titleid: id },
						async: true,
						datatype: "json",
						success: function(data) {
							console.log(data);
							var html_s = template("s_list", data);
							$(".table").eq(id).html(html_s);





//							大家电  点击每一项，进行跳转，并且请求数据

							$(".table").find("a").click(function() {

								var num = $(this).attr("abc");
								
								window.localStorage.categoryid = num;
								
//				                var myurl = "classify.html" + "?" + "categoryid=" + num;  
								
//				                window.location.assign(myurl);  
							})
							
							
							
						}
					});
				}

			})

		}
	});

})