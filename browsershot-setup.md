# Setting up Browsershot for PDF Generation in Laravel/Inertia/React with Herd

## Prerequisites
- Laravel project with Inertia.js and React
- Herd for local development
- Node.js and npm (provided by Herd)
- Chromium browser

## Installation Steps

### 1. Install Required Packages

```bash
# Install Browsershot via Composer
composer require spatie/browsershot

# Install Puppeteer via npm
npm install --save puppeteer
```

### 2. Create Symlinks for Node.js and npm
Since Herd uses paths with spaces for Node.js executables, create symlinks to avoid path issues:

```bash
# Create symlinks to Herd's Node.js and npm
ln -s "/Users/[username]/Library/Application Support/Herd/config/nvm/versions/node/[version]/bin/node" ~/herd-node
ln -s "/Users/[username]/Library/Application Support/Herd/config/nvm/versions/node/[version]/bin/npm" ~/herd-npm

# Example with typical paths:
ln -s "/Users/username/Library/Application Support/Herd/config/nvm/versions/node/v18.18.2/bin/node" ~/herd-node
ln -s "/Users/username/Library/Application Support/Herd/config/nvm/versions/node/v18.18.2/bin/npm" ~/herd-npm
```

### 3. Configure Browsershot in Your Controller
```php
<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Spatie\Browsershot\Browsershot;

class YourController extends Controller
{
    public function downloadPdf()
    {
        $url = route('your.page.route');

        $pdf = Browsershot::url($url)
            ->setNodeBinary('/Users/[username]/herd-node')
            ->setNpmBinary('/Users/[username]/herd-npm')
            ->setChromePath('/Applications/Chromium.app/Contents/MacOS/Chromium')
            ->format('A4')
            ->margins(20, 20, 20, 20)
            ->showBackground()
            ->waitUntilNetworkIdle()
            ->pdf();

        return response($pdf)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'attachment; filename="output.pdf"');
    }
}
```

### 4. React Component Setup
```typescript
import React from 'react';
import { Head } from '@inertiajs/react';

export default function YourComponent() {
    const handleDownloadPdf = () => {
        window.open(route('your.pdf.route'), '_blank');
    };

    return (
        <>
            <Head title="Your Page" />
            {/* Your page content */}
            <button 
                onClick={handleDownloadPdf}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
                Download PDF
            </button>
        </>
    );
}
```

### 5. Routes Setup
```php
// In routes/web.php
Route::get('/your-page', [YourController::class, 'show'])->name('your.page.route');
Route::get('/your-page/pdf', [YourController::class, 'downloadPdf'])->name('your.pdf.route');
```

## Troubleshooting Tips

1. **Path Issues**
   - Always use symlinks for Node.js and npm paths to avoid space-related issues
   - Verify symlinks are correctly created using `ls -l ~/herd-node`

2. **Chromium Issues**
   - Ensure Chromium is installed: `/Applications/Chromium.app`
   - If missing, install via: `brew install chromium`

3. **PDF Generation Issues**
   - Add debugging with `->setDebugging()` in Browsershot chain
   - Check Laravel logs for detailed error messages
   - Ensure proper permissions for temp directories

4. **Common Fixes**
   ```php
   // Add timeout if needed
   ->timeout(120)
   
   // Add custom viewport
   ->windowSize(1920, 1080)
   
   // Wait for specific elements
   ->waitForFunction('document.querySelector(".your-element") !== null')
   ```

## Best Practices

1. **Environment Configuration**
   - Store paths in `.env` file:
   ```env
   NODE_BINARY=/Users/username/herd-node
   NPM_BINARY=/Users/username/herd-npm
   CHROME_PATH=/Applications/Chromium.app/Contents/MacOS/Chromium
   ```

2. **PDF Optimization**
   ```php
   // Optimize for print
   ->format('A4')
   ->landscape(false)
   ->margins(20, 20, 20, 20)
   ->showBackground()
   ->preferCssPageSize()
   ```

3. **Error Handling**
   ```php
   try {
       $pdf = Browsershot::url($url)
           // ... configuration ...
           ->pdf();
   } catch (\Exception $e) {
       Log::error('PDF generation failed: ' . $e->getMessage());
       return response()->json(['error' => 'PDF generation failed'], 500);
   }
   ```
