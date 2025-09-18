import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Object from './components/Object';
import Subject from './components/Subject';

function App() {
  return (
    // Dùng flex-column + min-vh-100 để Footer luôn ở dưới
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <Header />

      {/* Body */}
      <main className="flex-grow-1">
        {/* Banner Full Width */}
        <section className="my-0">
          <img
            src="/images/baner-aptech.png"   // ảnh để trong public/images/
            alt="FPT Aptech Banner"
            className="w-100 img-fluid"
            style={{ maxHeight: "auto", objectFit: "cover" }}
          />
        </section>

        {/* Objects Section */}
        <section className="my-5">
          <div className="container">
            <Object />
          </div>
        </section>

        {/* Subjects Section */}
        <section className="my-5 bg-light">
          <div className="container">
            <Subject />
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
