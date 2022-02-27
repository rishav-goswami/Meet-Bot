// const delay = ms => new Promise(res => setTimeout(res, ms));
chrome.runtime.onInstalled.addListener(() => {

});

let url = "https://meet.google.com/qfc-zsjy-tzd";
chrome.storage.local.get(['mUrl'], function (res) {
  url = res.mUrl;
});

chrome.alarms.onAlarm.addListener(function (alarm) {

  // delay(400);
  console.log("Got an alarm!", alarm);

  CurrentTab();
});

try {

  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab){
    if (changeInfo.status == 'complete' && tab.url === url) {
      chrome.scripting.executeScript({
        files: ['content-script.js'],
        target: { tabId: tab.id }
      });
    }
  });
} catch (e) {
  console.log(e);
}

async function CurrentTab() {

  let tab = await chrome.tabs.create({ url });

  // let queryOptions = { active: true, currentWindow: true };
  // let [tab] = await chrome.tabs.query(queryOptions);
  // document.addEventListener("DOMContentLoaded", function () {
  // chrome.scripting.executeScript({
  //   target: { tabId: tab.id },
  //   files: ['content-script.js']
  // });
  // });
}