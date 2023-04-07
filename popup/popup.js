document.getElementById("popup_catch").addEventListener("click", () =>
{
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs)
	{
		console.log("tabs:", tabs)
		chrome.runtime.sendMessage({
			tabId: tabs[0].id,
			scriptToInject: "/devtools/panel/script.js"
		})
	})
	const bg = chrome.extension.getBackgroundPage()
	console.log("bg:", bg)
})
