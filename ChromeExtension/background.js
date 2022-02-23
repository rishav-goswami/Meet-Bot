
chrome.runtime.onInstalled.addListener(() => {});

chrome.alarms.onAlarm.addListener(function (alarm) {

  let url = "https://meet.google.com/qfc-zsjy-tzd";

  chrome.tabs.create({ url });

  let [tab] =  chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["content-script.js"]
        });
  console.log("Got an alarm!", alarm);
});