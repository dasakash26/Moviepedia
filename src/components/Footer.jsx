import React from "react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#011d2c]/80 to-[#02283d]/80 border border-blue-800/30 backdrop-blur-lg rounded-xl w-full text-center shadow-lg my-8">
      <div className="px-4 py-6 space-y-2">
        <p className="text-slate-300">
          Made with <span className="animate-pulse text-red-500 mx-1">❤️</span>
          by{" "}
          <a
            className="text-yellow-400 hover:text-blue-400 transition-colors duration-300 font-medium"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/dasakash26"
          >
            Akash
          </a>
        </p>
        <p className="text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} Moviepedia. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
