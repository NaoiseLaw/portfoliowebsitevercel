import React, { useState } from 'react';
import { ExternalLink, Download, Eye, EyeOff, Maximize2 } from 'lucide-react';

interface PDFViewerProps {
  src: string;
  title: string;
  description?: string;
  height?: string;
  downloadUrl?: string;
  className?: string;
}

export default function PDFViewer({ 
  src, 
  title, 
  description, 
  height = "600px", 
  downloadUrl,
  className = "" 
}: PDFViewerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = downloadUrl || src;
    link.download = title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isVisible) {
    return (
      <div className={`bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-8 text-center ${className}`}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <EyeOff size={24} className="text-gray-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            {description && (
              <p className="text-gray-600 mb-4">{description}</p>
            )}
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setIsVisible(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Eye size={16} />
                Show Preview
              </button>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Download size={16} />
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
        {/* Header */}
        <div className="bg-gray-50 px-4 py-3 border-b flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {description && (
              <p className="text-sm text-gray-600">{description}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsVisible(false)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
              title="Hide Preview"
            >
              <EyeOff size={16} />
            </button>
            <button
              onClick={handleFullscreen}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
              title="Fullscreen"
            >
              <Maximize2 size={16} />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
              title="Download PDF"
            >
              <Download size={16} />
            </button>
            <a
              href={downloadUrl || src}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
              title="Open in New Tab"
            >
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="relative bg-gray-100">
          <iframe
            src={`${src}#toolbar=1&navpanes=1&scrollbar=1`}
            title={title}
            className="w-full border-0"
            style={{ height }}
            loading="lazy"
          />
          
          {/* Fallback for browsers that don't support PDF viewing */}
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center pointer-events-auto">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExternalLink size={24} className="text-red-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                PDF Preview Not Available
              </h4>
              <p className="text-gray-600 mb-4">
                Your browser doesn't support PDF preview. Download or open in a new tab to view.
              </p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download size={16} />
                  Download PDF
                </button>
                <a
                  href={downloadUrl || src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <ExternalLink size={16} />
                  Open in New Tab
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full h-full max-w-6xl max-h-full flex flex-col">
            <div className="bg-gray-50 px-4 py-3 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownload}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Download size={16} />
                </button>
                <button
                  onClick={handleFullscreen}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <EyeOff size={16} />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-gray-100">
              <iframe
                src={`${src}#toolbar=1&navpanes=1&scrollbar=1`}
                title={title}
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
