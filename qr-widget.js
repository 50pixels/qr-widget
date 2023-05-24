function addModalDialogStyles(border_radius, text_color, background_color) {
  const styleEl = document.createElement("style");
  styleEl.innerHTML = `
    .top-left {
        position: fixed;
        top: 30px;
        left: 30px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        width: 306px;
        height: 534px;
      }
  
      .top-right {
        position: fixed;
        top: 30px;
        right: 30px;
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        width: 306px;
        height: 534px;
      }
  
      .bottom-left {
        position: fixed;
        bottom: 30px;
        left: 30px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
        width: 306px;
        height: 534px;
      }
  
      .bottom-right {
        position: fixed;
        bottom: 30px;
        right: 30px;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        width: 306px;
        height: 534px;
      }
  
  
      @keyframes fadeOut {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }

      .modal {
        position: relative;
        background: #FFFFFF;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
        border-radius: 10px;
        width: 100%;
        height: 100%;
        
    }
    
    .fade-out {
        animation-name: fadeOut;
        animation-duration: 0.5s;
        animation-timing-function: ease-out;
        animation-fill-mode: forwards;
      }     
  
      #myModal {
        position: absolute;
        width: 306px;
        height: 475px;
        left: 0px;
        top: 0px;
        background: ${background_color};
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
        border-radius: ${border_radius}px;
        display: block;
      }
  
      .modal-content {
        padding: 20px;
      }
  
      .close {
        font-size: 26px;
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
      }
  
      .qr-code-section {
        position: absolute;
        width: 252px;
        height: 69px;
        left: 30px;
        top: 116px;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 145%;
        color: ${text_color};
      }
  
      .qr-code-image {
        max-width: 100%;
        height: auto;
      }
  
      .qr-code-text {
        margin-top: 0;
      }
  
      .discount-section {
        position: absolute;
        height: 56px;
        left: 30px;
        top: 30px;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 24px;
        color: ${text_color};
      }
  
      .discount-text {
        margin: 0;
      }
      `;
  document.head.appendChild(styleEl);
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

  addModalDialogStyles(border_radius, text_color, background_color);
  // Create the parent container
  const modalContainer = document.createElement("div");
  modalContainer.classList.add(banner_position);

  // Create the modal
  const modal = document.createElement("div");
  modal.id = "myModal";
  modal.classList.add("modal");

  // Create the modal content
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  // Create the close button
  const closeButton = document.createElement("span");
  closeButton.classList.add("close");
  closeButton.innerHTML = "&times;";

  // Close the modal
  closeButton.onclick = function () {
    document.getElementsByClassName("modal")[0].classList.add("fade-out");
    setTimeout(() => {
      document.getElementById("myModal").style.display = "none";
    }, 500);
  };
  // Create the discount section
  const discountSection = document.createElement("div");
  discountSection.classList.add("discount-section");

  // Create the discount text
  const discountText = document.createElement("p");
  discountText.classList.add("discount-text");
  discountText.innerHTML = heading;

  // Create the QR code section
  const qrCodeSection = document.createElement("div");
  qrCodeSection.classList.add("qr-code-section");

  // Create the QR code text
  const qrCodeText = document.createElement("p");
  qrCodeText.classList.add("qr-code-text");
  qrCodeText.innerHTML = content;

  // Create the horizontal line
  const hr = document.createElement("hr");

  // Create the QR code image
  const qrCodeImage = document.createElement("img");
  qrCodeImage.src =
    "https://chart.googleapis.com/chart?cht=qr&chl=" +
    weburl +
    "&chs=266x266&chld=L|0";
  qrCodeImage.alt = "QR Code";
  qrCodeImage.classList.add("qr-code-image");

  // Append the elements to their respective parents
  discountSection.appendChild(discountText);
  qrCodeSection.appendChild(qrCodeText);
  qrCodeSection.appendChild(hr);
  qrCodeSection.appendChild(qrCodeImage);
  modalContent.appendChild(closeButton);
  modalContent.appendChild(discountSection);
  modalContent.appendChild(qrCodeSection);
  modal.appendChild(modalContent);
  modalContainer.appendChild(modal);

  // Append the modalContainer to the body or any other desired parent element
  document.body.appendChild(modalContainer);
}
