
-- users
CREATE TABLE users (
  user_id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- credit accounts (1 user : many accounts)
CREATE TABLE credit_accounts (
  account_id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  account_type TEXT NOT NULL,      -- credit_card, loan, etc.
  credit_limit NUMERIC(12,2) DEFAULT 0,
  current_balance NUMERIC(12,2) DEFAULT 0,
  opened_date DATE,
  status TEXT DEFAULT 'active'
);

-- payments (1 account : many payments)
CREATE TABLE payments (
  payment_id BIGSERIAL PRIMARY KEY,
  account_id BIGINT NOT NULL REFERENCES credit_accounts(account_id) ON DELETE CASCADE,
  due_date DATE NOT NULL,
  paid_date DATE,
  amount_due NUMERIC(12,2) NOT NULL,
  amount_paid NUMERIC(12,2) DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'due'  -- due, paid, late
);

-- credit score history (1 user : many score snapshots)
CREATE TABLE score_history (
  score_id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  score INTEGER NOT NULL CHECK (score BETWEEN 300 AND 850),
  risk_level TEXT NOT NULL,          -- low, medium, high
  factors JSONB NOT NULL DEFAULT '{}'::jsonb,  -- store breakdown/explanations
  calculated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- helpful indexes
CREATE INDEX idx_accounts_user_id ON credit_accounts(user_id);
CREATE INDEX idx_payments_account_id ON payments(account_id);
CREATE INDEX idx_score_user_id_time ON score_history(user_id, calculated_at DESC);

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS username TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS password_hash TEXT NOT NULL DEFAULT '';

 SELECT * FROM users;


