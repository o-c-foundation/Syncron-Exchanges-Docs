import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface SwaggerSpec {
  openapi: string;
  info: {
    title: string;
    description: string;
    version: string;
  };
  paths: Record<string, Record<string, any>>;
  components?: {
    schemas?: Record<string, any>;
  };
}

interface Endpoint {
  path: string;
  method: string;
  operation: any;
}

const ApiReference: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const [swaggerData, setSwaggerData] = useState<SwaggerSpec | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [testParams, setTestParams] = useState<Record<string, any>>({});
  const [testResponse, setTestResponse] = useState<any>(null);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    const loadSwaggerData = async () => {
      try {
        const response = await fetch('/swagger.json');
        const data = await response.json();
        setSwaggerData(data);
      } catch (error) {
        console.error('Failed to load Swagger data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSwaggerData();
  }, []);

  const getEndpoints = (): Endpoint[] => {
    if (!swaggerData?.paths) return [];
    
    const endpoints: Endpoint[] = [];
    Object.entries(swaggerData.paths).forEach(([path, methods]) => {
      Object.entries(methods).forEach(([method, operation]) => {
        if (method !== 'parameters') {
          endpoints.push({ path, method: method.toUpperCase(), operation });
        }
      });
    });
    return endpoints;
  };

  const getTags = (): string[] => {
    if (!swaggerData?.paths) return [];
    
    const tags = new Set<string>();
    Object.values(swaggerData.paths).forEach((methods) => {
      Object.values(methods).forEach((operation: any) => {
        if (operation.tags) {
          operation.tags.forEach((tag: string) => tags.add(tag));
        }
      });
    });
    return Array.from(tags).sort();
  };

  const filteredEndpoints = getEndpoints().filter(endpoint => {
    const matchesSearch = endpoint.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         endpoint.operation.summary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         endpoint.operation.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = selectedTag === 'all' || 
                      endpoint.operation.tags?.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  const testEndpoint = async () => {
    if (!selectedEndpoint) return;
    
    setTesting(true);
    try {
      // This is a mock test - in a real implementation, you'd make actual API calls
      const mockResponse = {
        success: true,
        data: {
          message: 'Test request would be sent to:',
          method: selectedEndpoint.method,
          path: selectedEndpoint.path,
          params: testParams
        },
        timestamp: Date.now()
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTestResponse(mockResponse);
    } catch (error) {
      setTestResponse({
        success: false,
        error: {
          message: 'Test failed',
          details: error.message
        }
      });
    } finally {
      setTesting(false);
    }
  };

  const generateCodeSample = (language: string) => {
    if (!selectedEndpoint) return '';
    
    const baseUrl = 'https://api.syncdex.finance/v1';
    const url = `${baseUrl}${selectedEndpoint.path}`;
    
    switch (language) {
      case 'javascript':
        return `fetch('${url}', {
  method: '${selectedEndpoint.method}',
  headers: {
    'Content-Type': 'application/json',
    'X-SD-APIKEY': 'YOUR_API_KEY',
    'X-SD-SIGNATURE': 'YOUR_SIGNATURE',
    'X-SD-TIMESTAMP': Date.now().toString()
  },
  body: ${selectedEndpoint.method !== 'GET' ? JSON.stringify(testParams, null, 2) : 'undefined'}
})
.then(response => response.json())
.then(data => console.log(data));`;
      
      case 'python':
        return `import requests
import time
import hmac
import hashlib

api_key = 'YOUR_API_KEY'
api_secret = 'YOUR_API_SECRET'
timestamp = str(int(time.time() * 1000))

# Generate signature
message = timestamp + '${selectedEndpoint.method}' + '${selectedEndpoint.path}'
signature = hmac.new(api_secret.encode(), message.encode(), hashlib.sha256).hexdigest()

headers = {
    'X-SD-APIKEY': api_key,
    'X-SD-SIGNATURE': signature,
    'X-SD-TIMESTAMP': timestamp
}

response = requests.${selectedEndpoint.method.toLowerCase()}('${url}', 
    headers=headers,
    json=${selectedEndpoint.method !== 'GET' ? str(testParams) : 'None'})
print(response.json())`;
      
      case 'curl':
        return `curl -X ${selectedEndpoint.method} '${url}' \\
  -H 'Content-Type: application/json' \\
  -H 'X-SD-APIKEY: YOUR_API_KEY' \\
  -H 'X-SD-SIGNATURE: YOUR_SIGNATURE' \\
  -H 'X-SD-TIMESTAMP: $(date +%s)000' \\
  ${selectedEndpoint.method !== 'GET' ? `-d '${JSON.stringify(testParams)}'` : ''}`;
      
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!swaggerData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Failed to load API documentation</h2>
          <p className="text-gray-600">Please check if the swagger.json file is available.</p>
        </div>
      </div>
    );
  }

  const tags = getTags();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900 mb-4">API Reference</h1>
          
          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search endpoints..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Tag Filter */}
          <div className="mb-4">
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Endpoints</option>
              {tags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Endpoints List */}
        <div className="flex-1 overflow-y-auto">
          {filteredEndpoints.map((endpoint, index) => (
            <div
              key={`${endpoint.method}-${endpoint.path}-${index}`}
              onClick={() => setSelectedEndpoint(endpoint)}
              className={clsx(
                'p-3 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors',
                selectedEndpoint?.path === endpoint.path && selectedEndpoint?.method === endpoint.method
                  ? 'bg-blue-50 border-l-4 border-l-blue-500'
                  : ''
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={clsx(
                  'px-2 py-1 text-xs font-semibold rounded',
                  endpoint.method === 'GET' && 'bg-green-100 text-green-800',
                  endpoint.method === 'POST' && 'bg-blue-100 text-blue-800',
                  endpoint.method === 'PUT' && 'bg-yellow-100 text-yellow-800',
                  endpoint.method === 'DELETE' && 'bg-red-100 text-red-800'
                )}>
                  {endpoint.method}
                </span>
                <span className="text-sm font-mono text-gray-600">{endpoint.path}</span>
              </div>
              <p className="text-sm text-gray-700 truncate">
                {endpoint.operation.summary || endpoint.operation.description || 'No description'}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {selectedEndpoint ? (
          <>
            {/* Endpoint Header */}
            <div className="bg-white border-b border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className={clsx(
                  'px-3 py-1 text-sm font-semibold rounded',
                  selectedEndpoint.method === 'GET' && 'bg-green-100 text-green-800',
                  selectedEndpoint.method === 'POST' && 'bg-blue-100 text-blue-800',
                  selectedEndpoint.method === 'PUT' && 'bg-yellow-100 text-yellow-800',
                  selectedEndpoint.method === 'DELETE' && 'bg-red-100 text-red-800'
                )}>
                  {selectedEndpoint.method}
                </span>
                <span className="text-lg font-mono text-gray-900">{selectedEndpoint.path}</span>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedEndpoint.operation.summary}
              </h2>
              
              {selectedEndpoint.operation.description && (
                <p className="text-gray-600 mb-4">{selectedEndpoint.operation.description}</p>
              )}
              
              {selectedEndpoint.operation.tags && (
                <div className="flex gap-2">
                  {selectedEndpoint.operation.tags.map((tag: string) => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            {/* Endpoint Details */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Parameters */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Parameters</h3>
                  
                  {selectedEndpoint.operation.parameters ? (
                    <div className="space-y-4">
                      {selectedEndpoint.operation.parameters.map((param: any, index: number) => (
                        <div key={index} className="border-b border-gray-100 pb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                              {param.name}
                            </span>
                            <span className="text-sm text-gray-500">{param.in}</span>
                            {param.required && (
                              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                                Required
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{param.description}</p>
                          <input
                            type="text"
                            placeholder={param.schema?.type === 'number' ? '0' : 'Enter value'}
                            value={testParams[param.name] || ''}
                            onChange={(e) => setTestParams({
                              ...testParams,
                              [param.name]: e.target.value
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No parameters required</p>
                  )}
                  
                  <button
                    onClick={testEndpoint}
                    disabled={testing}
                    className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {testing ? 'Testing...' : 'Test Endpoint'}
                  </button>
                </div>
                
                {/* Response */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Response</h3>
                  
                  {testResponse ? (
                    <div className="bg-gray-50 rounded-md p-4">
                      <pre className="text-sm overflow-x-auto">
                        {JSON.stringify(testResponse, null, 2)}
                      </pre>
                    </div>
                  ) : (
                    <p className="text-gray-500">Click "Test Endpoint" to see the response</p>
                  )}
                </div>
              </div>
              
              {/* Code Samples */}
              <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Code Samples</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['javascript', 'python', 'curl'].map(language => (
                    <div key={language} className="bg-gray-50 rounded-md p-4">
                      <h4 className="font-semibold text-gray-900 mb-2 capitalize">{language}</h4>
                      <pre className="text-sm overflow-x-auto bg-white p-3 rounded border">
                        <code>{generateCodeSample(language)}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Select an Endpoint</h2>
              <p className="text-gray-600">Choose an endpoint from the sidebar to view its documentation</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiReference; 