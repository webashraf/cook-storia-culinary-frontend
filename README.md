# CookstoriaCulinary

CookstoriaCulinary is a recipe-sharing platform built with Next.js. It offers users the ability to register, manage their profiles, create and update recipes, and purchase premium memberships for exclusive access to premium content. The platform features advanced search and filtering, secure authentication, and an admin dashboard for managing users and content.

## Features

- **User Authentication:**

  - Custom login, registration, change password, and reset password functionalities.
  - Update user information.

- **Community Interaction:**

  - Users can **upvote** and **downvote** recipes to provide feedback.
  - Users can **comment** on recipes, encouraging discussions.
  - Recipe **ratings** based on user votes help highlight popular recipes.
  - Users can **follow** and **unfollow** other users to keep track of their favorite creators.

- **Premium Membership:**

  - Integrated Stripe for premium membership purchases.
  - Premium recipes are protected from free users.

- **Recipe Management:**

  - Users can create and update their own recipes.
  - Recipes include rich text formatting and image attachments.

- **Advanced Search & Filtering:**

  - Search and filter recipes by multiple criteria, providing an enhanced user experience.

- **Protected Routes:**

  - Premium recipes are only accessible by users with a premium membership, utilizing protected routes with Next.js.
  - User can't access admin routes, and admin can't access user routes.

- **Admin Dashboard:**
  - Admins can manage:
    - Recipes
    - Users
    - Other admin accounts

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Styling:** Tailwind CSS, [NextUi](https://nextui.org/)
- **Payments:** [Stripe](https://stripe.com/) for handling premium membership payments.
- **Authentication:** Custom authentication for login, registration, and user management.
- **Database:** Mongodb

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/webashraf/cook-storia-culinary-frontend
   ```

2. Navigate to the project directory:

   ```bash
   cd cook-storia-culinary-frontend
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Set up the environment variables in a `.env.local` file:

   ```bash
   # NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
   # NEXT_PUBLIC_STRIPE_SECRETE_KEY=your-stripe-secrete-key
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open your browser and visit [http://localhost:3000](http://localhost:3000) to view the app.

## Live Demo

Check out the live version of the app here: [CookstoriaCulinary Live](https://cook-storia-culinary-frontend.vercel.app/)
