import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Object from './components/Object';
import Subject from './components/Subject';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        {/* Phần banner có thể đặt ở đây */}
        <Object />
        <Subject />
      </main>
      <Footer />
    </div>
  );
}

export default App;