



ajaxFn({
	url: "http://mmb.ittun.com/api/getcategorybyid",
	data: { categoryid: +categoryid },
	callback: function(data) {
		console.log(data);
		var html_t = template("title", data);
		$(".nav span").html(html_t);
	}
});

function ajaxFn(obj) {

	$.ajax({
		type: "get",
		url: obj.url,
		async: true,
		datatype: "json",
		data: obj.data,
		success: obj.callback
	});

}