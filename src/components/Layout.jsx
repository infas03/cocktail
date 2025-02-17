import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col justify-between w-full">
      <div>
        <div className="w-full bg-yellow-500">
          <Header />
        </div>
        <main className="w-full">
          <div className="p-2 mx-auto w-full max-w-[1200px] min-w-[320px]">
            {children}
          </div>
        </main>
      </div>
      <div className="w-full bg-yellow-500 mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
