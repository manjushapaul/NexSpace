# NexSpace®

A modern, responsive Next.js application for finding workspaces, built with Tailwind CSS.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/app` - Next.js app directory
  - `layout.tsx` - Root layout with metadata
  - `page.tsx` - Home page
  - `globals.css` - Global styles with Tailwind
- `/components` - React components
  - `Header.tsx` - Navigation header with logo
  - `HeroBanner.tsx` - Hero section with search card

## Features

- Fully responsive design (desktop, tablet, mobile)
- Glassmorphism search card
- Modern office workspace background
- Semantic HTML structure
- Tailwind CSS utility classes

## Contact Form Email Configuration

The contact form sends emails using Gmail SMTP via Nodemailer. To configure:

1. **Enable 2-Step Verification** on your Google Account
2. **Generate an App Password**:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Enter "NexSpace Contact Form" as the name
   - Copy the generated 16-character password
3. **Set Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   GMAIL_EMAIL=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-16-character-app-password
   ```
4. **For Vercel Deployment**:
   - Go to your Vercel project settings
   - Navigate to "Environment Variables"
   - Add `GMAIL_EMAIL` and `GMAIL_APP_PASSWORD` with your values
   - Redeploy your application

**Note**: Never commit `.env.local` to version control. It's already in `.gitignore`.

## Deployment

This project is configured for deployment on Vercel. Simply push to your repository and connect it to Vercel for automatic deployments.
