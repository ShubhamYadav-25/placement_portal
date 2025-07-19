from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql

app = Flask(__name__)
cors = CORS(app, origins= "*")

# Example MySQL connection (configure with your DB credentials)
def get_mysql_connection():
    return pymysql.connect(host='localhost', user='root', password='Shubham#@77', db='library_management')


@app.route('/api/login', methods=['POST', 'GET'])
def login():
    # data = request.json  # Expecting JSON payload
    # username = data.get('username')
    # password = data.get('password')
    username = "Raj"
    password = "Raj123"

    # Example validation with MySQL
    conn = get_mysql_connection()
    try:
        with conn.cursor() as cursor:
            query = "SELECT * FROM users WHERE User_Name=%s AND Pass_word=%s"
            cursor.execute(query, (username, password))
            user = cursor.fetchone()

        if user:
            # Valid credentials
            return jsonify(user)
        else:
            # Invalid credentials
            return("Invalid username or password")
            # return jsonify({'status': 'fail', 'message': 'Invalid username or password'}), 401
    finally:
        conn.close()


@app.route('/api/users', methods=['GET'])
def users():
    return jsonify({"users": ["Shub", "Saurabh", "Shivam"]})


if __name__ == '__main__':
    app.run(debug=True, port=5000)