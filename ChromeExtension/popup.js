const startBot = document.getElementById("start_bot");
var timeControl = document.querySelector('input[type="time"]');
let time_hint = document.getElementById("time_hint");


// Getting time value in entered time
timeControl.addEventListener("input", function() {

  // Saving time data locally
  chrome.storage.local.set({"prev_time":  timeControl.value}, function() { 
    // any code...
    time_hint.innerHTML = "Last_meeting_hours : " + timeControl.value;
   });
 
}, false);

let entered_time;

chrome.storage.local.get(['prev_time'], function(result) {
  entered_time = result.prev_time;
  time_hint.innerHTML = "Last_meeting_hours : " + entered_time;
});



(function () {
  'use strict';
  var alarmName = 'remindme';
  function checkAlarm(callback) {
    chrome.alarms.getAll(function (alarms) {
      var hasAlarm = alarms.some(function (a) {
        return a.name == alarmName;
      });
      var newLabel;
      if (hasAlarm) {
        newLabel = 'Cancel alarm';
      } else {
        newLabel = 'Activate alarm';
      }
      document.getElementById('start_bot').innerText = newLabel;
      if (callback) callback(hasAlarm);
    })
  }
  function createAlarm() {
    chrome.alarms.create(alarmName, {
      when: alarm_at, periodInMinutes: 1
    });
  }
  function cancelAlarm() {
    chrome.alarms.clear(alarmName);
  }
  function doToggleAlarm() {
    checkAlarm(function (hasAlarm) {
      if (hasAlarm) {
        cancelAlarm();
      } else {
        createAlarm();
      }
      checkAlarm();
   
    });
  }
  startBot.addEventListener('click', doToggleAlarm);
  checkAlarm();
})();

