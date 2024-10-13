import React from "react";

function Footer() {
  return (
    <div className=" bg-[#011d2c]/50 border-2 bg-opacity-50 backdrop-blur-lg rounded-lg  w-full text-center border-t-2 border-slate-500 text-slate-400 py-2  my-6">
      <p>
        Made with ❤️ by{" "}
        <a
          className="text-yellow-400 hover:text-sky-500"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/dasakash26"
        >
          Akash
        </a>
      </p>
      <p> &copy; {new Date().getFullYear()} Moviepedia. All Rights Reserved.</p>
    </div>
  );
}

export default Footer;

