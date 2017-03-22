$(function() {

	//点击请求数据
	/*var str = window.location.href;
	var num = str.split('=')[1];
	console.log(num);*/
	
	var categoryid = window.localStorage.categoryid;
	console.log(categoryid);
	if(!categoryid){
		categoryid=0;
	}
	
	$.ajax({
		type: "get",
		url: "http://mmb.ittun.com/api/getcategorybyid",
		async: true,
		datatype: "json",
		data: { categoryid: +categoryid },
		success: function(data) {
			console.log(data);
			var html_t = template("title", data);
			$(".nav span").html(html_t);

		}
	});
	
	
	
	
	
	
	
	
	
	
	

	//请求数据加载商品列表页面
	var num2 = 1; //默认第一页
	$.ajax({
		type: "get",
		url: "http://mmb.ittun.com/api/getproductlist",
		async: true,
		datatype: "json",
		data: { categoryid: +categoryid, pageid: num2 },
		success: function(data) {
			console.log(data);
			var html_p = template("pro_list", data);
			$(".pro_list").html(html_p);

			var pagesize = data.pagesize; //每页的条数
			var totalCount = data.totalCount; //总共条数
			var page = Math.ceil(totalCount / pagesize); //总页数

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
				num2 = 1;
				getData();
			})

			$("#select li").eq(0).siblings().click(function() {
				$("#select li").eq(0).html($(this).html());
				$("#select li").eq(0).siblings().addClass("hide");
				num2 = $(this).index()+1;

				console.log(num2);
				getData();
			})

			//按钮点击事件
			$("#prev").click(function() {
				num2--;
				if(num2 == 0) {
					num2 = 1;
					return;
				}
				$("#select li").eq(0).html(num2+"/"+page);
				getData();

			})
			$("#next").click(function() {
				num2++;
				if(num2 > page) {
					num2 = page;
					return;
				}
				$("#select li").eq(0).html(num2+"/"+page);
				getData();
			})
			
			function getData(){
				$.ajax({
					type: "get",
					url: "http://mmb.ittun.com/api/getproductlist",
					async: true,
					datatype: "json",
					data: { categoryid: +categoryid, pageid: num2 },
					success: function(data) {
//						console.log("请求");
						var html_p = template("pro_list", data);
						$(".pro_list").html(html_p);

					}
				})
			}
			
			
			
			
			
			//点击商品跳转到详情页。将该商品的id传入地址栏，下一个页面进行请求数据。
			$(".media_list").click(function() {

				var productListId = $(this).attr("abc");
				
				window.localStorage.productListId = productListId;

				var productListName = $(".nav span i").html();
				
				window.localStorage.productListName = productListName;

				/*var myurl = "particulars.html" + "?" +
					"productid=" + productListId +
					"&name=" + name +
					"&categoryid=" + categoryid;

				window.location.assign(myurl);*/

			})

		}
	});

})