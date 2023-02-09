CREATE TABLE customer(
	customer_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	firstname VARCHAR(20) NOT NULL,
	lastname VARCHAR(20) NOT NULL,
	dob DATE NOT NULL,
	email VARCHAR(25) NOT NULL,
	phone VARCHAR(20) NOT NULL,
	address1 VARCHAR(50) NOT NULL,
	address2 VARCHAR(50) NULL,
	city VARCHAR(20) NOT NULL,
	state VARCHAR(50) NOT NULL,
	zip VARCHAR(10) NOT NULL,
	username VARCHAR(20) NOT NULL,
	passcode VARCHAR(2000) NOT NULL
	);

CREATE TABLE category(
	category_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	categoryname VARCHAR(50) NOT NULL,
	description VARCHAR(250) NOT NULL
	);

CREATE TABLE product(
	product_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	productname VARCHAR(50) NOT NULL,
	productimage VARCHAR(50) NOT NULL,
	description VARCHAR(500) NOT NULL,
	weight VARCHAR(10) NOT NULL,
	length VARCHAR(10) NOT NULL,
	width VARCHAR(10) NOT NULL,
	price DECIMAL(8,2) NOT NULL,
	status VARCHAR(20) NOT NULL,
	packaging_id INT NOT NULL,
	category_id INT NOT NULL,
	FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE CASCADE ON UPDATE RESTRICT
	);

CREATE TABLE saleorder(
	order_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	saledate DATE NOT NULL,
	paymentstatus VARCHAR(10),
	authorizationnum VARCHAR(10),
	customer_id INT NOT NULL,
	FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE ON UPDATE RESTRICT
	);

CREATE TABLE orderdetail(
	orderdetail_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	price DECIMAL(8,2) NOT NULL,
	qty INT NOT NULL,
	product_id INT NOT NULL,
	order_id INT NOT NULL,
	FOREIGN KEY (order_id) REFERENCES saleorder(order_id) ON DELETE CASCADE ON UPDATE RESTRICT,
	FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE ON UPDATE RESTRICT
	);

CREATE TABLE packaging(
	packaging_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	tracking_number VARCHAR(20) NOT NULL,
	shipper VARCHAR(50) NOT NULL,
	packagingweight VARCHAR(10) NOT NULL,
	packaginglength VARCHAR(10) NOT NULL,
	packagingwidth VARCHAR(10) NOT NULL,
	order_id INT NOT NULL,
	FOREIGN KEY (order_id) REFERENCES saleorder(order_id) ON DELETE CASCADE ON UPDATE RESTRICT
	);

CREATE TABLE review(
	review_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	reviewdate DATE NOT NULL,
	comments VARCHAR(500),
	rating INT NOT NULL,
	status VARCHAR(10),
	customer_id INT NOT NULL,
	product_id INT NOT NULL,
	FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE ON UPDATE RESTRICT,
	FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE ON UPDATE RESTRICT
	);

/*
 1st Sample record
*/

INSERT INTO customer(firstname, lastname, dob, email, phone, address1, address2, city, state, zip, username, passcode) VALUES ("Gerardo", "Vidal","1995-06-28", "gvidal@depaul.edu", "7739911654", "123 Main Street", "Suite 110", "Carpentersville", "IL", "60110", "gvidal", "password");

INSERT INTO category(categoryname, description) VALUES ("XY desk", "Office desk");

INSERT INTO product(productname, productimage, description, weight, length, width, price, status, packaging_id, category_id) VALUES ("cool desk", "coolDesk.png", "coolest desk on the planet", "200 lbs", "48 inches", "24 inches", 1000.00, "Available", 1, 1);

INSERT INTO saleorder(saledate, paymentstatus, authorizationnum, customer_id) VALUES ("2023-01-10", "Fully Paid", "235623782", 1);

INSERT INTO orderdetail(price, qty, product_id, order_id) VALUES (1000.00, 1, 1, 1);

INSERT INTO packaging(tracking_number, shipper, packagingweight, packaginglength, packagingwidth, order_id) VALUES ("123456789", "UPS", "275 lbs", "50 Inches", "26 Inches", 1);

INSERT INTO review(reviewdate, comments, rating, status, customer_id, product_id) VALUES ("2023-01-10", "Good desk", 4, "Publish", 1, 1);

/*
  2nd Sample record
*/

INSERT INTO customer(firstname, lastname, dob, email, phone, address1, address2, city, state, zip, username, passcode) VALUES ("Joe", "Doe","1995-01-28", "jdoe@depaul.edu", "7731234567", "123 Main Street", "Suite 110", "Chicago", "IL", "60101", "jdoe", "password");

INSERT INTO category(categoryname, description) VALUES ("XY desk", "Office desk");

