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
def delete_data(username):
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    delete_data = "DELETE FROM user WHERE username = ?"
    cursor.execute(delete_data, (username,))
    connection.commit()
    connection.close()

    return 'Data deleted successfully'





if __name__ == '__main__':
    app.run()