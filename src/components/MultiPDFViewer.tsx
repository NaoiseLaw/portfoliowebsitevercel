import React, { useState } from 'react';
import { FileText, Download, ExternalLink } from 'lucide-react';
import PDFViewer from './PDFViewer';

interface PDFDocument {
  src: string;
  title: string;
  description?: string;
  size?: string;
  type?: 'presentation' | 'report' | 'documentation' | 'proposal' | 'other';
}

interface MultiPDFViewerProps {
  documents: PDFDocument[];
  title?: string;
  description?: string;
  className?: string;
}

export default function MultiPDFViewer({ 
  documents, 
  title = "Project Documents", 
  description,
  className = "" 
}: MultiPDFViewerProps) {
  const [activeTab, setActiveTab] = useState(0);

  const getTypeIcon = (type?: string) => {
    switch (type) {
      case 'presentation':
        return '📊';
      case 'report':
        return '📋';
      case 'documentation':
        return '📚';
      case 'proposal':
        return '📝';
      default:
        return '📄';
    }
  };

  const getTypeColor = (type?: string) => {
    switch (type) {
      case 'presentation':
        return 'bg-blue-100 text-blue-800';
      case 'report':
        return 'bg-green-100 text-green-800';
      case 'documentation':
        return 'bg-purple-100 text-purple-800';
      case 'proposal':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (documents.length === 0) {
    return (
      <div className={`bg-gray-50 rounded-lg p-8 text-center ${className}`}>
        <FileText size={48} className="text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">No Documents Available</h3>
        <p className="text-gray-500">Documents will be added soon.</p>
      </div>
    );
  }

  if (documents.length === 1) {
    return (
      <div className={className}>
        <PDFViewer
          src={documents[0].src}
          title={documents[0].title}
          description={documents[0].description}
          downloadUrl={documents[0].src}
        />
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        {description && (
          <p className="text-gray-600 mt-1">{description}</p>
        )}
      </div>

      {/* Document Tabs */}
      <div className="bg-white border-b">
        <div className="flex overflow-x-auto">
          {documents.map((doc, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex items-center gap-3 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === index
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg">{getTypeIcon(doc.type)}</span>
              <div className="text-left">
                <div className="font-medium">{doc.title}</div>
                {doc.size && (
                  <div className="text-xs text-gray-400">{doc.size}</div>
                )}
              </div>
              {doc.type && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(doc.type)}`}>
                  {doc.type}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Document Overview Cards */}
      <div className="p-6 bg-gray-50 border-b">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg p-4 border-2 cursor-pointer transition-all ${
                activeTab === index
                  ? 'border-blue-500 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
              onClick={() => setActiveTab(index)}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{getTypeIcon(doc.type)}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{doc.title}</h3>
                  {doc.description && (
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{doc.description}</p>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    {doc.size && (
                      <span className="text-xs text-gray-500">{doc.size}</span>
                    )}
                    {doc.type && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(doc.type)}`}>
                        {doc.type}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-1 mt-3">
                <a
                  href={doc.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={12} />
                  Open
                </a>
                <a
                  href={doc.src}
                  download={doc.title}
                  className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Download size={12} />
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Document Viewer */}
      <div className="p-6">
        <PDFViewer
          src={documents[activeTab].src}
          title={documents[activeTab].title}
          description={documents[activeTab].description}
          downloadUrl={documents[activeTab].src}
          height="700px"
        />
      </div>
    </div>
  );
}
