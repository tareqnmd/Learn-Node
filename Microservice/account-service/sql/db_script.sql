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