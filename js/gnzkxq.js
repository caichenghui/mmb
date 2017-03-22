$(function() {
	//获取该商品的id
	var gnzkId = window.localStorage.gnzkId;

	console.log(gnzkId);

	//请求数据（详情页）
	$.ajax({
		type: "get",
		url: "http://mmb.ittun.com/api/getdiscountproduct",
		async: true,
		datatype: "json",
		data: { productid: gnzkId },
		success: function(data) {
			data = data.result[0];
			console.log(data);
			$(".main h3").html(data.productName);
			$(".main h4").html(data.productPrice);
			$(".main .p1 span").eq(0).html(data.productFrom);
			$(".main .p1 span").eq(1).html(data.productTime);
			$(".main .p1 span").eq(2).html(data.productTips);
//			$(".main .p1 span").eq(3).html(data.productComCount);

//			$(".cont_top .img").html(data.productImgSm);
			$(".cont_top p").html(data.productInfo);

			$(".main .p2").html(data.productInfo1);
			$(".main .bgimg").html(data.productImg);

			$(".main>.list").html(data.productCity);
			if(!$(".main>.list ul").html()){
				$(".main>.list").css({"display":"none"})
			}

			//评论
			$(".cont_mid").html(data.productComment);
			
			if(!$(".cont_mid .list ul").html()){
				$(".cont_mid .list ul").css({"display":"none"})
			}

		}
	})

})