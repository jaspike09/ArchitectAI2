'use client';
import { useState, useEffect } from 'react';

export default function LaunchMaster() {
  const [input, setInput] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // This is the absolute fix for Errors 418/419
  useEffect(() => { setMounted(true); }, []);

  const runMeeting = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input })
      });
      const result = await res.json();
      setData(result);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  // If we aren't safely on the browser yet, show a black screen
  if (!mounted) return <div style={{ backgroundColor: '#000', minHeight: '100vh' }} />;

  return (
    <div style={{ padding: '20px', backgroundColor: '#09090b', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#3b82f6' }}>LAUNCHAI MASTER</h1>
          {data && <button onClick={() => window.print()} style={{ padding: '8px 16px', backgroundColor: '#27272a', border: '1px solid #3f3f46', borderRadius: '8px', color: '#fff', cursor: 'pointer' }}>💾 PDF</button>}
        </header>

        <div style={{ marginBottom: '40px' }}>
          <textarea 
            style={{ width: '100%', height: '150px', backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '16px', padding: '20px', color: '#fff', fontSize: '16px', outline: 'none', marginBottom: '16px' }}
            placeholder="Describe your business idea..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button 
            onClick={runMeeting} 
            disabled={loading}
            style={{ width: '100%', padding: '20px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '16px', fontWeight: 'bold', cursor: 'pointer', opacity: loading ? 0.5 : 1 }}
          >
            {loading ? "CONVENING BOARD..." : "EXECUTE MASTER PLAN"}
          </button>
        </div>

        {data && (
          <div style={{ backgroundColor: '#fff', color: '#000', padding: '30px', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
            <h2 style={{ fontSize: '20px', borderBottom: '2px solid #2563eb', paddingBottom: '10px', marginBottom: '20px' }}>Strategic Blueprint</h2>
            <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', marginBottom: '30px' }}>{data.architect}</p>
            
            <div style={{ display: 'grid', gap: '20px', borderTop: '1px solid #e4e4e7', paddingTop: '20px' }}>
              {data.board.map((m: any) => (
                <div key={m.role}>
                  <h4 style={{ color: '#2563eb', fontSize: '12px', fontWeight: 'bold', margin: '0 0 5px 0' }}>{m.role} ANALYSIS</h4>
                  <p style={{ fontSize: '14px', margin: 0, color: '#3f3f46' }}>{m.feedback}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
