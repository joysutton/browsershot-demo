<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Spatie\Browsershot\Browsershot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

/**
 * Product Controller for handling product display and PDF generation
 * 
 * Requirements:
 * - Spatie/Browsershot package
 * - Node.js and Chromium installed
 * - Proper paths configured for node, npm, and Chromium
 */
class ProductController extends Controller
{
    public function show()
    {
        return Inertia::render('Product');
    }

    /**
     * Generate and stream PDF of product page
     * 
     * Note: Update the binary paths according to your environment
     */
    public function downloadPdf()
    {
        $url = route('product.show');

        $pdf = Browsershot::url($url)
            ->setNodeBinary(env('NODE_BINARY_PATH'))
            ->setNpmBinary(env('NPM_BINARY_PATH'))
            ->setChromePath(env('CHROME_PATH'))
            ->format('A4')
            ->margins(36, 36, 36, 36)
            ->showBackground()
            ->waitUntilNetworkIdle()
            ->delay(1000)
            ->windowSize(1240, 1754)
            ->displayHeaderFooter()
            ->showBrowserHeaderAndFooter()
            ->headerHtml('')
            ->hideHeader()
            ->footerHtml('
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    .footer-content { 
                        width: 100%;
                        font-family: system-ui, -apple-system, sans-serif;
                        font-size: 10px;
                        padding: 10px 36px 0;
                        border-top: 1px solid #E5E7EB;
                    }
                    .footer-table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    .contact-info {
                        text-align: left;
                    }
                    .phone {
                        font-weight: 600;
                    }
                    .website {
                        color: #059669;
                    }
                    .disclaimer {
                        text-align: right;
                        font-size: 9px;
                        line-height: 1.4;
                    }
                    .update-info {
                        margin-top: 8px;
                    }
                </style>
                <div class="footer-content">
                    <table class="footer-table">
                        <tr>
                            <td class="contact-info" style="width: 50%;">
                                <div class="phone">888.555.0123</div>
                                <div class="website">www.techfabrics.com</div>
                            </td>
                            <td class="disclaimer" style="width: 50%;">
                                <div>All material specifications, performance data, and recommendations are subject to change. For current technical information, please visit www.techfabrics.com</div>
                                <div class="update-info">
                                    Updated Nov<br>1.2024ET
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            ')
            ->deviceScaleFactor(1)
            ->landscape(false)
            ->pdf();

        return response($pdf)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline; filename="product.pdf"');
    }
} 