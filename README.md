# DISMS Communities ZW — Harare Province

Digital Information System for Member Services — Communities Zimbabwe

## Overview

A comprehensive member registration and management web application for Harare Province, Zimbabwe. Built with Next.js 16, Tailwind CSS, shadcn/ui, and Supabase.

## Features

- **Comprehensive Member Registration** — Full Harare Province form covering:
  - A. Location (15 farms, constituencies, wards, polling stations)
  - B. Farm Ownership (State/Council/Private/Disputed)
  - C. Allocation History
  - D. Development History
  - E. Current Administration
  - F. Beneficiary Details (with employment, education, marital status)
  - Spouse Details
  - Children Details (with educational levels)
  - Dependants Details
  - G. Infrastructure (structure, water, lighting, internet)
  - I. Education Infrastructure (ECD through Tertiary)
  - J. Health Infrastructure
  - K. Source of Basic Goods
  - L. Religion
- **Member Verification Portal** — Public search by PIN/RS + National ID
- **Admin Dashboard** — Analytics, member management, AI insights, reports
- **Data Export** — CSV and JSON export

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS v4, shadcn/ui
- **Backend**: Supabase (PostgreSQL)
- **Auth**: Cookie-based admin sessions

## Getting Started

```bash
npm install
npm run dev
```

Set environment variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

Run SQL scripts in `scripts/` folder in Supabase SQL editor in order:
1. `001_create_tables.sql`
2. `002_create_rls_policies.sql`
3. `003_seed_admin.sql`

Default admin login: `admin` / `admin123` (change in production!)

## Farms Covered

Chulu, A of the Rest, Saturday Retreat, Langford Estate, Orbar Farm, Stoneridge, Hopley Farm, Eyrecourt, Eyrestone, Retreat Farm, Woodford Farm, Goddervery, Lyndhurst Farm, Arlington Farm, Delapaise Farm
