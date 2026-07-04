-- Seed default admin user
-- Default credentials: admin / admin123 (change in production!)
INSERT INTO admin_users (username, password_hash)
VALUES ('admin', 'admin123')
ON CONFLICT (username) DO NOTHING;
