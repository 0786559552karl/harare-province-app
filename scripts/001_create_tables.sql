-- DISMS AI Database Schema
-- Digital Informal Settlement Management System

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS residents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pin_rs TEXT,
  name TEXT NOT NULL,
  surname TEXT NOT NULL,
  national_id TEXT,
  date_of_birth TEXT,
  gender TEXT CHECK (gender IN ('M', 'F')),
  contact_number TEXT,
  marital_status TEXT,
  employment_status TEXT,
  occupation TEXT,
  employer_name TEXT,
  employer_contact TEXT,
  employer_address TEXT,
  salary_range TEXT,
  business_type TEXT,
  business_registered BOOLEAN,
  company_name TEXT,
  company_reg_no TEXT,
  company_address TEXT,
  company_contact TEXT,
  education_level TEXT,
  o_level_subjects JSONB,
  a_level_subjects JSONB,
  tertiary_level TEXT,
  tertiary_institution TEXT,
  farm_name TEXT,
  farm_size TEXT,
  deed_number TEXT,
  constituency TEXT,
  ward TEXT,
  polling_station TEXT,
  district TEXT,
  branch TEXT,
  cell_village TEXT,
  farm_ownership TEXT,
  allocator_type TEXT,
  allocator_name TEXT,
  allocation_amount TEXT,
  development_initiator TEXT,
  developer_name TEXT,
  development_amount TEXT,
  development_done TEXT,
  admin_organ TEXT,
  admin_name TEXT,
  religion TEXT,
  church_name TEXT,
  basic_goods_source TEXT,
  health_provider TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS spouses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  resident_id UUID REFERENCES residents(id) ON DELETE CASCADE,
  name TEXT,
  surname TEXT,
  national_id TEXT,
  date_of_birth TEXT,
  gender TEXT,
  contact_number TEXT,
  marital_status TEXT,
  employment_status TEXT,
  occupation TEXT,
  employer_name TEXT,
  salary_range TEXT,
  education_level TEXT,
  o_level_subjects JSONB,
  a_level_subjects JSONB,
  tertiary_level TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS children (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  resident_id UUID REFERENCES residents(id) ON DELETE CASCADE,
  name TEXT,
  surname TEXT,
  national_id TEXT,
  date_of_birth TEXT,
  gender TEXT,
  contact_number TEXT,
  educational_level TEXT,
  grade_or_form TEXT,
  marital_status TEXT,
  employment_status TEXT,
  occupation TEXT,
  salary_range TEXT,
  o_level_subjects JSONB,
  a_level_subjects JSONB,
  tertiary_level TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS dependants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  resident_id UUID REFERENCES residents(id) ON DELETE CASCADE,
  name TEXT,
  surname TEXT,
  national_id TEXT,
  date_of_birth TEXT,
  gender TEXT,
  contact_number TEXT,
  educational_level TEXT,
  marital_status TEXT,
  employment_status TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS infrastructure (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  resident_id UUID REFERENCES residents(id) ON DELETE CASCADE,
  erected_structure TEXT,
  num_rooms TEXT,
  water_source TEXT,
  accessibility TEXT,
  waste_disposal TEXT,
  refuse_disposal TEXT,
  lighting_source TEXT,
  internet_hub TEXT,
  internet_distance TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS education_infrastructure (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  resident_id UUID REFERENCES residents(id) ON DELETE CASCADE,
  ecd_available TEXT,
  ecd_name TEXT,
  ecd_registered TEXT,
  ecd_distance TEXT,
  primary_available TEXT,
  primary_name TEXT,
  primary_registered TEXT,
  primary_distance TEXT,
  secondary_available TEXT,
  secondary_name TEXT,
  secondary_registered TEXT,
  secondary_distance TEXT,
  alevel_available TEXT,
  alevel_name TEXT,
  alevel_registered TEXT,
  alevel_distance TEXT,
  tertiary_available TEXT,
  tertiary_name TEXT,
  tertiary_registered TEXT,
  tertiary_distance TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS location_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  latitude FLOAT,
  longitude FLOAT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
