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
