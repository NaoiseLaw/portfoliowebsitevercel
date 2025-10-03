import React, { useState, useEffect } from 'react';
import { ExternalLink, Monitor, Smartphone } from 'lucide-react';

export default function AnaphorShowcase() {
  const [iframeError, setIframeError] = useState(false);
  const [deviceView, setDeviceView] = useState('desktop');

  useEffect(() => {
    // Check if iframe loads successfully
    const timer = setTimeout(() => {
      const iframe = document.getElementById('anaphor-iframe');
      if (iframe) {
        iframe.onerror = () => setIframeError(true);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const getIframeWidth = () => {
    switch(deviceView) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      default: return '100%';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      {/* Project Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Anaphor Analytics
        </h2>
        <p className="text-lg text-gray-600 mb-4">
          A professional analytics platform built on Squarespace, featuring custom design, 
          responsive layouts, and seamless user experience.
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            Squarespace
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            Custom CSS
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
            Responsive Design
          </span>
          <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
            Analytics
          </span>
        </div>

        {/* Device Toggle */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setDeviceView('desktop')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              deviceView === 'desktop' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Monitor size={18} />
            Desktop
          </button>
          <button
            onClick={() => setDeviceView('tablet')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              deviceView === 'tablet' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Smartphone size={18} />
            Tablet
          </button>
          <button
            onClick={() => setDeviceView('mobile')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              deviceView === 'mobile' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Smartphone size={18} />
            Mobile
          </button>
        </div>
      </div>

      {/* Iframe Container */}
      {!iframeError ? (
        <div className="relative bg-gray-100 rounded-xl shadow-2xl overflow-hidden p-8">
          <div 
            className="mx-auto transition-all duration-300"
            style={{ 
              width: getIframeWidth(),
              maxWidth: '100%'
            }}
          >
            <div className="relative w-full bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Browser Chrome */}
              <div className="bg-gray-200 px-4 py-2 flex items-center gap-2 border-b">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-600 ml-2">
                  https://www.anaphoranalytics.com
                </div>
              </div>

              {/* Iframe */}
              <iframe
                id="anaphor-iframe"
                src="https://www.anaphoranalytics.com/"
                title="Anaphor Analytics Live Preview"
                className="w-full border-0"
                style={{ height: deviceView === 'mobile' ? '667px' : '800px' }}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                onError={() => setIframeError(true)}
              />
            </div>
          </div>

          {/* Loading Indicator */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
          </div>
        </div>
      ) : (
        /* Fallback if iframe is blocked */
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-2xl p-12 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <ExternalLink size={40} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Live Site Preview Unavailable
            </h3>
            <p className="text-gray-600 mb-8">
              This site cannot be embedded due to security restrictions. 
              Click below to visit the live website in a new tab.
            </p>
            <a
              href="https://www.anaphoranalytics.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Visit Anaphor Analytics
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
      )}

      {/* Visit Button */}
      <div className="mt-8 flex justify-center">
        <a
          href="https://www.anaphoranalytics.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
        >
          Open in New Tab
          <ExternalLink size={18} />
        </a>
      </div>

      {/* Project Details */}
      <div className="mt-12 grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Project Overview</h3>
          <p className="text-gray-600 leading-relaxed">
            Anaphor Analytics is a comprehensive analytics platform designed to provide 
            businesses with actionable insights. The site features a modern, professional 
            design with intuitive navigation and responsive layouts that work seamlessly 
            across all devices.
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Key Features</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              Custom Squarespace design and development
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              Fully responsive mobile-first layout
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              SEO optimized for search visibility
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              Fast loading performance
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
