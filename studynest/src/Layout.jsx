import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <nav className="px-4 py-2">
          <h1 className="text-xl">StudyNest</h1>
        </nav>
      </header>

      <main className="flex-grow px-4 py-6">
        {children}
      </main>

      <footer className="border-t text-sm text-gray-500">
        <div className="px-4 py-2 text-center">
          © 2025 StudyNest
        </div>
      </footer>
    </div>
  );
};

export default Layout;
