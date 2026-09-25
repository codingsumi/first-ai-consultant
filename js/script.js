document.addEventListener('DOMContentLoaded', function () {

  // Define variables for audio recording
  let mediaRecorder;
  let audioChunks = [];
  let isRecording = false;
  let isSpeaking = false;

  // For voice recognition
  let recognition;
  let isRecognizing = false;

  const inputField = document.getElementById('inputField');
  const submitButton = document.getElementById('submitButton');
  const chatbotIntro = document.getElementById('chatbot-intro');
  const messageArea = document.getElementById('message-area');
  // const loader = document.getElementById('loader'); loader.style.visibility = "hidden";
  const suggestionList = document.querySelector('.onetouch-suggestion-list');
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  // audio
  const recordButton = document.getElementById('recordButton');
  const svgPath = recordButton.querySelector('svg path');


  const toastContainer = document.createElement('div');
  toastContainer.className = 'toast-notification';
  document.body.appendChild(toastContainer);

  // Initialize recording setup
  setupRecording();
  setupVoiceRecognition();


  // Start recording on button press
  recordButton.addEventListener('mousedown', function () {
    if (!SpeechRecognition) {
      show_toastr_notifications('Your browser does not support speech recognition. Please choose another browser for better experience.', 5000);
      return;
    }
    checkMicrophoneAccess()
      .then(() => {
        if (!isRecording && mediaRecorder && mediaRecorder.state === 'inactive') {
          audioChunks = [];
          mediaRecorder.start();
          isRecording = true;
          svgPath.style.fill = 'red';
          recordButton.style.transform = 'scale(1.1)';

          if (recognition && !isRecognizing) {
            recognition.start();
            isRecognizing = true;
          }
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  });

  // Stop recording when button is released
  recordButton.addEventListener('mouseup', function () {
    if (isRecording && mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      isRecording = false;
      svgPath.style.fill = '';
      recordButton.style.transform = '';

      if (recognition && isRecognizing) {
        recognition.stop();
        isRecognizing = false;
      }

    }
  });

  // click enter to send
  inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendUserInputToAi();
    }

    submitButton.addEventListener('click', sendUserInputToAi);

  });

  const sendUserInputToAi = () => {
    const userInput = inputField.value.trim();
    inputField.value = '';

    if (!userInput) return;

    chatbotIntro.style.display = "none";
    messageArea.innerHTML += userTpl(userInput);

    const chatbotBody = document.querySelector('.onetouch-chatbot-body');
    const newHeight = window.innerHeight - 250 + 'px';
    chatbotBody.style.height = newHeight;

    messageArea.scrollTo({
      top: messageArea.scrollHeight,
      behavior: 'smooth'
    });

    // loader.style.visibility = "visible";

    const messageId = 'msg-' + Date.now();
    const messageHtml = `
        <div class="onetouch-chatbot-mesage bot-message">
            <div class="onetouch-chatbot-message-profile">
                <div class="avatar">
                    <img src="./images/doctor.png" />
                </div>
            </div>
            <div class="onetouch-chatbot-message-box">
                <div class="onetouch-innercontent-box" id="${messageId}">
                    <div class="typing-indicator">
                        <div class="typing-dots">
                            <span class="shimmer">Analyzing your data, please wait</span>
                        </div>
                    </div>
                </div>
                
                <span class="time">
                <small id="${messageId}-time"></small>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="speaker-icon" onclick="speakMessage('${messageId}')">
                      <path d="M6.60282 10.0001L10 7.22056V16.7796L6.60282 14.0001H3V10.0001H6.60282ZM2 16.0001H5.88889L11.1834 20.3319C11.2727 20.405 11.3846 20.4449 11.5 20.4449C11.7761 20.4449 12 20.2211 12 19.9449V4.05519C12 3.93977 11.9601 3.8279 11.887 3.73857C11.7121 3.52485 11.3971 3.49335 11.1834 3.66821L5.88889 8.00007H2C1.44772 8.00007 1 8.44778 1 9.00007V15.0001C1 15.5524 1.44772 16.0001 2 16.0001ZM23 12C23 15.292 21.5539 18.2463 19.2622 20.2622L17.8445 18.8444C19.7758 17.1937 21 14.7398 21 12C21 9.26016 19.7758 6.80629 17.8445 5.15557L19.2622 3.73779C21.5539 5.75368 23 8.70795 23 12ZM18 12C18 10.0883 17.106 8.38548 15.7133 7.28673L14.2842 8.71584C15.3213 9.43855 16 10.64 16 12C16 13.36 15.3213 14.5614 14.2842 15.2841L15.7133 16.7132C17.106 15.6145 18 13.9116 18 12Z"></path>
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="copy-icon" onclick="copyMessageToClipboard('${messageId}')">
                      <path d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z"></path>
                    </svg>
                  </span>
                </span>

            </div>
        </div>`;
    messageArea.innerHTML += messageHtml;

    const messageBox = document.getElementById(messageId);
    const timeSpan = document.getElementById(`${messageId}-time`);

    const sse = new EventSource(`routes.php?action=processInput&input=${encodeURIComponent(userInput)}`);

    let fullResponse = '';

    sse.addEventListener('start', (e) => {
      console.log('Stream started:', e.data);
    });

    sse.addEventListener('chunk', (e) => {
      const chunk = JSON.parse(e.data);
      fullResponse += chunk;
      messageBox.innerHTML = cleanResponse(fullResponse);
      timeSpan.innerHTML = getCurrentDateTime();

      messageArea.scrollTo({
        top: messageArea.scrollHeight,
        behavior: 'smooth'
      });
    });

    sse.addEventListener('complete', (e) => {
      console.log('Stream complete:', e.data);
      // loader.style.visibility = "hidden";
      sse.close();
    });

    sse.addEventListener('error', (e) => {
      const error = JSON.parse(e.data);
      console.error('Stream error:', error);
      messageBox.innerHTML = `<div class="error">Error: ${error}</div>`;
      // loader.style.visibility = "hidden";
      sse.close();
    });

    sse.onerror = (e) => {
      console.error('EventSource failed:', e);
      messageBox.innerHTML = '<div class="error">Connection error occurred</div>';
      // loader.style.visibility = "hidden";
      sse.close();
    };
  };

  // Request microphone access
  async function setupRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    // Handle the recorded audio data
    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };
  }

  // checking_if_audio_is_available,conert_into_text_and_put_into_message_box
  function setupVoiceRecognition() {
    try {
      recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = true;
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        // const transcript = event.results[0][0].transcript;
        // inputField.value += ` ${transcript}`;
        const speechToText = Array.from(event.results).map(result => result[0].transcript).join('');
        console.log(speechToText);

        inputField.value = speechToText;
      };

      recognition.onerror = (event) => {
        console.error('Speech Recognition Error:', event.error);
      };

      // recognition.onend = () => {
      //   isRecognizing = false;
      // };
    } catch (error) {
      console.error('Speech Recognition not supported in this browser:', error);
      alert('Your browser does not support Speech Recognition.');
    }
  }

  // user query format
  function userTpl(msg) {
    var html = `
                <div class="onetouch-chatbot-mesage user-message" id="user-message">
                    <div class="onetouch-chatbot-message-box">
                      <div class="onetouch-innercontent-box">
                      <p>${msg}</p>
                      </div>
                      <small class="time">${getCurrentDateTime()}</small>
                    </div>
                    <div class="onetouch-chatbot-message-profile">
                      <img src="./images/profile.png"/>
                    </div>
                </div>`;

    return html;
  }


  // AI response formatting
  function aiResTpl(msg) {
    const messageId = 'msg-' + Date.now();
    var html = `
                <div class="onetouch-chatbot-mesage bot-message">
                    <div class="onetouch-chatbot-message-profile">
                      <div class="avatar">
                        <img src="./images/doctor.png" />
                      </div>
                    </div>
                    <div class="onetouch-chatbot-message-box">
                    <div class="onetouch-innercontent-box" id="${messageId}">
                        ${cleanResponse(msg)}
                    </div>
                      <span class="time"
                        >${getCurrentDateTime()}
                        <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="speaker-icon"
                          onclick="speakMessage('${messageId}')"
                        >
                          <path
                            d="M6.60282 10.0001L10 7.22056V16.7796L6.60282 14.0001H3V10.0001H6.60282ZM2 16.0001H5.88889L11.1834 20.3319C11.2727 20.405 11.3846 20.4449 11.5 20.4449C11.7761 20.4449 12 20.2211 12 19.9449V4.05519C12 3.93977 11.9601 3.8279 11.887 3.73857C11.7121 3.52485 11.3971 3.49335 11.1834 3.66821L5.88889 8.00007H2C1.44772 8.00007 1 8.44778 1 9.00007V15.0001C1 15.5524 1.44772 16.0001 2 16.0001ZM23 12C23 15.292 21.5539 18.2463 19.2622 20.2622L17.8445 18.8444C19.7758 17.1937 21 14.7398 21 12C21 9.26016 19.7758 6.80629 17.8445 5.15557L19.2622 3.73779C21.5539 5.75368 23 8.70795 23 12ZM18 12C18 10.0883 17.106 8.38548 15.7133 7.28673L14.2842 8.71584C15.3213 9.43855 16 10.64 16 12C16 13.36 15.3213 14.5614 14.2842 15.2841L15.7133 16.7132C17.106 15.6145 18 13.9116 18 12Z"
                          ></path></svg>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="copy-icon"
                          onclick="copyMessageToClipboard('${messageId}')"
                        >
                          <path
                            d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z"
                          ></path></svg></span>
                          </span>
                    </div>
                  </div>`;

    return html;
  }


  // HELPER_FUNCTIONS

  // clear_html_type_response
  function cleanResponse(response) {
    if (response.startsWith("```html")) {
      return response.replace(/```html\n|```/g, "").trim();
    }
    return response.trim();
  }


  // remove_html_tags
  function stripHtmlTags(htmlString) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    return (tempDiv.textContent || tempDiv.innerText || '').replace(/\n/g, '');
  }


  // before_recording_check_microphone_is_connected
  function checkMicrophoneAccess() {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices.enumerateDevices()
        .then(devices => {
          const microphone = devices.find(device => device.kind === 'audioinput');
          if (microphone) {
            resolve();
          } else {
            reject(new Error('Unable to access microphone.'));
          }
        })
        .catch(err => reject(new Error('Unable to access microphone.')));
    });
  }


  // text_to_speech
  window.speakMessage = function (messageId) {
    const messageElement = document.getElementById(messageId);
    if (!messageElement) return;

    const textToSpeech = messageElement.innerText || messageElement.textContent;

    const utterance = new SpeechSynthesisUtterance(textToSpeech);
    const speakerIcon = messageElement.parentElement.querySelector('.speaker-icon');

    if (speakerIcon) {
      utterance.lang = 'en-US';
      utterance.rate = 1;
      utterance.pitch = 1;

      utterance.onstart = () => {
        isSpeaking = true;
        speakerIcon.style.color = 'red';
      }

      utterance.onend = () => {
        isSpeaking = false;
        speakerIcon.style.color = '';
      }

      if (isSpeaking) {
        speechSynthesis.cancel();
        isSpeaking = false;
        speakerIcon.style.color = '';
      } else {
        try {
          speechSynthesis.speak(utterance);
        } catch (err) {
          console.error('Failed to speak content: ', error);
          show_toastr_notifications('Failed to speak content', 2000);
        }
      }



    }
  }


  // copy_message_to_clipboard
  window.copyMessageToClipboard = function (messageId) {
    const messageElement = document.getElementById(messageId);
    if (!messageElement) return;

    const textToCopy = messageElement.innerText || messageElement.textContent;

    navigator.clipboard.writeText(textToCopy).then(() => {
      const copyIcon = document.querySelector(`#${messageId}`).parentElement.querySelector('.copy-icon');
      if (copyIcon) {
        copyIcon.style.fill = '#4CAF50';
        setTimeout(() => {
          copyIcon.style.fill = 'currentColor';
        }, 1000);
      }

      show_toastr_notifications('Copied to clipboard', 2000);

    }).catch(err => {
      console.error('Failed to copy text: ', err);
      show_toastr_notifications('Failed to copy text', 2000);

    });
  };

  // show_toastr_notifications
  function show_toastr_notifications(message, timeOut) {
    toastContainer.textContent = message;
    toastContainer.classList.add('show');

    setTimeout(() => {
      toastContainer.classList.remove('show');
    }, timeOut);
  }


  // Select Suggestion List
  if (suggestionList) {
    suggestionList.addEventListener('click', function (e) {
      if (e.target.tagName === 'LI') {
        inputField.value = e.target.textContent;
        inputField.focus();
      }
    });
  }

  function getCurrentDateTime() {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    });

    return formattedDate;
  }

  // HELPER_FUNCTIONS

});