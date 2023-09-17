chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)=>{
    if (tab.url && tab.url.includes("youtube.com/watch")){
        chrome.tabs.sendMessage(tabId,{
            type:"NEW"
        });

    }
})
