CREATE TABLE customers (
	customerId INT(11) AUTO_INCREMENT,
	customerName VARCHAR(50) NOT NULL,
	phone VARCHAR(15) NOT NULL,
	email VARCHAR(50),
	
	CONSTRAINT `pk_customers_customerid` PRIMARY KEY(customerId),
	CONSTRAINT `uk_customers_phone` UNIQUE(phone),
	CONSTRAINT `uk_customers_email` UNIQUE(email)
);