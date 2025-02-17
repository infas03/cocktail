import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    // <div className="min-h-screen flex flex-col justify-between">
    //   <div className="mx-auto w-full">
    //     <Header />
    //     <main className="container">{children}</main>
    //   </div>

    //   <Footer />
    // </div>
    <div className="min-h-screen flex flex-col justify-between w-full">
      <div>
        <div className="w-full bg-yellow-500">
          <Header />
        </div>
        <main className="w-full">
          <div className="mx-auto w-full max-w-[1200px] min-w-[320px]">
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
