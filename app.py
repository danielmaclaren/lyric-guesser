from flask import Flask, render_template, request, session, redirect
from helpers import login_required
from werkzeug.security import check_password_hash, generate_password_hash
import sqlite3

db = sqlite3.connect('workout.db',  check_same_thread=False)
db.execute("""CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    username TEXT NOT NULL,
    hash TEXT NOT NULL)""")

app = Flask(__name__)


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

        rows = db.execute(
            "SELECT * FROM users WHERE username = ?", (request.form.get("username"),)
        )

        if len(rows) >= 1:
            return apology(
                "username is already taken, please use another username", 400
            )
        else:
            hash_password = generate_password_hash(request.form.get("password"))

            new_user = db.execute(
                "INSERT INTO users (username, hash) VALUES (?, ?)",
                request.form.get("username"),
                hash_password
            )

        session["user_id"] = new_user

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