// // background.js

// // Function to handle URL changes
// function handleURLChange(details) {
//   // Check if the URL is within Gmail
//   // if (details.url.startsWith("https://mail.google.com/")) {
//   //   // Send the updated URL to the content script
//   //   chrome.scripting.executeScript({
//   //     target: { tabId: details.tabId },
//   //     function: sendUpdatedURL,
//   //     args: [details.url],
//   //   });
//   // }
//   console.log("URL : ",details.url);
// }

// // Function to send the updated URL to the content script
// function sendUpdatedURL(updatedURL) {
//   chrome.runtime.sendMessage({ updatedURL });
// }

// // Listen for page load (onCompleted) events
// chrome.webNavigation.onCompleted.addListener(handleURLChange);

// // Listen for URL changes (onHistoryStateUpdated) events
// chrome.webNavigation.onHistoryStateUpdated.addListener(handleURLChange);
