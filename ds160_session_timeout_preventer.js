// document.body.onload = function () {
//   if (typeof StopTimeoutClock === 'function') {
//     StopTimeoutClock();
//     console.log("Session timeout clock stopped");
//   }
// }

function currentTime() {
  const date = new Date();
  return date.getTime();
}

var lastActivityTime = currentTime();
function updateLastActivityTime(event) {
  lastActivityTime = currentTime();
}

// $(document.body).bind("keypress", function(e) {
//   updateLastActivityTime()
// });
document.addEventListener('keypress', updateLastActivityTime);
// document.addEventListener('mousemove', updateLastActivityTime);
// document.addEventListener('scroll', updateLastActivityTime);

function refreshPage() {
  window.location.reload(true);
}

function calculateIdleTime() {
  const idleTime = currentTime() - lastActivityTime;
  console.log(`Calculated idle time in milliseconds is ${idleTime}`);
  return idleTime;
}

function noActivitySinceLastFewMinutes() {
  const idleTime = calculateIdleTime();
  const acceptableIdleTime = 10000 * 5;
  return (idleTime > acceptableIdleTime);
}

function supressAlertAndClickButton(button) {
  button.click();
}

function refreshPageIfIdle() {
  console.log("Page will be refreshed if idle");

  try {
    if (noActivitySinceLastFewMinutes()) {
      // refreshPage();
      const saveButton = document.getElementsByClassName("save")[0];
      if (saveButton) {
        supressAlertAndClickButton(saveButton);
      }
    }

    const continueApplicationButton = document.getElementById("ctl00_btnContinueApp");
    if (continueApplicationButton) {
      supressAlertAndClickButton(continueApplicationButton);
    }

    setTimeout(refreshPageIfIdle, 1000);
  } catch (e) {
    console.log(e);
  }
}
setTimeout(refreshPageIfIdle, 1000);

console.log("Starting session timeout prevention");
