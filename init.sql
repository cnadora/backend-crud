-- Create users table
CREATE TABLE mysql.users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  postcode VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  uname VARCHAR(255) NOT NULL,
  pass VARCHAR(255) NOT NULL
);
-- Insert initial user
INSERT INTO mysql.users (first_name, last_name, address, postcode, phone, email, uname, pass)
VALUES ('John', 'Doe', '123 Main St', '12345', '123-456-7890', 'john.doe@example.com', 'johndoe', 'password');