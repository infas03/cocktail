import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col justify-between w-full">
      <div className="h-full">
        <div className="w-full bg-yellow-500">
          <Header />
        </div>
        <main className="w-full h-full">
          <div className="p-5 mx-auto w-full min-h-screen max-w-[1200px] min-w-[320px] bg-neutral-200 pb-10">
            {children}
          </div>
        </main>
      </div>
      <div className="w-full bg-yellow-500">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
