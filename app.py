from flask import Flask, render_template, jsonify, request, redirect, url_for

app = Flask(__name__)

@app.route('/')
def login():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login_process():
    user_input = request.form.get('order_number')
    print(f"사용자가 입력한 번호 : {user_input}")
    
    return redirect(url_for('main_page'))

@app.route('/index')
def main_page():
    return render_template('index.html')

if __name__ == '__main__':
    from livereload import Server
    app.debug = True
    server = Server(app.wsgi_app)
    server.serve(port=5003)
