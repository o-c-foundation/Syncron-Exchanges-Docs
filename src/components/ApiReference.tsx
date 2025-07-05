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

// Helper for code sample tabs
const LANGUAGES = [
  { key: 'shell', label: 'Shell' },
  { key: 'node', label: 'Node' },
  { key: 'python', label: 'Python' },
];

function methodColor(method: string) {
  switch (method) {
    case 'GET': return 'bg-green-700 text-green-100';
    case 'POST': return 'bg-blue-700 text-blue-100';
    case 'PUT': return 'bg-yellow-700 text-yellow-100';
    case 'DELETE': return 'bg-red-700 text-red-100';
    default: return 'bg-gray-700 text-gray-100';
  }
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
  const [codeTab, setCodeTab] = useState('shell');
  const [tryParams, setTryParams] = useState<Record<string, string>>({});
  const [tryResult, setTryResult] = useState<any>(null);
  const [tryLoading, setTryLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedTags, setExpandedTags] = useState<Record<string, boolean>>({});

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
      case 'shell':
        return `curl -X ${selectedEndpoint.method} '${url}' \
  -H 'Content-Type: application/json' \
  -H 'X-SD-APIKEY: YOUR_API_KEY' \
  -H 'X-SD-SIGNATURE: YOUR_SIGNATURE' \
  -H 'X-SD-TIMESTAMP: $(date +%s)000' \
  ${selectedEndpoint.method !== 'GET' ? `-d '${JSON.stringify(testParams)}'` : ''}`;
      case 'node':
        return `const fetch = require('node-fetch');
fetch('${url}', {
  method: '${selectedEndpoint.method}',
  headers: {
    'Content-Type': 'application/json',
    'X-SD-APIKEY': 'YOUR_API_KEY',
    'X-SD-SIGNATURE': 'YOUR_SIGNATURE',
    'X-SD-TIMESTAMP': Date.now().toString()
  },
  ${selectedEndpoint.method !== 'GET' ? `body: JSON.stringify(${JSON.stringify(testParams, null, 2)})` : ''}
}).then(r => r.json()).then(console.log);`;
      case 'python':
        return `import requests
url = '${url}'
headers = {
  'Content-Type': 'application/json',
  'X-SD-APIKEY': 'YOUR_API_KEY',
  'X-SD-SIGNATURE': 'YOUR_SIGNATURE',
  'X-SD-TIMESTAMP': 'TIMESTAMP'
}
${selectedEndpoint.method !== 'GET' ? `data = ${JSON.stringify(testParams, null, 2)}
` : ''}response = requests.${selectedEndpoint.method.toLowerCase()}(url, headers=headers${selectedEndpoint.method !== 'GET' ? ', json=data' : ''})
print(response.json())`;
      default:
        return '';
    }
  };

  const handleTryIt = async () => {
    setTryLoading(true);
    setTimeout(() => {
      setTryResult({
        success: true,
        sent: {
          method: selectedEndpoint.method,
          url: `https://api.syncdex.finance${selectedEndpoint.path}`,
          params: testParams,
        },
        mock: true,
      });
      setTryLoading(false);
    }, 1000);
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
    <div className="flex h-[calc(100vh-56px)] bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <aside className={clsx('w-80 border-r border-gray-800 bg-gray-950 flex flex-col', !sidebarOpen && 'hidden md:flex')}
        style={{ minWidth: 260, maxWidth: 340 }}>
        <div className="p-4 border-b border-gray-800">
          <div className="text-lg font-bold tracking-wide mb-2 text-white">API Reference</div>
          <input
            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Search endpoints..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <nav className="flex-1 overflow-y-auto">
          {Object.keys(filteredEndpoints).length === 0 && (
            <div className="p-4 text-gray-400">No endpoints found.</div>
          )}
          {Object.entries(filteredEndpoints).map(([tag, endpoints]) => (
            <div key={tag}>
              <button
                className="w-full flex items-center justify-between px-4 py-2 font-semibold text-left text-blue-300 hover:bg-gray-800 focus:outline-none"
                onClick={() => setExpandedTags(t => ({ ...t, [tag]: !t[tag] }))}
              >
                <span>{tag}</span>
                <span>{expandedTags[tag] !== false ? '▼' : '►'}</span>
              </button>
              {expandedTags[tag] !== false && (
                <div>
                  {endpoints.map((endpoint, index) => (
                    <button
                      key={`${endpoint.method}-${endpoint.path}-${index}`}
                      className={clsx(
                        'w-full flex items-center gap-2 px-8 py-2 text-left hover:bg-gray-800 rounded transition',
                        selectedEndpoint && selectedEndpoint.path === endpoint.path && selectedEndpoint.method === endpoint.method
                          ? 'bg-blue-900 text-blue-200' : 'text-gray-200'
                      )}
                      onClick={() => setSelectedEndpoint(endpoint)}
                    >
                      <span className={clsx('text-xs font-bold px-2 py-1 rounded', methodColor(endpoint.method))}>{endpoint.method}</span>
                      <span className="font-mono text-sm truncate">{endpoint.path}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>
      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Topbar for mobile */}
        <div className="md:hidden flex items-center bg-gray-950 border-b border-gray-800 px-4 py-2">
          <button onClick={() => setSidebarOpen(o => !o)} className="mr-4 text-gray-300">
            <svg width="24" height="24" fill="none" stroke="currentColor"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
          <span className="font-bold text-lg">API Reference</span>
        </div>
        {/* Endpoint details */}
        {!selectedEndpoint ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Select an Endpoint</h2>
              <p className="text-gray-400">Choose an endpoint from the sidebar to view its documentation.</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row h-full">
            {/* Endpoint info */}
            <section className="flex-1 p-8 max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className={clsx('text-xs font-bold px-2 py-1 rounded', methodColor(selectedEndpoint.method))}>{selectedEndpoint.method}</span>
                <span className="font-mono text-lg text-white">{selectedEndpoint.path}</span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">{selectedEndpoint.operation.summary || 'Endpoint'}</h1>
              {selectedEndpoint.operation.description && <p className="mb-4 text-gray-300">{selectedEndpoint.operation.description}</p>}
              {/* Parameters */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2 text-white">Parameters</h2>
                {selectedEndpoint.operation.parameters && selectedEndpoint.operation.parameters.length > 0 ? (
                  <div className="space-y-3">
                    {selectedEndpoint.operation.parameters.map((param: any) => (
                      <div key={param.name} className="bg-gray-800 rounded p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-sm text-gray-200">{param.name}</span>
                          <span className="text-xs px-2 py-0.5 rounded bg-gray-700 text-gray-400">{param.in}</span>
                          {param.required && <span className="text-xs bg-red-700 text-red-100 px-2 py-0.5 rounded">required</span>}
                        </div>
                        <div className="text-gray-400 text-sm mb-1">{param.description}</div>
                        <input
                          className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                          placeholder={param.schema?.type || 'value'}
                          value={testParams[param.name] || ''}
                          onChange={(e) => setTestParams({
                            ...testParams,
                            [param.name]: e.target.value
                          })}
                        />
                      </div>
                    ))}
                  </div>
                ) : <div className="text-gray-400">No parameters</div>}
              </div>
              {/* Responses */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2 text-white">Responses</h2>
                {selectedEndpoint.operation.responses ? (
                  <div className="space-y-2">
                    {Object.entries(selectedEndpoint.operation.responses).map(([code, resp]: any) => (
                      <div key={code} className="flex gap-2 items-center">
                        <span className="text-xs px-2 py-0.5 rounded bg-gray-700 text-gray-300">{code}</span>
                        <span className="text-gray-300 text-sm">{resp.description}</span>
                      </div>
                    ))}
                  </div>
                ) : <div className="text-gray-400">No response info</div>}
              </div>
            </section>
            {/* Try It & Code Samples */}
            <aside className="w-full md:w-[420px] bg-gray-950 border-l border-gray-800 p-8 flex flex-col gap-8">
              {/* Try It */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-lg text-white">Try It</span>
                  <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded">Mock</span>
                </div>
                <button
                  className="w-full bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition mb-2 disabled:opacity-50"
                  onClick={handleTryIt}
                  disabled={tryLoading}
                >
                  {tryLoading ? 'Sending...' : 'Send Request'}
                </button>
                <div className="bg-gray-900 rounded p-3 min-h-[80px] mt-2">
                  {tryResult ? (
                    <pre className="text-xs text-gray-200 whitespace-pre-wrap">{JSON.stringify(tryResult, null, 2)}</pre>
                  ) : <span className="text-gray-500 text-sm">No request sent yet.</span>}
                </div>
              </div>
              {/* Code Samples */}
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <span className="font-bold text-lg text-white">Code Samples</span>
                  <div className="flex gap-2">
                    {LANGUAGES.map(lang => (
                      <button
                        key={lang.key}
                        className={clsx(
                          'px-3 py-1 rounded text-xs font-bold',
                          codeTab === lang.key ? 'bg-blue-700 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        )}
                        onClick={() => setCodeTab(lang.key)}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-900 rounded p-3">
                  <pre className="text-xs text-gray-200 whitespace-pre-wrap">
                    {generateCodeSample(codeTab)}
                  </pre>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
};

export default ApiReference; 