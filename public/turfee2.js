// Get the div element
// var element = document.querySelector('.inner_thing .page_cont .u');
// const pageContImg = document.querySelector('.page_cont #iji');

// const images = [
//     "/images/basketball-147794_1280.png",
//     "/images/Badminton-Shuttlecock-Download-Transparent-PNG-Image.png",
//     "/images/cricket-ball-png-28881.png",
//     "/images/football-png-24994.png",
//     "/images/tennis-ball-307846_1280.png",
//     "/images/vecteezy_ai-generated-volleyball-ball-isolated-on-transparent-background_35320507.png",
//     "/images/Badminton-Shuttlecock-Download-Transparent-PNG-Image.png",
// ];

// let index = 0;

// setInterval(function() {
//   element.id = 'new-id';
//   pageContImg.src = images[index];
//   index = (index + 1) % images.length;
//   setTimeout(function() {
//     element.removeAttribute('id');
//   }, 3000);
// }, 6000);  




// const val = document.getElementById('user_data');
// const butt = document.querySelector('.btn-active');  
// const butt2 = document.querySelector('.btn2');        
// const join = document.querySelector('.out_chatroom .chatroom .icchat .chat');         
// const invite = document.querySelector('.out_chatroom .chatroom .icchat .invite');     

// butt.addEventListener("click", function() {
//   invite.style.display =flex;
//   join.style.display =none;
// });

// butt2.addEventListener("click", function() {
//   invite.style.display =none;
//   join.style.display =flex;
//   join.classList.add('active');

// });

// document.querySelector('.invite').addEventListener('click', function(){
//   this.classList.add('active'); 
// });

// document.querySelector('.chat').addEventListener('click', function(){
//   this.classList.add('active'); 
// });






const joinBtn = document.querySelector('.btn-active');  
const createBtn = document.querySelector('.btn2');     

const frame = document.getElementById('frame');          
const frame2 = document.getElementById('frame2');        

const chat = document.querySelector('.chatroom .icchat .chat'); 
const invite = document.querySelector('.chatroom .icchat .invite');

joinBtn.addEventListener("click", () => {
  invite.style.display = `flex`;
  chat.style.display = `none`;

  frame2.style.display = `flex`;
  frame.style.display = `none`;
});

createBtn.addEventListener("click", () => {
  invite.style.display = `none`;
  chat.style.display = `flex`;
  chat.classList.add('active');

  frame2.style.display = `none`;
  frame.style.display = `grid`; 
});






// val.addEventListener('click', function() {
//     val.hidden = true;
// });

// myDiv.addEventListener('click', function() {
//     var expData = this.closest('.exp_data');
//     var intData = expData.querySelector('.int_data');
    
//     // Toggle the visibility of .int_data
//     intData.classList.toggle('visible');
//     this.classList.toggle('int_data-visible');
// });



// document.addEventListener('DOMContentLoaded', function() {
//   // Get the necessary elements
//   const msgChatInput = document.querySelector('#msgchat');
//   const sendButton = document.querySelector('#send');
//   const frame = document.querySelector('#frame');
//   const entryFrame = document.querySelector('#entrytemp');
//   const createButton = document.querySelector('#c');

//   // Function to handle sending messages
//   function handleSendMessage() {
   
//     const message = msgChatInput.value.trim();

//     if (message) {
//       entryFrame.style.display = `none`;
//       const messageElement = document.createElement('div');
//       messageElement.className = 'user-message';
//       messageElement.innerHTML = `
//       <div style="
//         display: flex;
//         justify-content: flex-start;
//         width: 100%;
//         margin: 5px 0;
//         height:fit-content;
//       ">
//         <div style="
//           font-family: 'Oxanium', sans-serif;
//           height:40px;
//           max-height:fit-content
//           min-width: 100px;
//           max-width: 70%;
//           padding: 10px 15px;
//           color: white;
//           background-color: red;
//           font-size: 1.5rem;
//           border-radius: 10px;
//           text-align: left;
//           word-wrap: break-word;
//         ">
//           ${message}
//         </div>
//       </div>
//     `;
    

//       if (frame) frame.appendChild(messageElement);

//       if (msgChatInput) msgChatInput.value = '';
//     }
//   }

//   // Event listeners
//   if (sendButton) {
   
//     sendButton.addEventListener('click', handleSendMessage);

//   }

//   if (msgChatInput) {
//     msgChatInput.addEventListener('keypress', function(e) {
//       if (e.key === 'Enter') {
//         handleSendMessage();
//         entryFrame.style.display = `none`;
//       }
//     });
//   }

//   if (createButton) {
//     createButton.addEventListener('click', function() {
//       if (msgChatInput) msgChatInput.hidden = false;
//       if (sendButton) sendButton.hidden = false;
//       this.hidden = true;
//     });
//   }
// });


// ---------------------------------------------------------------------------------------------------

// document.addEventListener('DOMContentLoaded', function () {
//   const socket = io(); // Initialize socket connection

