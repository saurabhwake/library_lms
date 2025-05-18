from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

# MongoDB connection
client = MongoClient("mongodb+srv://saurabhwake80:saurabhwake80@cluster0.gciyyal.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["library_db"]

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "App is running successfully"}), 200


# Register endpoint
@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role")

    # Check if the email already exists for the same role
    if role == "user" and db.users.find_one({"email": email}):
        return jsonify({"message": "User already exists"}), 400
    elif role == "admin" and db.admins.find_one({"email": email}):
        return jsonify({"message": "Admin already exists"}), 400

    # Insert new user into the appropriate collection
    user = {
        "name": name,
        "email": email,
        "password": password,  # In production, hash the password before saving
    }

    if role == "user":
        db.users.insert_one(user)
    elif role == "admin":
        db.admins.insert_one(user)
    else:
        return jsonify({"message": "Invalid role"}), 400

    return jsonify({"message": "Registration successful"}), 201

# Login endpoint
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    role = data.get("role")

    # Determine the collection based on the role
    collection = db.users if role == "user" else db.admins

    # Find the user in the appropriate collection
    user = collection.find_one({"email": email, "password": password})

    if user:
        # Return all user information (excluding the password for security)
        user_data = {
            "name": user["name"],
            "email": user["email"],
            "role": role,
            "profilePicture": user.get("profilePicture", ""),  # Optional field
        }
        return jsonify({"message": "Login successful", "user": user_data}), 200
    else:
        return jsonify({"message": "Invalid email, password, or role"}), 401

# Fetch users endpoint
@app.route("/users", methods=["GET"])
def get_users():
    users = list(db.users.find({}, {"_id": 1, "name": 1, "email": 1, "borrowedBooks": 1}))
    for user in users:
        user["_id"] = str(user["_id"])  # Convert ObjectId to string
    return jsonify(users)

# Delete user endpoint
@app.route("/users/<user_id>", methods=["DELETE"])
def delete_user(user_id):
    try:
        # Convert user_id to ObjectId (MongoDB expects ObjectId for _id)
        result = db.users.delete_one({"_id": ObjectId(user_id)})
        if result.deleted_count > 0:
            return jsonify({"message": "User deleted successfully"}), 200
        else:
            return jsonify({"message": "User not found"}), 404
    except Exception as e:
        return jsonify({"message": str(e)}), 500

# Books endpoint
@app.route("/books", methods=["GET", "POST"])
def books():
    if request.method == "GET":
        # Fetch all books from the database
        books = list(db.books.find({}, {"_id": 1, "title": 1, "author": 1, "available": 1}))
        for book in books:
            book["_id"] = str(book["_id"])  # Convert ObjectId to string
        return jsonify(books), 200
    elif request.method == "POST":
        # Add a new book to the database
        data = request.get_json()
        title = data.get("title")
        author = data.get("author")
        available = data.get("available", True)

        # Insert new book into the database
        book = {
            "title": title,
            "author": author,
            "available": available,
        }
        db.books.insert_one(book)

        # Return the newly added book (with _id)
        book["_id"] = str(book["_id"])  # Convert ObjectId to string
        return jsonify(book), 201

# Borrowing requests endpoint
@app.route("/requests", methods=["GET", "POST", "PUT"])
def borrowing_requests():
    if request.method == "GET":
        # Fetch all borrowing requests
        requests = list(db.borrowing_requests.find({}))
        for req in requests:
            req["_id"] = str(req["_id"])  # Convert ObjectId to string
        return jsonify(requests), 200

    elif request.method == "POST":
        # Add a new borrowing request
        data = request.get_json()
        user_id = data.get("user_id")
        book_id = data.get("book_id")
        borrow_date = data.get("borrow_date")
        return_date = data.get("return_date")
        period = data.get("period")

        # Insert new borrowing request
        request_data = {
            "user_id": user_id,
            "book_id": book_id,
            "borrow_date": borrow_date,
            "return_date": return_date,
            "period": period,
            "status": "Pending",  # Default status
        }
        db.borrowing_requests.insert_one(request_data)

        # Return the newly added request (with _id)
        request_data["_id"] = str(request_data["_id"])  # Convert ObjectId to string
        return jsonify(request_data), 201

    elif request.method == "PUT":
        # Update a borrowing request (approve/reject)
        data = request.get_json()
        request_id = data.get("request_id")
        status = data.get("status")

        # Update the request status
        result = db.borrowing_requests.update_one(
            {"_id": ObjectId(request_id)},
            {"$set": {"status": status}}
        )

        if result.modified_count > 0:
            return jsonify({"message": "Request updated successfully"}), 200
        else:
            return jsonify({"message": "Request not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
