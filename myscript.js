function addModalDialogStyles(text_color, background_color) {
  const styleEl = document.createElement("style");
  styleEl.innerHTML = `
      .modal-dialog-top-left {
        position: absolute;
        top: 0;
        left: 0;
        margin: 0;
      }
  
      .modal-dialog-top-right {
        position: absolute;
        top: 0;
        right: 0;
        margin: 0;
      }
  
      .modal-dialog-bottom-left {
        position: absolute;
        bottom: 0;
        left: 0;
        margin: 0;
      }
  
      .modal-dialog-bottom-right {
        position: absolute;
        bottom: 0;
        right: 0;
        margin: 0;
      }

      .card {
        color: ${text_color};
        background: ${background_color};
      }
    `;
  document.head.appendChild(styleEl);
}

function loadResources() {
  // Load Bootstrap 5 CSS file
  const bootstrapStylesheet = document.createElement("link");
  bootstrapStylesheet.rel = "stylesheet";
  bootstrapStylesheet.href =
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css";
  bootstrapStylesheet.integrity =
    "sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ";
  bootstrapStylesheet.crossOrigin = "anonymous";
  document.head.appendChild(bootstrapStylesheet);

  // Load Font Awesome CSS file
  const fontAwesomeStylesheet = document.createElement("link");
  fontAwesomeStylesheet.rel = "stylesheet";
  fontAwesomeStylesheet.href =
    "https://use.fontawesome.com/releases/v5.7.0/css/all.css";
  document.head.appendChild(fontAwesomeStylesheet);

  // Load Bootstrap 5 JavaScript file
  const bootstrapScript = document.createElement("script");
  bootstrapScript.src =
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js";
  bootstrapScript.integrity =
    "sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe";
  bootstrapScript.crossOrigin = "anonymous";
  document.head.appendChild(bootstrapScript);
}

function createCookie(name, value, days) {
  if (!getCookie(name)) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    const cookieValue =
      encodeURIComponent(value) +
      "; expires=" +
      expires.toUTCString() +
      "; path=/";
    document.cookie = name + "=" + cookieValue;
  }
}

function getCookie(name) {
  const cookieName = name + "=";
  const cookieArray = document.cookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.sDubstring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }

  return null;
}

function showModal({
  heading,
  content,
  banner_position,
  weburl,
  border_radius,
  text_color,
  background_color,
}) {
  if (getCookie("qr-widget") != null) {
    // return;
  }
  createCookie("qr-widget", "created", 7);

  loadResources();
  addModalDialogStyles(text_color, background_color);
  // Create a new modal element
  const modalEl = document.createElement("div");
  modalEl.classList.add("modal", "fade", "show");
  modalEl.id = "exampleModal";
  modalEl.tabIndex = "-1";
  modalEl.setAttribute("aria-labelledby", "exampleModalLabel");
  modalEl.setAttribute("aria-hidden", "true");

  // Create the modal dialog element
  const dialogEl = document.createElement("div");
  dialogEl.classList.add("modal-dialog", "modal-sm", banner_position);
  dialogEl.id = "floating-modal";

  // Create the modal content element
  const contentEl = document.createElement("div");
  contentEl.classList.add("modal-body");

  // Create the card element
  const cardEl = document.createElement("div");
  cardEl.classList.add("card");
  cardEl.style.borderRadius = border_radius + "px";
  cardEl.style.padding = 10 + "px";

  // Create the card body element
  const cardBodyEl = document.createElement("div");
  cardBodyEl.classList.add("card-body");
  cardBodyEl.id = "image-after-this";

  // // Create the title element
  // const titleEl = document.createElement("h4");
  // titleEl.innerHTML =
  //   '<strong>Get <span id="percentage-value">' +
  //   percentage +
  //   "% </span> OFF using</strong>";

  var svgCode =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z"/></svg>';
  var parser = new DOMParser();
  var svgDoc = parser.parseFromString(svgCode, "image/svg+xml");
  var svgElement = svgDoc.documentElement;

  // Set width and height attributes
  svgElement.setAttribute("width", "18");
  svgElement.setAttribute("height", "18");
  svgElement.style.position = "absolute";
  svgElement.style.top = "22px";
  svgElement.style.right = "12px";
  svgElement.style.color = "#CCCCCC";

  // Create close X button
  const btnX = document.createElement("p");
  btnX.innerText = "X";
  btnX.id = "close-btn";
  btnX.style.marginLeft = "15px";
  btnX.style.borderRadius = "10px";
  btnX.style.position = "absolute";
  btnX.style.top = "10px";
  btnX.style.right = "10px";
  btnX.style.cursor = "pointer";

  const parentEl = document.createElement("div");
  parentEl.style.display = "flex";
  parentEl.style.alignItems = "center";

  // Create the subtitle element
  const subtitleEl = document.createElement("div");
  subtitleEl.innerHTML = heading;
  // 'The <span id="company-name-text">' +
  // company_name +
  // '</span> app for <span id="platefrom-name"></span>';

  parentEl.appendChild(subtitleEl);
  parentEl.appendChild(svgElement);

  // Create the description element
  const descriptionEl = document.createElement("span");
  // descriptionEl.classList.add('lead');
  descriptionEl.innerHTML = content;
  descriptionEl.style.marginTop = 10;
  // descriptionEl.style.marginBottom = "10px";
  var hrEl = document.createElement("hr");
  hrEl.style.margin = 0;

  // Append the elements to build the HTML structure
  cardBodyEl.appendChild(parentEl);
  cardBodyEl.appendChild(subtitleEl);
  cardBodyEl.appendChild(descriptionEl);
  cardEl.appendChild(cardBodyEl);
  contentEl.appendChild(cardEl);
  dialogEl.appendChild(contentEl);
  modalEl.appendChild(dialogEl);
  cardBodyEl.appendChild(hrEl);

  // Append the modal element to the body
  document.body.appendChild(modalEl);

  var plateform;

  // Check if the user is using Android
  if (navigator.userAgent.match(/Android/i)) {
    plateform = "Android";
  }
  // Check if the user is using iOS
  else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
    plateform = "iOS";
  }
  // Check if the user is using Windows
  else if (navigator.userAgent.match(/Windows/i)) {
    plateform = "Windows";
  }

  if (plateform) {
    // document.getElementById("platefrom-name").innerText = plateform;
  }

  // create the image element
  var img = document.createElement("img");

  // set the source of the image
  img.src =
    "https://chart.googleapis.com/chart?cht=qr&chl=" +
    weburl +
    "&chs=160x160&chld=L|0";
  img.classList.add("qr-code", "img-thumbnail", "img-responsive");
  img.style.border = "none";

  // find the div element to insert the image after
  var targetDiv = document.getElementById("image-after-this");

  // insert the image element after the target div
  targetDiv.parentNode.insertBefore(img, targetDiv.nextSibling);

  // Display the modal
  modalEl.style.display = "block";

  // Hide the modal when the user clicks outside of it
  window.addEventListener("click", function (event) {
    if (event.target === modalEl) {
      modalEl.style.display = "none";
    }
  });
}
