import React, { useState, useEffect } from 'react';

export default function CodeFieldRenderer({ field }) {
  const getSrcDoc = () => {
    const code = field.code || '';
    
    if (field.language === 'python') {
      return `
        <html>
        <head>
          <style>
            body { font-family: monospace; background: #1e1e1e; color: #d4d4d4; padding: 16px; margin: 0; line-height: 1.5; }
            #out { white-space: pre-wrap; word-break: break-all; margin: 0; }
            .sys-msg { color: #569cd6; font-style: italic; }
          </style>
          <script src="https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js"></script>
        </head>
        <body>
          <div class="sys-msg">Initializing Pyodide (Python WebAssembly)...</div>
          <pre id="out"></pre>
          <script>
            async function run() {
              try {
                const pyodide = await loadPyodide();
                document.querySelector('.sys-msg').style.display = 'none';
                
                // Redirect stdout
                pyodide.setStdout({ batched: (s) => document.getElementById('out').textContent += s + '\\n' });
                // Redirect stderr
                pyodide.setStderr({ batched: (s) => document.getElementById('out').textContent += s + '\\n' });
                
                await pyodide.runPythonAsync(\`${code}\`);
              } catch (err) {
                document.getElementById('out').textContent += '\\n[Error]: ' + err.message;
              }
            }
            run();
          </script>
        </body>
        </html>`;
    }
    
    if (field.language === 'react') {
      return `
        <html><head>
          <style>body { margin: 0; font-family: system-ui, sans-serif; }</style>
          <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        </head><body>
          <div id="root"></div>
          <script type="text/babel" data-type="module">
            ${code}
            
            // Auto mount if App exists
            if (typeof App !== 'undefined') {
              const root = ReactDOM.createRoot(document.getElementById('root'));
              root.render(<App />);
            } else {
              document.getElementById('root').innerHTML = '<div style="padding:16px;color:#ef4444;font-family:monospace;">No "App" component found to mount. Make sure you define: function App() { return <div>...</div> }</div>';
            }
          </script>
        </body></html>`;
    }
    
    if (field.language === 'javascript') {
      return `
        <html>
        <head>
          <style>
            body { font-family: monospace; background: #1e1e1e; color: #d4d4d4; padding: 16px; margin: 0; line-height: 1.5; }
            #out { white-space: pre-wrap; word-break: break-all; margin: 0; }
          </style>
        </head>
        <body>
          <pre id="out"></pre>
          <script>
            const _log = console.log;
            const _error = console.error;
            console.log = (...a) => { 
              document.getElementById('out').textContent += a.join(' ') + '\\n'; 
              _log(...a); 
            };
            console.error = (...a) => { 
              document.getElementById('out').textContent += '[Error] ' + a.join(' ') + '\\n'; 
              _error(...a); 
            };
            
            try {
              ${code}
            } catch(e) {
              console.error(e.message);
            }
          </script>
        </body>
        </html>`;
    }
    
    // HTML puro
    return code;
  };

  return (
    <div className="w-full flex flex-col gap-2 relative group/iframe">
      <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.15em] ml-1">
        {field.label} <span className="opacity-50">({field.language || 'html'})</span>
      </label>
      <iframe
        srcDoc={getSrcDoc()}
        sandbox="allow-scripts allow-same-origin"
        style={{ width: '100%', minHeight: '300px', border: 'none' }}
        className="rounded-xl border border-white/10 bg-[#1e1e1e] overflow-hidden"
        title={`code-${field.id}`}
      />
    </div>
  );
}
