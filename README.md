# CookstoriaCulinary

CookstoriaCulinary is a recipe-sharing platform built with Next.js. It offers users the ability to register, manage their profiles, create and update recipes, and purchase premium memberships for exclusive access to premium content. The platform features advanced search and filtering, secure authentication, and an admin dashboard for managing users and content.

## Features

- **User Authentication:**
  - Custom login, registration, change password, and reset password functionalities.
  - Update user information.

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

- **Admin Dashboard:**
  - Admins can manage:
    - Recipes
    - Users
    - Other admin accounts

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Styling:** Tailwind CSS
- **Payments:** [Stripe](https://stripe.com/) for handling premium membership payments.
- **Authentication:** Custom authentication for login, registration, and user management.
- **Database:** TBD (Mention the database being used)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/cookstoriaCulinary.git
    ```

2. Navigate to the project directory:
    ```bash
    cd cookstoriaCulinary
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Set up environment variables for Stripe and your database in a `.env` file:
    ```bash
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
    STRIPE_SECRET_KEY=your_stripe_secret_key
    NEXT_PUBLIC_DATABASE_URL=your_database_url
    ```

5. Run the development server:
    ```bash
    npm run dev
    ```

6. Open your browser and visit [http://localhost:3000](http://localhost:3000) to view the app.

## Live Demo

Check out the live version of the app here: [CookstoriaCulinary Live](https://cook-storia-culinary-frontend.vercel.app/)