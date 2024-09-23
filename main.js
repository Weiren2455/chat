var socket = io();

// 載入保存的用戶名
let savedUsername = localStorage.getItem('username');
if (savedUsername) {
    document.getElementById('username-input').value = savedUsername;
}

// 保存用戶名到 localStorage
document.getElementById('save-username').addEventListener('click', function() {
    let username = document.getElementById('username-input').value;
    if (username) {
        localStorage.setItem('username', username);
        alert('用戶名已保存!');
    } else {
        alert('請輸入用戶名');
    }
});

// 當伺服器發送訊息時，更新聊天視窗
socket.on('message', function(msg) {
    let chat = document.getElementById('chat');
    let message = document.createElement('div');
    message.textContent = msg;
    chat.appendChild(message);
    chat.scrollTop = chat.scrollHeight;  // 滾動到底部
});

// 點擊發送按鈕時，發送訊息到伺服器
document.getElementById('send-button').addEventListener('click', function() {
    let username = document.getElementById('username-input').value;
    let messageInput = document.getElementById('message-input');
    let msg = messageInput.value;

    if (!username) {
        alert('請先輸入用戶名');
        return;
    }

    socket.send({ 'username': username, 'message': msg });
    messageInput.value = '';  // 清空輸入框
});
