function handleMessage(request, sender, sendResponse)
{
	console.log("message:", request, sender, sendResponse)
	chrome.scripting.executeScript({
		target: { tabId: request.tabId },
		files: [request.scriptToInject]
	})
}

chrome.runtime.onMessage.addListener(handleMessage);
