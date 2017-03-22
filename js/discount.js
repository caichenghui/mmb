$(function() {
	//获取该商品的id
	var spxqId = window.localStorage.spxqId;

	console.log(spxqId);
	if(!spxqId){
		spxqId=20;
	}
	//请求数据（详情页）
	$.ajax({
		type: "get",
		url: "http://mmb.ittun.com/api/getmoneyctrlproduct",
		async: true,
		datatype: "json",
		data: { productid: spxqId },
		success: function(data) {
			data = data.result[0];
			console.log(data);
			$(".main h3").html(data.productName);
			$(".main h4").html(data.productPinkage);
			$(".main .p1 span").eq(0).html(data.productFrom);
			$(".main .p1 span").eq(1).html(data.productTime);
			$(".main .p1 span").eq(2).html(data.productTips);
			$(".main .p1 span").eq(3).html(data.productComCount);

			$(".cont_top .img").html(data.productImgSm);
			$(".cont_top p").html(data.productInfo);

			$(".main .p2").html(data.productInfo1);
			$(".main .bgimg").html(data.productImgLg);

			$(".list").html(data.productCity);

			//评论
			$(".cont_mid").html(data.productComment);
		}
	})

})