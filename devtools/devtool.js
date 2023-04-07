document.addEventListener('DOMContentLoaded', function ()
{
	chrome.devtools.network.getHAR((har) =>
	{
		console.log("har:", har)
	})

	chrome.devtools.network.onRequestFinished.addListener(
		function (request)
		{
			//request 包含请求响应数据，如：url,响应内容等
			//request.request.url 接口 的url
			//request.getContent 接口返回的内容
			const pattern = /^https:\/\/omofun\.in\/_dyn_plays\/\d+\/ep1$/;
			if (pattern.test(request.request.url))
			{
				// console.log("request:", request.getContent())
				request.getContent((res) =>
				{
					const obj = JSON.parse(res)
					const { video_plays } = obj
					console.log("request:", obj, video_plays)
				})
				// const inspectString = 'console.log("request: " + unescape("' + escape(request.getContent(res => res)) + '"))';
				// chrome.devtools.inspectedWindow.eval(inspectString, function (result, isException)
				// {
				// 	console.log("result:", result, isException)
				// })
			}
		}
	);
})

chrome.devtools.panels.create(
	"CatchApi",
	"/img/star.png",
	"/devtools/panel/panel.html",
	function (panel)
	{
		console.log("创建完成", panel)
	}
)
