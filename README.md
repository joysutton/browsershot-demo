# Browsershot Demo

A demonstration project showcasing PDF generation capabilities using Laravel, React, and Spatie's Browsershot package. This project includes a product specification sheet generator that converts web pages to professionally formatted PDFs.

## Tech Stack

- **Backend Framework:** Laravel 10.x
- **Frontend Framework:** React 18.x with TypeScript
- **Server-Side Rendering:** Inertia.js 1.x
- **Styling:** Tailwind CSS 3.x
- **PDF Generation:** Spatie/Browsershot 4.x
- **Node.js:** 18.x or higher
- **PHP:** 8.1 or higher

## Prerequisites

Before you begin, ensure you have the following installed:
- PHP 8.1+
- Composer
- Node.js 18+ and npm
- MySQL 8.0+
- Chromium (for PDF generation)

> **Note for Apple Silicon Users:** If you're setting up this project on Apple Silicon (M1/M2/M3), please refer to our [Browsershot Setup Guide](browsershot-setup.md) for specific configuration steps.

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd browsershot-demo
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   ```

4. **Environment Setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Configure PDF Generation**
   Update the following paths in your `.env` file:
   ```
   NODE_BINARY_PATH=/path/to/node
   NPM_BINARY_PATH=/path/to/npm
   CHROME_PATH=/path/to/chromium
   ```

6. **Database Setup**
   ```bash
   php artisan migrate
   ```

7. **Build Assets**
   ```bash
   npm run build
   ```

## Development

1. **Start the development server**
   ```bash
   php artisan serve
   ```

2. **Watch for asset changes**
   ```bash
   npm run dev
   ```

## PDF Generation

The application uses Browsershot for PDF generation. Ensure your server has the following:

1. **Install Chromium**
    - MacOS: `brew install chromium`
    - Ubuntu: `sudo apt-get install chromium-browser`
    - Other: Visit the [Chromium download page](https://www.chromium.org/getting-involved/download-chromium)

2. **Configure Paths**
    - Update the binary paths in your `.env` file
    - For Apple Silicon users, follow our [Browsershot Setup Guide](browsershot-setup.md)

## Features

- Responsive product specification page
- PDF generation with custom styling
- Print-optimized layout
- Customizable footer with contact information


## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Laravel](https://laravel.com)
- [Inertia.js](https://inertiajs.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Spatie Browsershot](https://github.com/spatie/browsershot)
