import React from 'react';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';

// Define the product data structure
interface Product {
  category: string;
  modelNumber: string;
  description: string;
  imageUrl: string;
  keyFeature: string;
  applications: string[];
  features: string[];
  resources: Array<{
    title: string;
    description: string;
  }>;
}

// Sample product data - Replace with your API data
const sampleProduct: Product = {
  category: "Performance Fabric",
  modelNumber: "TF-450-BK",
  description: "High-performance technical fabric engineered for durability and comfort, ideal for demanding applications where strength meets flexibility.",
  imageUrl: "/images/fabric-texture.jpg",
  keyFeature: "Advanced moisture-wicking technology with antimicrobial properties",
  applications: [
    "Athletic & Performance Wear",
    "Outdoor Equipment & Gear",
    "Professional Uniforms",
    "Protective Clothing"
  ],
  features: [
    "UV Protection Rating: UPF 50+",
    "Moisture Management Technology",
    "Anti-microbial Treatment",
    "Eco-friendly Manufacturing"
  ],
  resources: [
    {
      title: "Material Specifications",
      description: "Detailed fabric specifications including fiber content, weight, and performance characteristics."
    },
    {
      title: "Care Instructions",
      description: "Comprehensive guide for proper maintenance and cleaning to ensure long-lasting performance."
    },
    {
      title: "Test Reports",
      description: "Laboratory test results demonstrating compliance with industry standards and performance metrics."
    }
  ]
};

export default function Product() {
  const handleDownloadPdf = () => {
    window.open(route('product.pdf'), '_blank');
  };

  return (
    <>
      <Head title={`${sampleProduct.modelNumber} - ${sampleProduct.category}`} />
      <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Product Layout - Two column grid on desktop, single column on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12 print:break-inside-avoid">
            <div className="print:break-inside-avoid">
              <img
                src={sampleProduct.imageUrl}
                alt={sampleProduct.modelNumber}
                className="w-full h-auto object-contain"
              />
            </div>

            <div className="print:break-inside-avoid">
              <div className="space-y-6">
                <div>
                  <h2 className="text-gray-600 text-lg mb-2">{sampleProduct.category}</h2>
                  <h1 className="text-4xl font-bold text-gray-900">{sampleProduct.modelNumber}</h1>
                </div>

                <div className="flex items-start space-x-3">
                  <svg
                    className="h-6 w-6 text-emerald-700 flex-shrink-0 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.2 2.9a1 1 0 011.4 0l4.4 4.4 4.4-4.4a1 1 0 111.4 1.4L11 8.7V15a1 1 0 11-2 0V8.7L4.2 4.3a1 1 0 010-1.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-4 py-2 rounded-lg flex-1">
                    <p className="text-lg">{sampleProduct.keyFeature}</p>
                  </div>
                </div>

                <p className="text-gray-600 text-lg">{sampleProduct.description}</p>

                <button 
                  onClick={handleDownloadPdf}
                  className="bg-emerald-600 text-white px-6 py-3 rounded font-semibold hover:bg-emerald-700 transition-colors print:hidden"
                >
                  DOWNLOAD PDF
                </button>
              </div>
            </div>
          </div>

          <div className="mb-12 print:break-inside-avoid">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Resources</h2>
            <div className="space-y-6">
              {sampleProduct.resources.map((resource, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <svg
                      className="h-5 w-5 text-emerald-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
                    <p className="text-gray-600 mt-1">{resource.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 print:break-inside-avoid">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Applications</h2>
              <ul className="space-y-3">
                {sampleProduct.applications.map((app, index) => (
                  <li key={index} className="text-gray-600">{app}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Features</h2>
              <ul className="space-y-3">
                {sampleProduct.features.map((feature, index) => (
                  <li key={index} className="text-gray-600">{feature}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 print:break-inside-avoid">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Material Parameters</h2>
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-black">
                    <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-white">Default</th>
                    <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-white"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { label: "Material Weight (gsm)", value: "450" },
                    { label: "Width (inches)", value: "60" },
                    { label: "Fiber Content", value: "87% Polyester, 13% Spandex" },
                    { label: "Water Resistance (mm)", value: "10000" },
                    { label: "Breathability (g/m²/24hrs)", value: "8000" },
                    { label: "UV Protection", value: "UPF 50+" },
                    { label: "Roll Length (yards)", value: "50" },
                    { label: "Construction", value: "4-way Stretch Woven" },
                    { label: "Treatment Type", value: "DWR (Durable Water Repellent)" },
                    { label: "Colorfastness", value: "Grade 4-5" },
                    { label: "Pilling Resistance", value: "Grade 4" },
                    { label: "Abrasion Resistance (cycles)", value: "50000" },
                    { label: "Care Instructions", value: "Machine wash cold" },
                    { label: "Base Material", value: "Synthetic Blend" },
                    { label: "Color", value: "Black" },
                    { label: "Surface Treatment", value: "Anti-microbial" },
                    { label: "Temperature Range (°C)", value: "-10/+40" },
                    { label: "End Use", value: "Performance Apparel" }
                  ].map((param, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{param.label}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{param.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 