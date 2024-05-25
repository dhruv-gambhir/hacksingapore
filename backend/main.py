from flask import Flask, request
import sqlite3
from flask import jsonify

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

#add data into a table from incoming json
@app.route('/give_/help/add_data', methods=['POST'])
def give_help_add_data():
    data = request.get_json()
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    insert_data = "INSERT INTO give_help VALUES (?, ?, ?, ?, ?, ?, ?)"
    cursor.execute(insert_data, (data['fin'], data['name'], data['dob'], data['age'], data['location'], data['contact'], data['image']))
    connection.commit()
    connection.close()

    return 'Data added successfully'

#retrieve data from a table for a specific fin
@app.route('/give_help/get_data/<int:fin>', methods=['GET'])
def give_help_get_data(fin):
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    select_data = "SELECT * FROM give_help WHERE fin = ?"
    cursor.execute(select_data, (fin,))
    data = cursor.fetchone()
    connection.close()

    if data is None:
            return jsonify({'error': 'Data not found'}), 404

    return {
        'fin': data[0],
        'name': data[1],
        'dob': data[2],
        'age': data[3],
        'location': data[4],
        'contact': data[5],
        'image': data[6]
    }

#update data in a table for a specific fin
@app.route('/give_help/update_data/<int:fin>', methods=['PUT'])
def give_help_update_data(fin):
    data = request.get_json()
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    update_data = "UPDATE give_help SET name = ?, dob = ?, age = ?, location = ?, contact = ?, image = ? WHERE fin = ?"
    cursor.execute(update_data, (data['name'], data['dob'], data['age'], data['location'], data['contact'], data['image'], fin))
    connection.commit()
    connection.close()

    return 'Data updated successfully'

#delete data from a table for a specific fin
@app.route('/give_help/delete_data/<int:fin>', methods=['DELETE'])
def need_help_delete_data(fin):
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    delete_data = "DELETE FROM give_help WHERE fin = ?"
    cursor.execute(delete_data, (fin,))
    connection.commit()
    connection.close()

    return 'Data deleted successfully'


#do same for need_help table
@app.route('/need_help/add_data', methods=['POST'])
def need_help_add_data():
    data = request.get_json()
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    insert_data = "INSERT INTO need_help VALUES (?, ?, ?, ?, ?, ?, ?)"
    cursor.execute(insert_data, (data['fin'], data['name'], data['dob'], data['age'], data['location'], data['contact'], data['image']))
    connection.commit()
    connection.close()

    return 'Data added successfully'

@app.route('/need_help/get_data/', methods=['GET'])
def need_help_get_all_data():
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    select_data = "SELECT * FROM need_help"
    cursor.execute(select_data)
    data = cursor.fetchall()
    connection.close()

    return {
        'data': data
    }

@app.route('/need_help/get_data/<int:fin>', methods=['GET'])
def need_help_get_data(fin):

    try:
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        select_data = "SELECT * FROM need_help WHERE fin = ?"
        cursor.execute(select_data, (fin,))
        data = cursor.fetchone()
        connection.close()

        return {
            'fin': data[0],
            'name': data[1],
            'dob': data[2],
            'age': data[3],
            'location': data[4],
            'contact': data[5],
            'image': data[6]
        }
    except:
        return jsonify({'message': 'Data not found'}), 404
    
    

@app.route('/need_help/update_data/<int:fin>', methods=['PUT'])
def need_help_update_data(fin):
    data = request.get_json()
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    update_data = "UPDATE need_help SET name = ?, dob = ?, age = ?, location = ?, contact = ?, image = ? WHERE fin = ?"
    cursor.execute(update_data, (data['name'], data['dob'], data['age'], data['location'], data['contact'], data['image'], fin))
    connection.commit()
    connection.close()

    return 'Data updated successfully'

@app.route('/need_help/delete_data/<int:fin>', methods=['DELETE'])
def delete_data(fin):
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    delete_data = "DELETE FROM need_help WHERE fin = ?"
    cursor.execute(delete_data, (fin,))
    connection.commit()
    connection.close()

    return 'Data deleted successfully'








if __name__ == '__main__':
    app.run()