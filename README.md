# Indra Patient Portal

This repository contains the source code for the Indra patient portal and its
embedded Sanity Studio. It is a Next.js application using Supabase for
authentication and portal data, Sanity for managed content, and external
integrations for clinical, billing, email, and shop data.

## Handover scope

The source handover includes:

- The Next.js application and reusable components
- The embedded Sanity Studio and its schemas
- Supabase schema definitions for the application-owned tables
- Integration clients and queries
- Static assets, package manifests, and configuration files

The handover does not contain:

- Environment files, passwords, API keys, or database connection strings
- Supabase Auth users or table data
- Sanity dataset content or media assets
- Data held by Semble, Azure, Shopify, Resend, or other third parties
- Build output, dependency folders, deployment history, or Git history

Some legacy or currently unused components remain in the source tree so the
handover reflects the complete working codebase rather than a reduced export.

## Requirements

- Node.js 22
- pnpm 11
- Access to, or replacement accounts for, the external services listed below

The versions used for the final handover were Node.js `22.22.2` and pnpm
`11.19.0`.

## Local setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Copy the environment-variable template:

   ```bash
   cp .env.example .env.local
   ```

3. Fill in `.env.local` with credentials for the services described in the
   next section. Never commit this file.

4. Start the development server:

   ```bash
   pnpm dev
   ```

5. Open:
   - Portal: http://localhost:3000
   - Sanity Studio: http://localhost:3000/studio

## Environment variables

The application reads the following variables. Values prefixed with
`NEXT_PUBLIC_` are exposed to browser code and must not contain private
credentials.

| Variable                                       | Purpose                                                                                                                   |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_BASE_URL`                         | Public origin used for links, email assets, robots, and the sitemap. Use `http://localhost:3000` locally.                 |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`                | Sanity project ID.                                                                                                        |
| `NEXT_PUBLIC_SANITY_DATASET`                   | Sanity dataset name, normally `production`.                                                                               |
| `NEXT_PUBLIC_SANITY_API_VERSION`               | Optional Sanity API version. Defaults to `2024-06-12`.                                                                    |
| `NEXT_PUBLIC_SUPABASE_URL`                     | Supabase project URL.                                                                                                     |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`         | Supabase publishable key used for browser/server sessions. Older projects may provide the legacy anon key for this value. |
| `SUPABASE_SECRET_KEY`                          | Server-only Supabase secret key used for administrative Auth and database operations. Never expose this in browser code.  |
| `SEMBLE_API_KEY`                               | Server-only Semble Open API token.                                                                                        |
| `AZURE_BASE_URL`                               | Base URL of the supplied Azure integration endpoint, without a trailing slash.                                            |
| `RESEND_API_KEY`                               | Server-only Resend API key used for registration and password-reset emails.                                               |
| `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`             | Shopify store hostname used by the Storefront GraphQL API.                                                                |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN`     | Shopify Storefront API token.                                                                                             |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_CUSTOM_DOMAIN` | Public shop hostname used to construct product links.                                                                     |

Production and preview deployments must have their own appropriate values.
Do not reuse production secrets in local or preview environments unless that
access has been expressly authorised.

## Supabase setup

1. Create or select a Supabase project.
2. Copy its project URL, publishable key, and server-side secret key into the
   corresponding environment variables.
3. In the Supabase SQL Editor, run:

   ```text
   supabase/profiles-and-tokens.sql
   ```

   This creates the `public.profiles` and `public.tokens` tables, their
   constraints, the profile relationship to `auth.users`, and Row Level
   Security settings. Access is granted only to `service_role`, matching the
   server-side access pattern in this application.

The SQL file is schema-only. It does not contain portal users, profiles,
registration tokens, password-reset tokens, or other data. Existing users and
data must be migrated separately if they are required and the recipient is
authorised to receive them.

The application uses Supabase Auth for login and creates users through
server-side administrative calls. `SUPABASE_SECRET_KEY` must therefore only be
configured in a trusted server or deployment environment.

## Sanity setup

1. Create or select a Sanity project and dataset.
2. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`.
3. Add `http://localhost:3000` to the project's allowed CORS origins for local
   Studio use. Add the deployed portal origin for production.
4. Start the application and open `/studio` to access the embedded Studio.

The schemas are registered from `src/sanity/schema.ts`. No Sanity dataset
export is included, so pages, site settings, articles/modules, resources, and
menus must either already exist in the configured dataset or be recreated.

## External integrations

### Semble

Semble is accessed server-side through `https://open.semble.io/graphql` using
`SEMBLE_API_KEY`. It supplies patient matching, appointments, and prescription
documents. A valid token with access to the relevant patient data is required.

### Azure endpoint

`AZURE_BASE_URL` is the base URL of the separately supplied integration. The
included Azure client defines helpers for the following paths:

- `find_patient`
- `get_bookings`
- `get_scripts`
- `get_invoices`
- `get_billing_history`

The current invoice UI uses `get_invoices` and `get_billing_history`; the other
helpers are retained integration code. The implementation of the external
endpoint is not part of this repository.

### Shopify

The portal uses Shopify's Storefront GraphQL API to load products from the
`portal` collection. Configure the store domain, Storefront token, and public
shop domain using the variables above.

### Resend

Resend sends registration and password-reset links. The current sender is
`Indra portal <no-reply@array.design>` and must be authorised in the configured
Resend account. If a different sending domain is used, update the sender in:

- `src/lib/actions/register.ts`
- `src/lib/actions/forgot-password.ts`

`NEXT_PUBLIC_BASE_URL` must be the correct public origin so emailed links and
images resolve correctly.

## Validation

Run the available project checks before deployment:

```bash
pnpm lint
pnpm build
```

There is currently no automated test suite. The lint command may report
warnings from retained legacy code; warnings do not currently cause it to
fail. A production build is the primary compilation and route validation.

Manual checks should cover:

- Registration and registration email delivery
- Login, logout, protected-route redirects, and session persistence
- Forgotten-password and password-reset flows
- Patient appointments and prescription documents from Semble
- Invoices and billing history from the Azure endpoint
- Shopify product links
- Sanity-managed pages, modules, resources, metadata, and Studio access

Use test accounts and non-production data when possible.

## Deployment

The application can be deployed to Vercel or another Node.js-compatible
platform.

For each environment:

1. Configure every required environment variable in the deployment platform.
2. Set `NEXT_PUBLIC_BASE_URL` to that environment's public origin.
3. Add the origin to Sanity's allowed CORS origins.
4. Confirm that Supabase, Semble, Azure, Shopify, and Resend permit access from
   the deployment environment.
5. Run a production build and complete the manual checks above.

Third-party accounts, permissions, DNS, email-domain verification, and hosted
integration endpoints are operational dependencies and are not created by
deploying this repository alone.
