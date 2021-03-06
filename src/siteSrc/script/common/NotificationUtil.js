/**
 * Utility for working with growl type of notifications
 * in the browser.
 */

/**
 *  Sets a notification at a specific hour, minute with an optional title.
 *  @param {integer} hour - 0-23 hour
 *  @param {integer} minute - 0-60 minute
 *  @param {string} notificationTitle (?) - title to show at the time
 *  @visibility - public
 *  @returns {void}
 **/
function scheduleNotification(hour, minute, notificationTitle){
  if (typeof Notification == 'undefined'){
    alert('Notifications are only available in modern versions of Chrome, Firefox, Opera or Safari.');
  }

  if( !notificationTitle ){
    notificationTitle = "";
  }
  
  Notification.requestPermission(function(permission){
    if( permission !== 'granted' ) return;
    
    executeAtHourMinute( runNotification, hour, minute, [notificationTitle] );
  });
}

/**
 *  Executes a notification
 *  @param {string} notificationTitle - Title to provide notification for
 *  @visibility - protected
 *  @returns {void}
 **/
function runNotification(notificationTitle){
  if( !notificationTitle ){
    notificationTitle = "";
  }

  var notification = new Notification("Alert for: " + notificationTitle, {
    body: "Scheduled alert",
    requireInteraction: true
  });

  notification.onclick = function(){
    window.focus();
    parent.focus();
    // alert(notificationTitle);
  };
}

/**
 * Determines the time offset to a given hour / minute
 * @param {integer} hour - hour
 * @param {integer} minute - minute
 * @returns {integer} - number of milliseconds to a given hour / minute
 **/
function getTimeOffset(hour,minute){
  
  var hourMinuteDate = new Date();
  hourMinuteDate.setHours(hour);
  hourMinuteDate.setMinutes(minute);
  hourMinuteDate.setSeconds(0);
  hourMinuteDate.setMilliseconds(0);

  var timeTarget = hourMinuteDate.getTime();
  var timeNow = new Date().getTime();
  var offsetMilli = timeTarget - timeNow;
  return(offsetMilli);
}

/**
 *  Executes a function at a given hour minute (with optional arguments)
 *  @param {function} targetFn - function to execute
 *  @param {integer} hour - hour
 *  @param {integer} minute - minute
 *  @param {*} args - array of optional arguments for the target function
 *  @returns {void}
 **/
function executeAtHourMinute(targetFn, hour, minute, args){
  if( !args ){
    args = [];
  }

  var timeOffset = getTimeOffset(hour,minute);
  if( timeOffset <= 0 ){
    targetFn.apply(this, args);
  } else {
    setTimeout( function(){
      targetFn.apply(this, args);
    }, timeOffset );
  }
}
  
module.exports = {
  scheduleNotification: scheduleNotification,
  runNotification: runNotification,
  getTimeOffset: getTimeOffset,
  executeAtHourMinute: executeAtHourMinute
};