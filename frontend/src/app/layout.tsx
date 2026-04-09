import type { Metadata } from 'next'
// Use system fonts to avoid build fetch issues
import './globals.css'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'GhostContent SaaS',
    description: 'Professional Content Automation Tool',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="antialiased font-sans">{children}</body>
        </html>
    )
}
