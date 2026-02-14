'use client';
import { useState, useEffect } from 'react';

export default function LaunchMasterApp() {
  const [input, setInput] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Kills Error #419 by forcing the app to wait for the browser
  useEffect(() => { setIsMounted(true); }, []);

  const executeStrategy = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const res = await fetch('/api/chat', { 
        method: 'POST', 
        body: JSON.stringify({ prompt: input }) 
      });
      const result = await res.json();
      setData(result);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  if (!isMounted) return null; // Zero rendering until browser is ready

  return (
    <div style={{ padding: '20px', backgroundColor: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        
        <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between' }}>
          <h1 style={{ color: '#3b82f6', fontWeight: '900', margin: 0 }}>LAUNCHAI MASTER</h1>
          {data && <button onClick={() => window.print()} style={{ background: '#222', color: '#fff', border: 'none', padding: '5px 15px', borderRadius: '5px' }}>💾 SAVE PDF</button>}
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <textarea 
            style={{ width: '100%', height: '120px', backgroundColor: '#111', color: '#fff', borderRadius: '15px', padding: '15px', border: '1px solid #333', fontSize: '16px' }}
            placeholder="Describe your business idea..."
            onChange={(e) => setInput(e.target.value)}
          />
          <button 
            onClick={executeStrategy} 
            disabled={loading}
            style={{ width: '100%', padding: '15px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '15px', fontWeight: 'bold' }}
          >
            {loading ? "BOARD IS THINKING..." : "EXECUTE MASTER PLAN"}
          </button>
        </div>

        {data && (
          <div style={{ marginTop: '30px', backgroundColor: '#fff', color: '#000', padding: '25px', borderRadius: '20px' }}>
            <h2 style={{ borderBottom: '3px solid #2563eb', paddingBottom: '5px' }}>Blueprint</h2>
            <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>{data.architect}</p>
            
            <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
              {data.board.map((m: any) => (
                <div key={m.role} style={{ marginBottom: '15px' }}>
                  <b style={{ color: '#2563eb', fontSize: '12px' }}>{m.role} ANALYSIS</b>
                  <p style={{ margin: 0, fontSize: '14px', color: '#555' }}>{m.feedback}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
