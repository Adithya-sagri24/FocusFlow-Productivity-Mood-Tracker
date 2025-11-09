# Deploying FocusFlow to Vercel

This guide will walk you through deploying the FocusFlow application to Vercel.

## Step 1: Push to a Git Provider

Ensure your project is pushed to a Git repository (e.g., GitHub, GitLab, Bitbucket). Vercel uses this repository to build and deploy your application.

## Step 2: Create a Vercel Project

1.  Sign up or log in to your [Vercel](https://vercel.com) account.
2.  From your dashboard, click **Add New...** > **Project**.
3.  Import the Git repository you created in Step 1.
4.  Vercel will automatically detect that you are using Vite and configure the build settings. The default settings should work correctly.

## Step 3: Configure Environment Variables

This is the most critical step. Your application relies on several external services, and you need to provide the necessary API keys and URLs.

In your Vercel project's settings, navigate to **Settings** > **Environment Variables**. Add the following variables:

### Supabase

-   `VITE_SUPABASE_URL`: The URL of your Supabase project. Found in your Supabase project settings under `API`.
-   `VITE_SUPABASE_ANON_KEY`: The `anon` public key for your Supabase project. Found in the same place as the URL.

### Spotify

-   `VITE_SPOTIFY_CLIENT_ID`: Your Spotify application's Client ID. You can get this from the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/).

### Google Gemini API

-   `VITE_API_KEY`: Your Google Gemini API key. You can get this from [Google AI Studio](https://aistudio.google.com/app/apikey).

**Important:** For the Spotify integration to work after deployment, you must add your Vercel production URL to the "Redirect URIs" in your Spotify application settings. It will look something like `https://your-project-name.vercel.app/`.

## Step 4: Deploy

After configuring the environment variables, trigger a new deployment from your Vercel project dashboard. Vercel will build your application and deploy it.

Once the deployment is complete, you can visit the provided URL to see your live application.
