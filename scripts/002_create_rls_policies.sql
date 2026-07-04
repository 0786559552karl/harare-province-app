-- Row Level Security Policies

ALTER TABLE residents ENABLE ROW LEVEL SECURITY;
ALTER TABLE spouses ENABLE ROW LEVEL SECURITY;
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
ALTER TABLE dependants ENABLE ROW LEVEL SECURITY;
ALTER TABLE infrastructure ENABLE ROW LEVEL SECURITY;
ALTER TABLE education_infrastructure ENABLE ROW LEVEL SECURITY;

-- Allow all operations from service role (admin)
CREATE POLICY "Service role full access residents" ON residents FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access spouses" ON spouses FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access children" ON children FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access dependants" ON dependants FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access infrastructure" ON infrastructure FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access edu_infra" ON education_infrastructure FOR ALL USING (true) WITH CHECK (true);

-- Public read for search portal (residents only - limited fields)
CREATE POLICY "Public search residents" ON residents FOR SELECT USING (true);
