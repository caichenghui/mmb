$(function() {

	//点击请求数据
	/*var str = window.location.href;
	var num = str.split('=')[1];
	num = /\d+/g.exec(num)[0];
	//	var name = decodeURIComponent(str.split('=')[2]+'');
	var name = decodeURIComponent(str.split('=')[2].split("&")[0] + '');
	var href = str.split('&')[2];*/
	
	
	var num = window.localStorage.productListId;
	var name = window.localStorage.productListName;
	
	if(!num){
		num =0;
	}

	$(".nav").children("a").eq(1).html(name);
	$(".nav").children("a").eq(1).attr({ "href": "classify.html" });

	$.ajax({
		type: "get",
		url: "http://mmb.ittun.com/api/getproduct",
		async: true,
		datatype: "json",
		data: { productid: +num },
		success: function(data) {
			console.log(data);
			console.log(data.result[0].productName);

			$(".nav span").html(data.result[0].productName.split(" ")[0]);

		}
	});

	//请求数据加载商品列表页面
	$.ajax({
		type: "get",
		url: "http://mmb.ittun.com/api/getproduct",
		async: true,
		datatype: "json",
		data: { productid: +num },
		success: function(data) {
			console.log(data);
			var html_l = template("list", data);
			$(".content").html(html_l);

			//点击tab栏切换选项卡
			$(".tab>li").click(function() {

				console.log(1);
				$(".tab>li").removeClass("active");
				$(this).addClass("active");
				$(".mid>div").hide();
				$(".mid>div").eq($(this).index()).show();
			});
			
			
			
			//请求评论信息
			$.ajax({
				type: "get",
				url: "http://mmb.ittun.com/api/getproductcom",
				async: true,
				datatype: "json",
				data: { productid: +num },
				success: function(data) {

					var html_p = template("pj", data);
					$(".ul_wypj").html(html_p);

				}
			});

		}
	});

})