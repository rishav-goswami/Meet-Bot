const startBot = document.getElementById("start_bot");
let url_box = document.querySelector('input[type="url"]');
var timeControl = document.querySelector('input[type="datetime-local"]');
let time_hint = document.getElementById("time_hint");
let entered_time, entered_time_banner;


// Getting time value in entered time
url_box.addEventListener("input", function () {
  let link = "" + url_box.value;
  // Saving time data locally
  chrome.storage.local.set({ "mUrl": link }, function () {
    // any code...
    url_box.ariaPlaceholder = url_box.value;
  });

}, false);




// Getting time value in entered time
timeControl.addEventListener("input", function () {

  // Saving time data locally
  chrome.storage.local.set({ "prev_time": Date.parse(timeControl.value) }, function () {
    // any code...
    time_hint.innerHTML = "Last_meeting_hours : " + timeControl.value;
    entered_time = Date.parse(timeControl.value);
  });

}, false);



chrome.storage.local.get(['prev_time', 'mUrl'], function (result) {

  entered_time = result.prev_time;

  // Trying to set time value
  var date = new Date(entered_time);
  let hifen = (date.getMonth() < 10) ? "-0" : "-";
  let M = (date.getMinutes() < 10) ? ":0" : ":";
  let T = (date.getHours() < 10) ? "T0" : "T";
  var dateToStr = date.getFullYear() + hifen + (date.getMonth() + 1) + "-" + date.getDate() + T + date.getHours() + M + date.getMinutes();

  timeControl.value = dateToStr;
  url_box.value = result.mUrl;


  time_hint.innerHTML = "Last_meeting_hours : " + date;


});

// Trying to set time value but not working
// var date = new Date(entered_time);
// var dateToStr = date.toUTCString().split(' ');
// var cleanDate = "YYYY" + '-' + "MM" + '-' + "DD" + 'T' + dateToStr[4];
// timeControl.value = cleanDate;  yyyy-MM-ddThh:mm


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
      document.getElementById('start_bot').value = newLabel;
      if (callback) callback(hasAlarm);
    })
  }

  function createAlarm() {
    chrome.alarms.create(alarmName, {
      when: entered_time, periodInMinutes: 1440
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

