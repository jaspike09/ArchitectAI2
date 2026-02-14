import './globals.css'
export const metadata = { title: 'LaunchAI Sovereign', description: '30-Day Revenue Engine' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"><body className="bg-[#020617] text-slate-50">{children}</body></html>
  )
}
