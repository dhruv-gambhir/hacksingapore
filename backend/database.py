#import sqlite
import sqlite3

# Create a connection to the database
connection = sqlite3.connect('data2.db')

# Create a cursor object
cursor = connection.cursor()

create_table_tasks = "CREATE TABLE task (id int primary key autoincrement,caption text, day text, range text, urgency text, list text, needy_username text, volunteer_username text, status int )"
cursor.execute(create_table_tasks)

insert_data = "INSERT INTO task VALUES (?,?,?,?,?,?,?,?,?)"
cursor.execute(insert_data,("I want groceries", "Tomorrow", 2,5, "Very Urgent", {"0":"Milk","1":"Oranges"}, "johndoe","janedoe",0 ))

# Create a table
#create_table_user = "CREATE TABLE user (username text , name text , password text, dob date, age int, location int, contact text, image text, need_help int)"
#cursor.execute(create_table_user)

# Insert data into the table
# insert_data = "INSERT INTO user VALUES (?,?,?,?,?,?,?,?,?)"
# cursor.execute(insert_data, ('johndoe', 'John Doe', 'okfeokeows', '1990-01-01', 30, 123, '123-456-7890', 'image.jpg',1))
# # Insert data into the table
# insert_data = "INSERT INTO user VALUES (?,?,?,?,?,?,?,?,?)"
# cursor.execute(insert_data, ('janedoe', 'jane', 'ghjdsjfsdjfs',  '1995-01-01', 25, 321, '321-654-9870', 'image.jpg',0))
# insert_data = "INSERT INTO user VALUES (?,?,?,?,?,?,?,?,?)"
# cursor.execute(insert_data, ('dhruvgambhir', 'dhruv gamhir', 'kdjewjdwew', '2003-08-07', 25, 321, '451-667-3450', 'image.jpg',1))
# insert_data = "INSERT INTO user VALUES (?,?,?,?,?,?,?,?,?)"
# cursor.execute(insert_data, ('kakulymittal', 'lokj','okdocsdlw','1995-01-01', 25, 321, '321-654-9870', 'image.jpg',0))

print(connection.execute("SELECT * FROM task").fetchall())

# Commit the changes
connection.commit()

# Close the connection
connection.close()


