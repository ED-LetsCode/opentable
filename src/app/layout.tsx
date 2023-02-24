import "./styles/globals.css";
import { Navbar } from "./components/appComponents/Components";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // This Layout will be rendered on every page
    <html lang="en">
      <head />
      <body>
        <div className="bg-gray-100 min-h-screen w-screen">
          <div className="max-w-screen-2xl m-auto bg-white">
            <Navbar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
