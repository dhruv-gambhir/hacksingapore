from flask import Flask, request
import sqlite3
from flask import jsonify
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

#add data into a table for give help
@app.route('/give_help/add_data', methods=['POST'])
def give_help_add_data():
    data = request.get_json()
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    insert_data = "INSERT INTO user VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    cursor.execute(insert_data, (data['username'], data['name'], data['dob'], data['age'], data['location'], data['contact'], data['image'], 0))
    connection.commit()
    connection.close()

    return 'Data added successfully'

#add data into a table for need help
@app.route('/need_help/add_data', methods=['POST'])
def need_help_add_data():
    data = request.get_json()
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    insert_data = "INSERT INTO user VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    cursor.execute(insert_data, (data['username'], data['name'], data['password'],data['dob'], data['age'], data['location'], data['contact'], data['image'],1))
    connection.commit()
    connection.close()

    return 'Data added successfully'

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

    update_data = "UPDATE user SET name = ?, password = ?, dob = ?, age = ?, location = ?, contact = ?, image = ? WHERE username = ?"
    cursor.execute(update_data, (data['name'], data['dob'], data['password'], data['age'], data['location'], data['contact'], data['image'], username))
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

#Update data using username
@app.route('/update_task_details/<needy_username>', methods=['PUT'])
def update_task(needy_username):
    data = request.get_json()
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    update_data = "UPDATE task SET caption = ?, day = ?, range = ?, urgency = ?  WHERE needy_username = ?"
    cursor.execute(update_data, (data['caption'], data['day'], data['range'], data['urgency'], data['location'], data['contact'], data['image'], needy_username))
    connection.commit()
    connection.close()

    return 'Data updated successfully'

@app.route('/update_task_assignment/<needy_username>', methods=['PUT'])
def update_assignedtask(needy_username):
    data = request.get_json()
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    update_data = "UPDATE task SET volunteer_username = ?, assigned = ?  WHERE needy_username = ?"
    cursor.execute(update_data, (data['volunteer_username'], 1, needy_username))
    connection.commit()
    connection.close()

    return 'Task Assigned successfully'

@app.route('/get_taskdata/', methods=['GET'])
def get_task_data():
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    select_data = "SELECT task.caption, task.day, task.range, task.urgency, task.list, user.username, user.location FROM task JOIN user ON task.needy_username = user.username WHERE task.assigned = 0"
    cursor.execute(select_data)
    data = cursor.fetchall()
    connection.close()

    return {
        'data': data
    }  

@app.route('/add_task/', methods=['POST'])
def task_add_data():
    data = request.get_json()
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    insert_data = "INSERT INTO task VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    cursor.execute(insert_data, (data['caption'], data['day'], data['range'], data['urgency'], data['list'],data['needy_username'], " ", 0))
    connection.commit()
    connection.close()

if __name__ == '__main__':
    app.run()