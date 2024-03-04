from flask import Flask, render_template, request

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/register")
def register():
    return render_template("register.html")

@app.route("/aboutme")
def aboutme():
    return render_template("aboutme.html")

@app.route("/training")
def training():
    return render_template("training.html")

@app.route("/history")
def history():
    return render_template("history.html")

if __name__ == "__main__":
    app.run(debug=True)