#import sqlite
import sqlite3

# Create a connection to the database
connection = sqlite3.connect('data.db')

# Create a cursor object
cursor = connection.cursor()

# Create a table
create_table_give_hep = "CREATE TABLE give_help (fin int, name text ,dob date, age int, location int, contact text, image text)"
cursor.execute(create_table_give_hep)

# Insert data into the table
insert_data = "INSERT INTO give_help VALUES (?,?,?,?,?,?,?)"
cursor.execute(insert_data, (1234, 'John Doe', '1990-01-01', 30, 123, '123-456-7890', 'image.jpg'))

create_table_need_help = "CREATE TABLE need_help (fin int, name text ,dob date, age int, location int, contact text, image text)"
cursor.execute(create_table_need_help)

# Insert data into the table
insert_data = "INSERT INTO need_help VALUES (?,?,?,?,?,?,?)"
cursor.execute(insert_data, (4321, 'Jane Doe', '1995-01-01', 25, 321, '321-654-9870', 'image.jpg'))

    
# Commit the changes
connection.commit()

# Close the connection
connection.close()


