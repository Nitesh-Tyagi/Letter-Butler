// import fetch from "node-fetch";

let lastURL = "";
var s = "";
const labels = [ "Urgent", "Excited", "Payment", "Billing", "Tech", "Legal", "News", "Inform", "Request", "Complain" ]
const API_TOKEN = "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";

// STANDARD FETCH LABEL HANDLER
async function fetchLabels(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/facebook/bart-large-mnli",
        {
            headers: { Authorization: `Bearer ${API_TOKEN}` },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}

// FUNCTION CONVERT LABELS
async function getLabels(s) {
  const res = [];
  await fetchLabels({inputs: s, parameters: {candidate_labels: labels}}).then((response) => {
      const lab = response.labels;
      const sco = response.scores;
      
      if(lab){
        for(let i=0;i<lab.length;i++){
          if(sco[i]>=0.1){
            const obj = {
              label : lab[i],
              score : sco[i]
            }
            res.push(obj);
          }  
        }
      }
  });
  return res;
}

// STANDARD FETCH SUMMARY HANDLER
async function fetchSummary(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
        {
            headers: { Authorization: `Bearer ${API_TOKEN}` },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}

// FUNCTION CONVERT SUMMARY
async function getSummary(s) {
  let res = "";
  await fetchSummary({inputs: s}).then((response) => {
      res = response[0].summary_text;
  });
  return res;
}

async function display(lab,sum) {
  const o = document.getElementsByClassName("hP");

  const labEl = document.createElement("div");
  labEl.style.display = "flex"; // Use flexbox to align the child divs horizontally
  labEl.style.gap = "10px"; // Add some space between the child divs

  for (let i = 0; i < lab.length; i++) {
    const d = document.createElement("div");
    d.innerText = lab[i].label;

    // Add styles to the child divs
    d.style.padding = "5px";
    d.style.border = "1px solid #ccc";
    d.style.borderRadius = "5px"; // Add a bit of curved radius border

    labEl.appendChild(d);
  }

  o[0].appendChild(labEl);

  // Add styles to the parent div (labEl)
  labEl.style.fontSize = "16px";
  labEl.style.color = "#696969";
  labEl.style.padding = "10px";
  labEl.style.margin = "5px 0px";
  labEl.style.border = "1.5px solid #696969";
  labEl.style.borderRadius = "8px";


  const sumEl = document.createElement("div");
  sumEl.innerText = sum;

  sumEl.style.fontSize = "16px";  // Set the text size
  sumEl.style.color = "grey";    // Set the text color to greyish
  sumEl.style.padding = "10px";  // Add padding
  sumEl.style.margin = "5px 0px";
  sumEl.style.border = "1.5px solid #696969"; // Add a 1px grey border
  sumEl.style.borderRadius = "8px";

  o[0].appendChild(sumEl);

  console.log("LABELS : ",lab);
  console.log("SUMMARY : ", sum);
}

// FUNCTION HANDLE ASYNC
async function handleAsync(s) {
  let lab;
  await getLabels(s).then((response) => { lab = response; });

  let sum;
  await getSummary(s).then((response) => { sum = response; });

  display(lab,sum);
}

// FUNCTION GET INNER TEXT BY RECURSION
function innerTextRecursive(element) {
  if (element && element.innerText) {
    s += element.innerText;
  }
  if (element && element.children) {
    innerTextRecursive(element.children[0]);
  }
}

// FUNCTION CHECK FOR PRESENCE OF { .hP AND .ads AND URL.len>60 }
function checkConditions() {
  const h = document.getElementsByClassName("hP");
  const d = document.getElementsByClassName("ads");

  if (h.length > 0 && d.length > 0) {
    const currentURL = window.location.href;
    
    if (currentURL !== lastURL && currentURL.length>60) {
      console.log("URL: " + currentURL);

      s = "";
      s += "SUBJECT : " + h[0].innerText + "\n\nBODY : \n";
      
      innerTextRecursive(d[0]);
      
      lastURL = currentURL;

      handleAsync(s);
    }
  }
}

// LISTEN FOR DOM CONTENT LOAD
document.addEventListener("DOMContentLoaded", checkConditions);

// LISTEN FOR DOM MUTATION
const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    checkConditions();
  });
});

// START DOM OBSERVATION
observer.observe(document.body, {
  subtree: true,  // WATCH FOR CHANGES IN { entire DOM subtree }
  childList: true, // WATCH FOR CHANGES IN { child elements }
});
