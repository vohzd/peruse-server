function init() {
  console.log("time to fuck up your life");
  detectProfile();
  bindListeners();
}

async function sendPostReq(url, data) {
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}

function detectProfile() {
  // we're going to create a new profile
  console.log(window);
}

async function invade() {
  // kindly send that to the mothership
  try {
    const data = await sendPostReq("http://localhost:1337/listen", {
      user: "hello"
    });
    console.log(JSON.stringify(data)); // JSON-string from `response.json()` call
  } catch (err) {
    console.error(err);
  }
}

function bindListeners() {
  /* 
    useful
  */
  window.onclick = () => {
    console.log("onclick");
    invade();
  };
  window.onwheel = () => {
    console.log("onwheel");
  };
  window.ondblclick = () => {
    console.log("ondblclick");
  };

  /* 
    not seen these fired yet
  */
  window.onpopstate = () => {
    console.log("onpopstate");
  };
  window.addEventListener("popstate", function(e) {
    console.log("onpopstate2");

    // e.state is equal to the data-attribute of the last image we clicked
  });
  window.onhashchange = () => {
    console.log("onhashchange");
  };
  window.oncuechange = () => {
    console.log("oncuechange");
  };
  window.onchange = () => {
    console.log("onchange");
  };
  window.onhashchange = () => {
    console.log("onhashchange");
  };
  window.onkeydown = () => {
    console.log("onkeydown");
  };
  window.onloadeddata = () => {
    console.log("onloadeddata");
  };
  window.onloadedmetadata = () => {
    console.log("onloadedmetadata");
  };
  window.onloadend = () => {
    console.log("onloadend");
  };
  window.onloadstart = () => {
    console.log("onloadstart");
  };
  window.onselect = () => {
    console.log("onselect");
  };
  window.onsubmit = () => {
    console.log("onsubmit");
  };
}

init();
