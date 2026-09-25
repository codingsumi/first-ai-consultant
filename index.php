<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Health Universe</title>
  <link rel="stylesheet" href="css/styles.css?=<?php echo time() ?>">
  <script src="js/script.js" defer></script>
</head>

<body>
  <main class="onetouch-chatbot-wrapper">
    <div class="onetouch-chatbot-container">
      <div class="onetouch-chatbot-body" id="message-area">

      </div>
      <div class="onetouch-chatbot-footer">
        <div class="onetouch-chatbot-intro" id="chatbot-intro">
          <div class="avatar">
            <img src="./images/doctor.png" />
          </div>

          <p>
            Hi, I’m your trusted navigator here at Health Universe. I’m
            designed for healthcare professionals, and I will not retain data
            from any session you have with me. How can I assist you today?

          </p>
        </div>

        <!-- <div class="loader" id="loader"></div> <br> -->
        <div class="onetouch-textarea-wrapper">
          <textarea placeholder="Type a message..." rows="3" id="inputField" autofocus></textarea>

          <button id="recordButton">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M11.9998 3C10.3429 3 8.99976 4.34315 8.99976 6V10C8.99976 11.6569 10.3429 13 11.9998 13C13.6566 13 14.9998 11.6569 14.9998 10V6C14.9998 4.34315 13.6566 3 11.9998 3ZM11.9998 1C14.7612 1 16.9998 3.23858 16.9998 6V10C16.9998 12.7614 14.7612 15 11.9998 15C9.23833 15 6.99976 12.7614 6.99976 10V6C6.99976 3.23858 9.23833 1 11.9998 1ZM3.05469 11H5.07065C5.55588 14.3923 8.47329 17 11.9998 17C15.5262 17 18.4436 14.3923 18.9289 11H20.9448C20.4837 15.1716 17.1714 18.4839 12.9998 18.9451V23H10.9998V18.9451C6.82814 18.4839 3.51584 15.1716 3.05469 11Z">
              </path>
            </svg>
          </button>

          <button id="submitButton">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M3.5 1.34558C3.58425 1.34558 3.66714 1.36687 3.74096 1.40747L22.2034 11.5618C22.4454 11.6949 22.5337 11.9989 22.4006 12.2409C22.3549 12.324 22.2865 12.3924 22.2034 12.4381L3.74096 22.5924C3.499 22.7255 3.19497 22.6372 3.06189 22.3953C3.02129 22.3214 3 22.2386 3 22.1543V1.84558C3 1.56944 3.22386 1.34558 3.5 1.34558ZM5 4.38249V10.9999H10V12.9999H5V19.6174L18.8499 11.9999L5 4.38249Z">
              </path>
            </svg>
          </button>

        </div>
        <audio id="audioPlayback" controls style="display: none;"></audio>
        <div class="onetouch-footer-bottom">
          <p>
            Start by exploring some examples below.<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
              fill="currentColor">
              <path
                d="M5.46257 4.43262C7.21556 2.91688 9.5007 2 12 2C17.5228 2 22 6.47715 22 12C22 14.1361 21.3302 16.1158 20.1892 17.7406L17 12H20C20 7.58172 16.4183 4 12 4C9.84982 4 7.89777 4.84827 6.46023 6.22842L5.46257 4.43262ZM18.5374 19.5674C16.7844 21.0831 14.4993 22 12 22C6.47715 22 2 17.5228 2 12C2 9.86386 2.66979 7.88416 3.8108 6.25944L7 12H4C4 16.4183 7.58172 20 12 20C14.1502 20 16.1022 19.1517 17.5398 17.7716L18.5374 19.5674Z">
              </path>
            </svg>
          </p>
          <ul class="onetouch-suggestion-list">
            <li>Search PubMed for a Research Topic</li>
            <li>I have a disease state question</li>
            <li>I have a therapeutic dilemma</li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</body>

</html>