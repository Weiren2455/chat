import os
from flask import Flask, render_template
from flask_socketio import SocketIO, send

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
socketio = SocketIO(app)

# 獲取當前目錄
app_dir = os.path.dirname(os.path.abspath(__file__))

@app.route('/')
def index():
    # 指定 HTML 文件的完整路徑
    return render_template(os.path.join(app_dir, 'index.html'))

@socketio.on('message')
def handle_message(data):
    username = data['username']
    msg = data['message']
    full_msg = f'{username}: {msg}'
    print(f'訊息: {full_msg}')
    send(full_msg, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, debug=True)
