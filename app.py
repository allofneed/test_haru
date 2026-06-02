from flask import Flask, render_template, jsonify, request
from livereload import Server

app = Flask(__name__)

@app.route('/')
def login():
    return render_template('login.html')

if __name__ == '__main__':
    app.debug = True
    server = Server(app.wsgi_app)
    server.serve(port=5003)