//   const msgChatInput = document.querySelector('#msgchat');
//   const sendButton = document.querySelector('#send');
//   const frame = document.querySelector('#frame');
//   const entryFrame = document.querySelector('#entrytemp');
//   const createButton = document.querySelector('#c');

//   // Function to append message to chat
//   function appendMessage(message, from = 'user') {
//     const alignment = from === 'user' ? 'flex-end' : 'flex-start';
//     const bgColor = from === 'user' ? '#ff4c4c' : '#444';

//     const messageElement = document.createElement('div');
//     messageElement.className = 'user-message';
//     messageElement.innerHTML = `
//       <div style="
//         display: flex;
//         justify-content: ${alignment};
//         width: 100%;
//         margin: 5px 0;
//         height: fit-content;
//       ">
//         <div style="
//           font-family: 'Oxanium', sans-serif;
//           min-width: 100px;
//           max-width: 70%;
//           padding: 10px 15px;
//           color: white;
//           background-color: ${bgColor};
//           font-size: 1.5rem;
//           border-radius: 10px;
//           word-wrap: break-word;
//         ">
//           ${message}
//         </div>
//       </div>
//     `;
//     frame.appendChild(messageElement);
//     frame.scrollTop = frame.scrollHeight; // Scroll to the latest message
//   }

//   // Function to handle sending the message
//   function handleSendMessage() {
//     const message = msgChatInput.value.trim();
//     if (message) {
//       socket.emit('chat message', message); // Send the message to the server
//       appendMessage(message, 'user');       // Show the message locally
//       msgChatInput.value = ''; // Clear input
//       entryFrame.style.display = 'none'; // Hide entry frame
//     }
//   }

//   // Listen for incoming chat messages
//   socket.on('chat message', function (msg) {
//     appendMessage(msg, 'other'); // Append the message from another user
//   });

//   // Event listeners for sending messages
//   if (sendButton) {
//     sendButton.addEventListener('click', handleSendMessage); // Send message on button click
//   }

//   if (msgChatInput) {
//     msgChatInput.addEventListener('keypress', function (e) {
//       if (e.key === 'Enter') handleSendMessage(); // Send message on pressing Enter key
//     });
//   }

//   // Show input fields when 'Create' button is clicked
//   if (createButton) {
//     createButton.addEventListener('click', function () {
//       msgChatInput.hidden = false; // Show the input field
//       sendButton.hidden = false;   // Show the send button
//       this.hidden = true;          // Hide the 'Create' button
//     });
//   }
// });




document.addEventListener('DOMContentLoaded', function () {
  const socket = io(); // Initialize socket connection

  const msgChatInput = document.querySelector('#msgchat');
  const sendButton = document.querySelector('#send');
  const frame = document.querySelector('#frame');
  const entryFrame = document.querySelector('#entrytemp');
  const createButton = document.querySelector('#c');

  // Function to append message to chat
  function appendMessage(message, from = 'user') {
    const alignment = from === 'user' ? 'flex-end' : 'flex-start';
    const bgColor = from === 'user' ? '#ff4c4c' : '#444';

    const messageElement = document.createElement('div');
    messageElement.className = 'user-message';
    messageElement.innerHTML = `
      <div style="
        display: flex;
        justify-content: ${alignment};
        width: 100%;
        margin: 5px 0;
        height: fit-content;
      ">
        <div style="
          font-family: 'Oxanium', sans-serif;
          min-width: 100px;
          max-width: 70%;
          padding: 10px 15px;
          color: white;
          background-color: ${bgColor};
          font-size: 1.5rem;
          border-radius: 10px;
          word-wrap: break-word;
        ">
          ${message}
        </div>
      </div>
    `;
    frame.appendChild(messageElement);
    frame.scrollTop = frame.scrollHeight; // Scroll to the latest message
  }

  // Function to handle sending the message
  function handleSendMessage() {
    const message = msgChatInput.value.trim();
    if (message) {
      socket.emit('chat message', message); // Send the message to the server
      appendMessage(message, 'user');       // Show the message locally
      msgChatInput.value = ''; // Clear input
      entryFrame.style.display = 'none'; // Hide entry frame
    }
  }

  // Listen for chat history when the user first connects
  socket.on('chat history', function (history) {
    history.forEach((msg) => {
      appendMessage(msg, 'other');
    });
  });

  // Listen for incoming chat messages
  socket.on('chat message', function (msg) {
    appendMessage(msg, 'other'); // Append the message from another user
  });

  // Event listeners for sending messages
  if (sendButton) {
    sendButton.addEventListener('click', handleSendMessage); // Send message on button click
  }

  if (msgChatInput) {
    msgChatInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') handleSendMessage(); // Send message on pressing Enter key
    });
  }

  // Show input fields when 'Create' button is clicked
  if (createButton) {
    createButton.addEventListener('click', function () {
      msgChatInput.hidden = false; // Show the input field
      sendButton.hidden = false;   // Show the send button
      this.hidden = true;          // Hide the 'Create' button
    });
  }
});