INSERT INTO product(productname, productimage, description, weight, length, width, price, status, packaging_id, category_id) VALUES ("cool desk", "coolDesk.png", "coolest desk on the planet", "200 lbs", "48 inches", "24 inches", 1000.00, "Available", 2, 2);

INSERT INTO saleorder(saledate, paymentstatus, authorizationnum, customer_id) VALUES ("2023-01-10", "Fully Paid", "235623782", 2);

INSERT INTO orderdetail(price, qty, product_id, order_id) VALUES (1000.00, 1, 2, 2);

INSERT INTO packaging(tracking_number, shipper, packagingweight, packaginglength, packagingwidth, order_id) VALUES ("987654321", "UPS", "275 lbs", "50 Inches", "26 Inches", 2);

INSERT INTO review(reviewdate, comments, rating, status, customer_id, product_id) VALUES ("2023-01-10", "Good desk", 5, "Publish", 2, 2);

/*
  3rd Sample record
*/

INSERT INTO customer(firstname, lastname, dob, email, phone, address1, address2, city, state, zip, username, passcode) VALUES ("Tom", "Cruise","1995-01-28", "tcruise@depaul.edu", "7731234567", "123 Main Street", "Suite 110", "Chicago", "IL", "60101", "tcruise", "password");

INSERT INTO category(categoryname, description) VALUES ("XY desk", "Office desk");

INSERT INTO product(productname, productimage, description, weight, length, width, price, status, packaging_id, category_id) VALUES ("cool desk", "coolDesk.png", "coolest desk on the planet", "200 lbs", "48 inches", "24 inches", 1000.00, "Available", 3, 3);

INSERT INTO saleorder(saledate, paymentstatus, authorizationnum, customer_id) VALUES ("2023-01-10", "Fully Paid", "235623782", 3);

INSERT INTO orderdetail(price, qty, product_id, order_id) VALUES (1000.00, 1, 3, 3);

INSERT INTO packaging(tracking_number, shipper, packagingweight, packaginglength, packagingwidth, order_id) VALUES ("", "UPS", "275 lbs", "50 Inches", "26 Inches", 3);

INSERT INTO review(reviewdate, comments, rating, status, customer_id, product_id) VALUES ("2023-01-10", "Good desk", 5, "Publish", 3, 3);

/*
  4th Sample record
*/

INSERT INTO customer(firstname, lastname, dob, email, phone, address1, address2, city, state, zip, username, passcode) VALUES ("Mira", "Banks","1995-01-28", "@depaul.edu", "7731234567", "123 Main Street", "Suite 110", "Chicago", "IL", "60101", "mbanks", "password");

INSERT INTO category(categoryname, description) VALUES ("XY desk", "Office desk");

INSERT INTO product(productname, productimage, description, weight, length, width, price, status, packaging_id, category_id) VALUES ("cool desk", "coolDesk.png", "coolest desk on the planet", "200 lbs", "48 inches", "24 inches", 1000.00, "Available", 4, 4);

INSERT INTO saleorder(saledate, paymentstatus, authorizationnum, customer_id) VALUES ("2023-01-10", "Fully Paid", "235623782", 4);

INSERT INTO orderdetail(price, qty, product_id, order_id) VALUES (1000.00, 1, 4, 4);

INSERT INTO packaging(tracking_number, shipper, packagingweight, packaginglength, packagingwidth, order_id) VALUES ("123457687", "UPS", "275 lbs", "50 Inches", "26 Inches", 4);

INSERT INTO review(reviewdate, comments, rating, status, customer_id, product_id) VALUES ("2023-01-10", "Good desk", 5, "Publish", 4, 4);

/*
  5th Sample record
*/

INSERT INTO customer(firstname, lastname, dob, email, phone, address1, address2, city, state, zip, username, passcode) VALUES ("Roe", "Jogan","1995-01-28", "rjogan@depaul.edu", "7731234567", "123 Main Street", "Suite 110", "Chicago", "IL", "60101", "rjogan", "password");

INSERT INTO category(categoryname, description) VALUES ("XY desk", "Office desk");

INSERT INTO product(productname, productimage, description, weight, length, width, price, status, packaging_id, category_id) VALUES ("cool desk", "coolDesk.png", "coolest desk on the planet", "200 lbs", "48 inches", "24 inches", 1000.00, "Available", 5, 5);

INSERT INTO saleorder(saledate, paymentstatus, authorizationnum, customer_id) VALUES ("2023-01-10", "Fully Paid", "235623782", 5);

INSERT INTO orderdetail(price, qty, product_id, order_id) VALUES (1000.00, 1, 5, 5);

INSERT INTO packaging(tracking_number, shipper, packagingweight, packaginglength, packagingwidth, order_id) VALUES ("098765432", "UPS", "275 lbs", "50 Inches", "26 Inches", 5);

INSERT INTO review(reviewdate, comments, rating, status, customer_id, product_id) VALUES ("2023-01-10", "Good desk", 5, "Publish", 5, 5);
