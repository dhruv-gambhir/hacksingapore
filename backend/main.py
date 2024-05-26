from flask import Flask, request
import sqlite3
import json
from flask import jsonify
from flask_cors import CORS
#random token for session
import random
import bcrypt

app = Flask(__name__)
CORS(app)

def generateSessionToken(username):
    return username + '-' + str(random.randint(0, 1000000))


@app.route('/', methods=['GET'])
def hello_world():
    return jsonify('Hello, World!')

#add data into a table for give help
@app.route('/give_help/add_data', methods=['POST'])
def give_help_add_data():
    data = request.get_json()
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    insert_data = "INSERT INTO user VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    cursor.execute(insert_data, (data['username'], data['password'], data['name'], data['dob'], data['age'], data['location'], data['contact'], 0))
    connection.commit()
    connection.close()

    return jsonify('Data added successfully')

#add data into a table for need help
@app.route('/need_help/add_data', methods=['POST'])
def need_help_add_data():
    data = request.get_json()
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    insert_data = "INSERT INTO user VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    cursor.execute(insert_data, (data['username'], data['name'], data['password'],data['dob'], data['age'], data['location'], data['contact'],1))
    connection.commit()
    connection.close()

    return jsonify('Data added successfully')



@app.route('/signin', methods=['POST'])
def signin():
    data = request.get_json()
    if 'username' not in data or 'password' not in data:
        return jsonify({'error': 'Username and password are required fields'}), 400
    
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    select_data = "SELECT * FROM user WHERE username = ? AND password = ?"
    cursor.execute(select_data, (data['username'], data['password']))

    user = cursor.fetchone()
    connection.close()

    if user is None:
        return jsonify("username or password is incorrect")
    
    # Assuming your user table structure is (username, ...)
    return jsonify({
        'username': user[0],
        'need_help': user[7],
        'session_token': generateSessionToken(user[0])
    })



#Get data from table through username
@app.route('/get_data/<username>', methods=['GET'])
def give_help_get_data(username):
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    select_data = "SELECT * FROM user WHERE username = ?"
    cursor.execute(select_data, (username,))
    data = cursor.fetchone()
    connection.close()

    if data is None:
            return jsonify({'error': 'Data not found'}), 404

    return {
        'username': data[0],
        'name': data[1],
        'password': data[2],
        'dob': data[3],
        'age': data[4],
        'location': data[5],
        'contact': data[6],
        'image': data[7]
    }


#Get all need help data
@app.route('/need_help/get_data/', methods=['GET'])
def need_help_get_all_data():
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    select_data = "SELECT * FROM user WHERE need_help = 1"
    cursor.execute(select_data)
    data = cursor.fetchall()
    connection.close()

    return {
        'data': data
    }   

#Update data using username
@app.route('/update_data/<username>', methods=['PUT'])
def need_help_update_data(username):
    data = request.get_json()
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    update_data = "UPDATE user SET name = ?, password = ?, dob = ?, age = ?, location = ?, contact = ? WHERE username = ?"
    cursor.execute(update_data, (data['name'], data['dob'], data['password'], data['age'], data['location'], data['contact'], username))
    connection.commit()
    connection.close()

    return 'Data updated successfully'

#Delete data through usernamed
@app.route('/delete_data/<username>', methods=['DELETE'])
def delete_task(username):
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    delete_data = "DELETE FROM user WHERE username = ?"
    cursor.execute(delete_data, (username,))
    connection.commit()
    connection.close()

    return 'Data deleted successfully'

#Delete task through username
@app.route('/delete_task/<needy_username>', methods=['DELETE'])
def delete_data(needy_username):
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    delete_data = "DELETE FROM task WHERE needy_username = ?"
    cursor.execute(delete_data, (needy_username,))
    connection.commit()
    connection.close()

    return 'Task deleted successfully'

#Update task details
@app.route('/update_task_details/<needy_username>', methods=['PUT'])
def update_task(needy_username):
    data = request.get_json()
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    update_data = "UPDATE task SET caption = ?, day = ?, range = ?, urgency = ?  WHERE needy_username = ?"
    cursor.execute(update_data, (data[0], data[1], data[2], data[3], needy_username))
    connection.commit()
    connection.close()

    return 'Data updated successfully'

#Update task assignment
@app.route('/update_task_assignment/<needy_username>', methods=['PUT'])
def update_assignedtask(needy_username):
    data = request.get_json()
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    update_data = "UPDATE task SET volunteer_username = ?, status = ?  WHERE needy_username = ?"
    cursor.execute(update_data, (data[0], 1, needy_username))
    connection.commit()
    connection.close()

    return 'Task Assigned successfully'

#Get all task data to present
@app.route('/get_taskdata/', methods=['GET'])
def get_task_data():
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    select_data = "SELECT task.caption, task.day, task.range, task.urgency, task.list, user.username, user.location FROM task JOIN user ON task.needy_username = user.username WHERE task.status = 0"
    cursor.execute(select_data)
    data = cursor.fetchall()
    connection.close()

    return jsonify(data)

#Add task
@app.route('/add_task/', methods=['POST'])
def task_add_data():
    data = request.get_json()
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()
    insert_data = "INSERT INTO task VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    cursor.execute(insert_data, (data["caption"], data["day"], data["range"], data["urgency"], data["list"], data["needy_username"], "None", 0))
    connection.commit()
    connection.close()

    return jsonify("Data added successfully")


if __name__ == '__main__':
    app.run(debug=True)