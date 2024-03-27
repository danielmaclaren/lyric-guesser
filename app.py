import sqlite3

from flask import Flask, render_template, request, session, redirect
from flask_session import Session
from helpers import login_required, apology
from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__)

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

conn = sqlite3.connect('workout.db',  check_same_thread=False)
db = conn.cursor()
db.execute("""CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    username TEXT NOT NULL,
    hash TEXT NOT NULL)""")

conn.commit()

@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""
    if request.method == "POST":

        if not request.form.get("username"):
            return apology("must provide username", 400)

        elif not request.form.get("password"):
            return apology("must provide password", 400)

        elif request.form.get("password") != request.form.get("confirmation"):
            return apology("passwords must match", 400)

        # if username is already taken
        rows = db.execute(
            "SELECT * FROM users WHERE username = ?", (request.form.get("username"),)
        )
        conn.commit()

        data = rows.fetchall()
        
        if data:
            return apology(
                "username is already taken, please use another username", 400
            )
        else:
            hash_password = generate_password_hash(request.form.get("password"))

            new_user = db.execute(
                "INSERT INTO users (username, hash) VALUES (?, ?)",
                (request.form.get("username"),
                hash_password,)
            )
            conn.commit()


        """session["user_id"] = new_user"""

        return redirect("/")

    elif request.method == "GET":
        return render_template("register.html")

@app.route("/aboutme")
@login_required
def aboutme():
    return render_template("aboutme.html")

@app.route("/training")
@login_required
def training():
    return render_template("training.html")

@app.route("/history")
@login_required
def history():
    return render_template("history.html")

if __name__ == "__main__":
    app.run(debug=True)