#import sqlite
import sqlite3
#import json

# Create a connection to the database
connection = sqlite3.connect('data.db')

# Create a cursor object
cursor = connection.cursor()

create_table_tasks = """
CREATE TABLE IF NOT EXISTS task (
    caption TEXT,
    day TEXT,
    range TEXT,
    urgency TEXT,
    list TEXT,
    needy_username TEXT,
    volunteer_username TEXT,
    status INT,
    FOREIGN KEY (needy_username) REFERENCES user(username)) ;
"""
cursor.execute(create_table_tasks)
insert_data_t = "INSERT INTO task VALUES (?,?,?,?,?,?,?,?)"
cursor.execute(insert_data_t,("I want groceries", "Tomorrow", "9-12pm","Very Urgent", '{"0":"Milk","1":"Oranges"}', "johndoe","janedoe", 0 ))

# Create a table
create_table_user = "CREATE TABLE IF NOT EXISTS user (username text , name text , password text, dob date, age int, location int, contact text, image text, need_help int)"
cursor.execute(create_table_user)

# Insert data into the table
insert_data = "INSERT INTO user VALUES (?,?,?,?,?,?,?,?,?)"
cursor.execute(insert_data, ('johndoe', 'John Doe', 'okfeokeows', '1990-01-01', 30, "Nanyang Grove", '123-456-7890', 'image.jpg',1))
# # Insert data into the table
insert_data = "INSERT INTO user VALUES (?,?,?,?,?,?,?,?,?)"
cursor.execute(insert_data, ('janedoe', 'jane', 'ghjdsjfsdjfs',  '1995-01-01', 25, "Nanyang Crescent", '321-654-9870', 'image.jpg',0))
insert_data = "INSERT INTO user VALUES (?,?,?,?,?,?,?,?,?)"
cursor.execute(insert_data, ('dhruvgambhir', 'dhruv gamhir', 'kdjewjdwew', '2003-08-07', 25, "Tuas Road", '451-667-3450', 'image.jpg',1))
insert_data = "INSERT INTO user VALUES (?,?,?,?,?,?,?,?,?)"
cursor.execute(insert_data, ('kakulymittal', 'lokj','okdocsdlw','1995-01-01', 25, "Tuas Crescent", '321-654-9870', 'image.jpg',0))


# Commit the changes
connection.commit()


# Close the connection
connection.close()



