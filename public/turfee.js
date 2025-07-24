
const myDiv = document.getElementById('toggle');

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

  frame2.style.display = `none`;
  frame.style.display = `grid`; 
});

document.querySelector('.chat').addEventListener('click', function(){
  this.classList.add('active'); 
});


myDiv.addEventListener('click', function() {
    myDiv.classList.toggle('visible');
  });


// document.addEventListener('DOMContentLoaded', function () {
//     const socket = io();
  
//     const creatorInput = document.querySelector('#msgchat');
//     const replyInput = document.querySelector('#invite');
//     const sendButton = document.querySelector('#send');
//     const createButton = document.querySelector('#c');
  
//     const frame = document.querySelector('#frame');     // Creator chat
//     const frame2 = document.querySelector('#frame2');   // Others see
  
//     let isCreator = false;
  
//     function appendMessageToFrame(container, message, align = 'flex-start') {
//       const msgEl = document.createElement('div');
//       msgEl.classList.add('hello');
//       msgEl.innerHTML = `
//         <div class='bro' 
//                 style="display: block;
//                 flex-direction: column; 
//                 justify-items: ${align}; 
//                 margin: 5px 0;">
//           <div style="
//             background: linear-gradient(200deg,#12BFA5);
//             color: white;
//             font-family: 'Oxanium', sans-serif;
//             font-size: 1.5rem;
//             border-radius: 10px;
//             padding: 10px 15px;
//             max-width: 70%;
//             margin-left:1rem;
//             margin-top:.5rem;
//             word-wrap: break-word;
//           ">${message}</div>
//         </div>
//       `;
//       container.appendChild(msgEl);
//       container.scrollTop = container.scrollHeight;
//     }
  
//     // When creator starts chat
//     if (createButton) {
//       createButton.addEventListener('click', () => {
//         isCreator = true;
//         socket.emit('create chat');
//         creatorInput.hidden = false;
//         sendButton.hidden = false;
//         createButton.hidden = true;
//       });
//     }
  
//     // Handle send button
//     sendButton.addEventListener('click', () => {
//       const message = isCreator ? creatorInput.value.trim() : replyInput.value.trim();
//       if (!message) return;
  
//       appendMessageToFrame(isCreator ? frame : frame2, message, 'flex-center', '#ff4c4c');
//       socket.emit('chat message', message);
  
//       if (isCreator) creatorInput.value = '';
//       else replyInput.value = '';
//     });
  
//     // Handle Enter key
//     [creatorInput, replyInput].forEach(input => {
//       input?.addEventListener('keypress', (e) => {
//         if (e.key === 'Enter') sendButton.click();
//       });
//     });
  
//     // Load chat history for everyone
//     socket.on('chat history', (history) => {
//       history.forEach(msg => {
//         if (!isCreator) appendMessageToFrame(frame2, msg, 'flex-start', '#444');
//       });
//     });
  
//     // Creator sees replies
//     socket.on('chat message', (msg) => {
//       if (isCreator) appendMessageToFrame(frame, msg, 'flex-start', '#444');
//     });
  
//     // Other users see creator messages live
//     socket.on('creator message', (msg) => {
//       if (!isCreator) appendMessageToFrame(frame2, msg, 'flex-start', '#444');
//     });
//   });
  

document.addEventListener('DOMContentLoaded', function () {
    const socket = io();
  
    const creatorInput = document.querySelector('#msgchat');
    const replyInput = document.querySelector('#invite');
    const sendButton = document.querySelector('#send');
    const createButton = document.querySelector('#c');
  
    const frame = document.querySelector('#frame');     // Creator's view
    const frame2 = document.querySelector('#frame2');   // Other users' view
  
    let isCreator = false;
    const profileInitial = 'S'; // Change this to the user's initial if needed
  
    function appendMessageToFrame(container, message, align = 'flex-start', bg = '#444', showProfile = false, profileInitial = 'S') {
      const msgEl = document.createElement('div');
  
      msgEl.innerHTML = `
         <div class='bro' 
                style="display: flex;
                justify-content: ${align}; 
                margin: 5px 0;">
                
        ${showProfile ? `
            <button style="
              cursor: pointer;
              width: 3rem;
              height: 3rem;
              border-radius: 50%;
              font-size: 2rem;
               word-wrap: break-word;
              font-family: 'Oxanium-Bold', sans-serif;
              border: 2px solid black;
              background-color:rgb(255, 180, 244);
              margin-bottom: 0.3rem;
            ">${profileInitial}</button>` : ''}
           <div style="
            background: linear-gradient(200deg,#12BFA5);
            color: white;
            font-family: 'Oxanium', sans-serif;
            font-size: 1.5rem;
            border-radius: 10px;
            padding: 10px 15px;
            max-width: 70%;
            margin-left:.5rem;
            margin-top:.5rem;
            word-wrap: break-word;
          ">${message}</div>
        </div>
        </div>
      `;
  
      container.appendChild(msgEl);
      container.scrollTop = container.scrollHeight;
    }
  
    // When creator starts chat
    if (createButton) {
      createButton.addEventListener('click', () => {
        isCreator = true;
        socket.emit('create chat');
        creatorInput.hidden = false;
        sendButton.hidden = false;
        createButton.hidden = true;
      });
    }
  
    // Handle send button
    sendButton.addEventListener('click', () => {
      const message = isCreator ? creatorInput.value.trim() : replyInput.value.trim();
      if (!message) return;
  
      if (isCreator) {
        appendMessageToFrame(frame, message, 'flex-end', '#ff4c4c', true, profileInitial);
        socket.emit('chat message', message);
        creatorInput.value = '';
      } else {
        appendMessageToFrame(frame2, message, 'flex-end', '#444', false);
        socket.emit('chat message', message);
        replyInput.value = '';
      }
    });
  
    // Handle Enter key
    [creatorInput, replyInput].forEach(input => {
      input?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendButton.click();
      });
    });
  
    // Load chat history for others
    socket.on('chat history', (history) => {
      if (!isCreator) {
        history.forEach(msg => {
          appendMessageToFrame(frame2, msg, 'flex-start', '#ff4c4c', true, profileInitial);
        });
      }
    });
  
    // Creator sees replies
    socket.on('chat message', (msg) => {
      if (isCreator) {
        appendMessageToFrame(frame, msg, 'flex-start', '#444', false);
      }
    });
  
    // Others see creator's live message
    socket.on('creator message', (msg) => {
      if (!isCreator) {
        appendMessageToFrame(frame2, msg, 'flex-start', '#ff4c4c', true, profileInitial);
      }
    });
  });
  



  document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const filterSelect = document.getElementById('filters');
    const turfItems = document.querySelectorAll('.com');
    
    // Event listener for the search input
    searchInput.addEventListener('input', function() {
        filterItems();
    });

    // Event listener for the select filter
    filterSelect.addEventListener('change', function() {
        filterItems();
    });

    function filterItems() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedFilter = filterSelect.value;

        turfItems.forEach(function(turf) {
            const tags = turf.querySelectorAll('.tag');
            let matchFound = false;

            tags.forEach(function(tag) {
                const tagType = tag.getAttribute('data-type');
                const tagValue = tag.getAttribute('data-value').toLowerCase();
                
                // Check if the tag matches the filter and the search term
                if ((selectedFilter === '' || tagType === selectedFilter) && tagValue.includes(searchTerm)) {
                    matchFound = true;
                }
            });

            if (matchFound) {
                turf.classList.remove('hidden');
            } else {
                turf.classList.add('hidden');
            }
        });
    }
});


