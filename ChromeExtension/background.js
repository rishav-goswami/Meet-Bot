
chrome.runtime.onInstalled.addListener(() => {

});

let url = "https://meet.google.com/qfc-zsjy-tzd";
chrome.storage.local.get(['mUrl'], function (res) {
  url = res.mUrl;
});

chrome.alarms.onAlarm.addListener(function (alarm) {

  chrome.tabs.create({ url });

  let [tab] = chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content-script.js"]
  });
  console.log("Got an alarm!", alarm);
});