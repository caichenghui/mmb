$(function() {
	
	//请求数据加载商品列表页面
	$.ajax({
		type: "get",
		url: "http://mmb.ittun.com/api/getinlanddiscount",
		async: true,
		datatype: "json",
		success: function(data) {
			console.log(data);
			
			
			data = data.result;
			console.log(data.length)
			//页面一加载就生成4个商品列表
			cre4(0);
			
			//判断触底，触底就再追加4条商品信息
			var num = 0;
			$(window).on('scroll',function(){
				console.log($(window).scrollTop(),$(document).height(),$(window).height());
				
    			if($(window).scrollTop()>=$(document).height()-110-$(window).height()){
       				console.log("触底了");
       				$('.spinner').removeClass('hide');
       				setTimeout(function(){
       					$('.spinner').addClass('hide');
       					num +=4;
       					if(num>data.length-4){
       						alert("到底了");
       						return;
       					}
       					cre4(num);
       				},2000)
       				
    			}

			})
			
			
			
			
		//封装一个一次创建4个商品的函数
		function cre4(num){	
			for (var i=num;i<(4+num);i++) {
				var li = document.createElement("li");
				li.className = 'media';
				
				var a = document.createElement("a");
				a.href = 'gnzkxq.html';
				a.className = 'media-list';
				a.setAttribute('abc',data[i].productId);
				
				var div_img = document.createElement("div");
				div_img.className = 'media-left';
				div_img.innerHTML = data[i].productImg;
				
				var div_media = document.createElement("div");
				div_media.className = 'media-body';
				
				var p1 = document.createElement("p");
				p1.className = 'p1';
				p1.innerHTML = data[i].productName;
				
				var p2 = document.createElement("p");
				p2.className = 'p2';
				p2.innerHTML = data[i].productPrice;
				
				var p3 = document.createElement("p");
				p3.className = 'p3';
				p3.innerHTML = data[i].productFrom+'|'+data[i].productTime;
				
				$(".pro_list").append(li);
				li.append(a);
				a.append(div_img);
				a.append(div_media);
				div_media.append(p1);
				div_media.append(p2);
				div_media.append(p3);
				
				
			}
			//点击商品跳转到详情页。将该商品的id传入地址栏，下一个页面进行请求数据。
				$(".media-list").click(function() {
					
					window.localStorage.gnzkId = $(this).attr("abc");
					console.log(window.localStorage.gnzkId)
				})
		}	
			
			
			
		
				
			
			
			
			
			
			
			

		}
			
	});

})


































