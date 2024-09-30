import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-blue-200">
        <Link className="flex items-center justify-center" to="/">
          {/* Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20h9m-9-4h6M12 8V4M4 12h16M4 16h.01M4 20h.01M12 16v4m0-8v4m-7.995-6.58a2 2 0 011.414-.92l.293-.041c.827 0 1.497.664 1.497 1.484v2.524c0 .82-.67 1.484-1.497 1.484h-.293a2 2 0 01-1.414-.92m-.293-.041A1.5 1.5 0 104.01 12.58" />
          </svg>
          <span className="ml-2 text-xl font-bold text-blue-600">Knotes</span>
        </Link>
        <nav className="ml-auto flex gap-4">
          <Link className="border-2 border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50" to="/signup">Sign Up</Link>
          <Link className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" to="/login">Login</Link>
        </nav>
      </header>

      <main className="flex-1">
        <section className="w-full flex items-center justify-center py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 flex flex-col items-center text-center">
            <div className="space-y-6 max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black">
                Your Ideas, Organized
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-black">
                Capture, organize, and access your notes from anywhere. Stay productive with our intuitive note-taking app.
              </p>
              <div className="flex space-x-4 justify-center">
                <Link className="bg-blue-600 text-white px-6 py-3 rounded-md text-base md:text-lg hover:bg-blue-700" to="/signup">Get Started</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50 flex items-center justify-center">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-12 text-black">
              Features
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              <Card icon={EditIcon} title="Create & Edit" description="Easily create new notes and edit existing ones with our user-friendly interface." />
              <Card icon={PinIcon} title="Pin Important Notes" description="Keep your most important notes at the top of your list for quick access." />
              <Card icon={TrashIcon} title="Delete & Organize" description="Remove unwanted notes and keep your workspace clean and organized." />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 flex items-center justify-center">
          <div className="container px-4 md:px-6 text-center">
            <div className="space-y-6 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black">
                Start Taking Notes Today
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-black">
                Join thousands of users who trust our app for their note-taking needs. Sign up now and get organized!
              </p>
              <br />
              <br />
              <Link className="bg-blue-600 text-white px-6 py-3 rounded-md text-base md:text-lg hover:bg-blue-700" to="/signup">Sign Up</Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-blue-200">
        <p className="text-xs text-black">© 2024 NotesApp Inc.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-black" to="mailto:alukoayomide623@gmail.com">Developed by Ayomide Aluko</Link>
        </nav>
      </footer>
    </div>
  );
}

const Card = ({ icon: Icon, title, description }) => (
  <div className="bg-white border border-blue-200 rounded-lg p-6 text-center">
    <div className="mb-4 flex justify-center">
      <Icon className="h-8 w-8 text-blue-600" />
    </div>
    <h3 className="text-black text-lg font-bold mb-2">{title}</h3>
    <p className="text-black">{description}</p>
  </div>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 11l4-4m0 0l5 5m-5-5v3h3m-5 10a9 9 0 110-18 9 9 0 010 18z" />
  </svg>
);

const PinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12l4-4 4 4m0 0l4 4m-8-8v12" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7h16M10 11v6m4-6v6m1-13h-6a2 2 0 00-2 2v0a2 2 0 002 2h6a2 2 0 002-2v0a2 2 0 00-2-2z" />
  </svg>
);
