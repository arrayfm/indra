# Getting Started

## Setting up Sanity

First, you need to create a new project on [Sanity](https://www.sanity.io/). Once you have created a new project, you will need to create a new dataset. Once you have created a new dataset, you will need to create a new schema. There are some examples in the `sanity/schemas` folder that you can use to get started.

Once you have created a new schema, you will need to create a new `.env.local` file in the base project folder. You will need to fill in the `SANITY_PROJECT_ID` and `SANITY_DATASET` fields with the appropriate values.

Add http://localhost:3000 to the CORS Origins in the Sanity dashboard.

## Setting up the project

Set up the repository on GitHub and clone base-sanity to your local machine

```bash
git clone git@github.com:arrayfm/base-sanity.git <folder-name>
cd <folder-name>
git remote remove origin
rm -rf .git
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <repository-url>
git push -u origin main
```

Import seed data into the dataset by running:

```bash
npx sanity dataset import seed.tar.gz --replace
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the frontend.
Open [http://localhost:3000/studio](http://localhost:3000/studio) with your browser to view the Sanity Studio.

# Frontend Development

## Styling & Theming

We use [Tailwind CSS](https://tailwindcss.com/) for styling and theming, you can find the config file at `tailwind.config.ts`. There are number of utility classes that are available to use, some of these are connected to utility functions - `src/lib/utils/theme.ts` to dynamically fetch classes based on given variables, these are generally used through the app for both static & dynamic data as it keeps consistency throughout development and makes it easier to update multiple values at once. However, feel free to change, update and/or use as you like.

There are some extra classes that are also added to the `src/css` for any additional styles that are needed.

## Fonts & Typography

We use [Next.js Local Fonts](https://nextjs.org/docs/app/building-your-application/optimizing/fonts#local-fonts) built in support for local fonts, you can find the config file at `src/fonts`. You can add any fonts you like to the `fonts` array in the config file, and they will be automatically added to the project. _I'd recommend updating the variable names and importing as needed._

## Pages

The folder structure for the frontend fall under the `src/(frontend)` folder, this is where all the pages for frontend development are found. There are a few pages that are already created, such as the index `page.tsx` and `not-found.tsx`. Feel free to change, update and/or use as you like.

## Components

Components are split into a few main categories for ease of use:

- **elements**: Basic building blocks of the app, such as buttons, inputs, etc.
- **items**: More complex components that are composed of other components, such as cards, modals, etc.
- **sections**: Components that are composed of items and/or elements, such as summaries, galleries, etc.
- **layouts**: Components that are composed of sections, items and/or elements, such as headers, footers, etc.
- **composites**: Components that are made up of several items, such as lists, links etc.
- **providers**: Components that are used to provide context to other components, such as the `ThemeProvider` or `ScreenProvider`.
- **partials**: Components that are used to compose other components, these are similar to elements but are more specific to other components, such as the controls for the mux embed.

These are by no means set in stone, so feel free to change, remove, update and/or use as you like.

## Libraries

Our library is folder composed of functions that assist in development of the project of the project, they generally do not return \*.tsx files. They are split into four main categories for ease of use:

- **core**: Functions that are imperative to the project, such as the `fetch` function.
- **utils**: Functions that are not imperative to the project, but are useful in development, they are simple and/or generic functions that are reusable, such as the `cn` function.
- **hooks**: A dedicated folder for useful hooks, these may or may not be project specific, such as the `useScreen` hook.
- **queries**: Functions that are used to fetch data from sanity for the frontend, such as the `getSiteSettings` function.

NOTE: These are libraries that are used for the frontend development (they may also be used within sanity itself), there are a few sanity specific functions that get called from `src/sanity/lib`, these files are used for sanity - except for the client which shares the env details for the frontend fetch function.

## Types

The types folder is used to store types that are used throughout the project, these are re-declared and are used to define the shape of data that is used throughout the project. They are split into a few main categories for ease of use:

- **documents**: Types that are used to define the shape of sanity documents, such as the `page` type. They are the base types that are used to define the shape of the data that is fetched from sanity.
- **sections**: Types that are used to define the shape of sections, such as a `textBlock` type. These are types that are used to define the shape of sections that sit within documents - generally used for content builder.
- **elements**: Types that are used to define the shape of elements, such as the `link` type. These are types that make up parts of either sections or documents which are generally repeated several times.
- **theme**: Types that are used to define the shape of the theme, such as the `aspectRatio` type. These are types that are used to define the shape of minor values that are used throughout the project.
- **global**: Types that are used to define the shape of global values, such as the `Window` type. These are types that are used to define the shape of global values that are used throughout the project - useful for hooks & related functions.

In addition to declaring these types, sanity also has cli commands that can be used to generate types from the schema, these can be useful as a base but may not always be accurate to the returning groq values within query parameters. To generate types from the schema & groq queries, you can run the following commands:

`npx sanity schema extract` which will generate a `schema.json` file at the base of the project.

`npx sanity typegen generate` which will generate a `sanity.types.ts` file from the previously generated `schema.json` file at the base of the project.

# Sanity Studio Development

# Deployment

## Vercel

We use [Vercel](https://vercel.com/) for deployment. You will need to create a new project on Vercel and link it to your repository. Once you have done this, we begin to deploy the current branch's:

- **main**: The main branch is deployed to the production environment. This is the live site.
- **staging**: The staging branch is deployed to the staging environment. Generally used to preview progressive updates that will then be pushed through to the live site.

You will need to fill in the `SANITY_PROJECT_ID` and `SANITY_DATASET` and any other environment variables in the Vercel project settings. Main environment variables are set to production, and staging environment variables are set to preview - this can also be configured to be set to the staging branch.

For the case of having both a main and staging setup, a duplicate of the production database should be created in the datasets tab of the sanity dashboard. This will allow for the staging environment to have its own dataset to work with (and recommended to use for development as well). Once the staging dataset is setup, you can then export the dataset from the production environment and import it into the staging environment. Refer to the sanity documentation for more information on how to do this:

- **Exporting**: https://www.sanity.io/docs/dataset#fd38ca03b011
- **Importing**: https://www.sanity.io/docs/dataset#9c9aab5198aa
