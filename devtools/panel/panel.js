function handleResult(result)
{
	console.log("result:", result)
}
document.getElementById("send_message").addEventListener("click", function ()
{
	const inspectString = `console.log('onCatchClick')`;
	// console.log("request:", request.request.url)
	chrome.devtools.inspectedWindow.eval(inspectString, function (result, isException)
	{
		console.log("result:", result, isException)
	})
})

// const scriptToAttach = "document.body.innerHTML = 'Hi from the devtools';";
document.getElementById("catch_api").addEventListener("click", function ()
{
	// chrome.declarativeNetRequest.getEnabledRulesets((rule) =>
	// {
	// 	console.log("rule:", rule)
	// })

	// chrome.declarativeNetRequest.getMatchedRules({
	// 	tabId: chrome.devtools.inspectedWindow.tabId
	// }, function (rule)
	// {
	// 	console.log("match:", rule)
	// })

	chrome.devtools.network.getHAR(function (har)
	{
		console.log("har:", har)
		if (har && har.entries)
		{
			// \/hls\/.*\.m3u8$
			const pattern = /^https:\/\/omofun\.in\/_dyn_plays\/\d+\/(ep\d)?$/;
			const entries = har.entries
			const filterHAR = entries.filter(h => h._resourceType
				=== 'xhr')
			const filterEntries = filterHAR.find(e => pattern.test(e.request.url))
			console.log("filterHAR", filterHAR, filterEntries)
			const linksList = document.getElementById('linksList');

			function emptyLink()
			{
				const link = document.createElement('li');
				link.textContent = '暂无链接'
				linksList.appendChild(link)
			}

			filterEntries.getContent(res =>
			{
				if (res)
				{
					const obj = JSON.parse(res)
					const { video_plays } = obj
					console.log("request:", obj, video_plays)
					if (video_plays)
					{
						for (let i = 0; i < video_plays.length; i++)
						{
							const link = document.createElement('li');
							link.textContent = video_plays[i].play_data
							linksList.appendChild(link)
						}
					} else
					{
						emptyLink()
					}
				} else
				{
					emptyLink()
				}
			})
			// const linksList = document.getElementById('linksList');
			// linksList.innerHTML = '链接列表'
			// if (filterEntries && filterEntries.length)
			// {
			// 	for (let i = 0; i < filterEntries.length; i++)
			// 	{
			// 		const link = document.createElement('li');
			// 		link.textContent = filterEntries[i].request.url
			// 		linksList.appendChild(link)
			// 	}
			// } else
			// {
			// 	const link = document.createElement('li');
			// 	link.textContent = '暂无链接'
			// 	linksList.appendChild(link)
			// }
		}
	})

	chrome.runtime.sendMessage({
		tabId: chrome.devtools.inspectedWindow.tabId,
		scriptToInject: "/devtools/panel/script.js"
	})
})
