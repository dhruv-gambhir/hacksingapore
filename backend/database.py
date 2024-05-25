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
insert_data = "INSERT INTO give_help VALUES (1, 'John Doe', '1990-01-01', 30, 1, '123-456-7890', 'john.jpg')"



create_table_need_help = "CREATE TABLE need_help (fin int, name text ,dob date, age int, location int, contact text, image text)"
cursor.execute(create_table_need_help)

# Insert data into the table
insert_data = "INSERT INTO need_help VALUES (1, 'Jane Doe', '1990-01-01', 30, 1, '123-456-7890', 'jane.jpg')"

    
# Commit the changes
connection.commit()

# Close the connection
connection.close()


