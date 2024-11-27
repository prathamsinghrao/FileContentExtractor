import "./globals.css";

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          <aside className="w-64 h-screen bg-gray-800 text-white fixed bg-indigo-700">
            <div className="p-5">
              <h4>File-Content Extractor</h4>
            </div>
            <nav className="mt-2">
              <ul>
                <li>
                  <a
                    href="/"
                    className="text-white group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  >
                    <svg
                      className="h-6 w-6 shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      ></path>
                    </svg>
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="./data-extraction"
                    className="text-white group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  >
                    <svg
                      className="h-6 w-6 shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                      ></path>
                    </svg>
                    Data Extraction
                  </a>
                </li>
                <li>
                  <a
                    href="./dashboard"
                    className="text-white group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  >
                    <svg
                      className="h-6 w-6 shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      ></path>
                    </svg>
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="./history"
                    className="text-white group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  >
                    <svg
                      className="h-6 w-6 shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 3v18l15-9-15-9z"
                      ></path>
                    </svg>
                    History
                  </a>
                </li>
                <li>
                  <a
                    href="./settings"
                    className="text-white group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  >
                    <svg
                      className="h-6 w-6 shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v1.5m-6.364 1.364l.707.707m-1.708 1.707l-.707.707m11.02-.707l-.707.707m1.708 1.707l-.707.707m-1.02 2.96V12m-6 0v-1.5m5.121-.621l.707.707m-1.83 1.284l-.707.707m4.88 3.54H12m0 0v4.125m4.495-3.872l.586.586m.658-.828l-.586-.586"
                      ></path>
                    </svg>
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="./help"
                    className="text-white group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  >
                    <svg
                      className="h-6 w-6 shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v3m0 12v3m-9-9h3m12 0h3"
                      ></path>
                    </svg>
                    Help
                  </a>
                </li>
              </ul>
            </nav>
          </aside>

          <main className="ml-64 p-5 w-full">{children}</main>
        </div>
      </body>
    </html>
  );
};

export default Layout;
