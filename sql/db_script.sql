CREATE TABLE customers (
	customerId INT(11) AUTO_INCREMENT,
	customerName VARCHAR(50) NOT NULL,
	phone VARCHAR(15) NOT NULL,
	email VARCHAR(50),
	
	CONSTRAINT `pk_customers_customerid` PRIMARY KEY(customerId),
	CONSTRAINT `uk_customers_phone` UNIQUE(phone),
	CONSTRAINT `uk_customers_email` UNIQUE(email)
);
CREATE TABLE accounts (
	accountNumber VARCHAR(15) NOT NULL,
	accountName VARCHAR(50) NOT NULL,
	accountType ENUM('SAVINGS','CREDIT', 'CURRENT', 'FIXED'),
	balance DECIMAL(12,2) NOT NULL DEFAULT 0,
	createdAt DATETIME NOT NULL,
	lastTransactionAt DATETIME NOT NULL,
	owner INT(11) NOT NULL,
	
	CONSTRAINT `pk_accounts_accountnumber` PRIMARY KEY (accountNumber),
	CONSTRAINT `fk_accounts_owner` FOREIGN KEY (owner) REFERENCES customers(customerId)
);
CREATE TABLE transactions (
	transactionId INT(11) AUTO_INCREMENT,
	accountNumber VARCHAR(15) NOT NULL,
	transactionType ENUM('DEBIT','CREDIT'),
	amount DECIMAL(10,2) NOT NULL,
	transactionDate DATETIME NOT NULL,
	remarks TEXT,
	
	CONSTRAINT `pk_transactions_transactionid` PRIMARY KEY(transactionId),
	CONSTRAINT `fk_transactions_accountnumber` FOREIGN KEY(accountNumber) REFERENCES accounts(accountNumber)
);
