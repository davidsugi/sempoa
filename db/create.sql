-- Database schema for expense tracking app

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    target_currency VARCHAR(3) NOT NULL,
    annual_withdrawal_rate DECIMAL(5, 2) DEFAULT 0.04,
    period_start_day INT NOT NULL DEFAULT 1,
    period_end_day INT NOT NULL DEFAULT 30,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table (no user linkage)
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(255),
    is_daily_spending BOOLEAN DEFAULT TRUE
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    rate_at_transaction DECIMAL(10, 6),
    transaction_date DATE NOT NULL,
    description TEXT,
    excluded_from_daily BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (currency) REFERENCES currency_rates(base_currency)
);

-- Currency conversion rates
CREATE TABLE IF NOT EXISTS currency_rates (
    id SERIAL PRIMARY KEY,
    base_currency VARCHAR(3) NOT NULL,
    target_currency VARCHAR(3) NOT NULL,
    rate DECIMAL(10, 6) NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Budgeting table
CREATE TABLE IF NOT EXISTS budgets (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    budget_amount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Views for reporting
CREATE VIEW periodic_balance AS
SELECT 
    t.user_id,
    u.period_start_day,
    u.period_end_day,
    SUM(t.amount * t.rate_at_transaction) AS balance_in_target_currency,
    SUM(CASE WHEN t.amount > 0 THEN t.amount * t.rate_at_transaction ELSE 0 END) AS income,
    SUM(CASE WHEN t.amount < 0 THEN t.amount * t.rate_at_transaction ELSE 0 END) AS outcome
FROM transactions t
JOIN users u ON t.user_id = u.id
WHERE EXTRACT(DAY FROM t.transaction_date) BETWEEN u.period_start_day AND u.period_end_day
GROUP BY t.user_id, u.period_start_day, u.period_end_day;

-- View for financial freedom calculation
CREATE VIEW financial_freedom_status AS
SELECT 
    u.id AS user_id,
    u.annual_withdrawal_rate,
    (SUM(t.amount * t.rate_at_transaction) * 12 / u.annual_withdrawal_rate) AS required_capital
FROM transactions t
JOIN users u ON t.user_id = u.id
GROUP BY u.id, u.annual_withdrawal_rate;

-- Indexing for performance
CREATE INDEX idx_transaction_date ON transactions(transaction_date);
CREATE INDEX idx_currency_rate ON currency_rates(base_currency, target_currency);
CREATE INDEX idx_budget_user_category ON budgets(user_id, category_id);

-- Simplified categories and removed unnecessary user linkage!
