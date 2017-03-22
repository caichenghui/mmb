$(function() {
	
	//请求数据加载商品列表页面
	var num2 = 0; //默认第一页
	$.ajax({
		type: "get",
		url: "http://mmb.ittun.com/api/getmoneyctrl",
		async: true,
		datatype: "json",
		data: { pageid: num2 },
		success: function(data) {
			console.log(data);
			var html_p = template("pro_list", data);
			$(".pro_list").html(html_p);

			var pagesize = data.pagesize; //每页的条数
			var totalCount = data.totalCount; //总共条数
			var page = Math.ceil(totalCount / pagesize); //总页数
			
			console.log(pagesize,totalCount,page);
			
			
			//创建下拉菜单
			for(var i = 0; i < page; i++) {
				var li = document.createElement("li");
				li.innerHTML = (i + 1) + '/' + page;
				document.getElementById("select").appendChild(li);
			}
			/*$("#select li").hover(function(){
				$(this).css({"backgroundColor":"red"})
			})*/
			$("#select li").eq(0).siblings().addClass("hide");
			$("#select li").eq(0).click(function() {
				$(this).html("1" + '/' + page);
				$("#select li").eq(0).siblings().toggleClass("hide");
				num2 = 0;
				getData();
			})

			$("#select li").eq(0).siblings().click(function() {
				$("#select li").eq(0).html($(this).html());
				$("#select li").eq(0).siblings().addClass("hide");
				num2 = $(this).index();

				console.log(num2);
				getData();
			})

			//按钮点击事件
			$("#prev").click(function() {
				num2--;
				if(num2 == -1) {
					num2 = 0;
					return;
				}
				$("#select li").eq(0).html((num2+1)+"/"+page);
				getData();

			})
			$("#next").click(function() {
				num2++;
				console.log(num2)
				if(num2 >= page) {
					num2 = page;
					return;
				}
				$("#select li").eq(0).html((num2+1)+"/"+page);
				getData();
			})
			
			function getData(){
				$.ajax({
					type: "get",
					url: "http://mmb.ittun.com/api/getmoneyctrl",
					async: true,
					datatype: "json",
					data: { pageid: num2 },
					success: function(data) {
						console.log(data);
						var html_p = template("pro_list", data);
						$(".pro_list").html(html_p);

					}
				})
			}
			
			
			
			
			
			//点击商品跳转到详情页。将该商品的id传入地址栏，下一个页面进行请求数据。
			$(".media_list").click(function() {
				
				window.localStorage.spxqId = $(this).attr("abc");

				/*var productListName = $(".nav span i").html();
				
				window.localStorage.productListName = productListName;*/

			})

		}
	});

})


































