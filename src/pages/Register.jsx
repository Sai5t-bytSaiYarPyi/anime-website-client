import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegisterForm from '../components/RegisterForm';

function Register() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <RegisterForm />
      </div>
      <Footer />
    </div>
  );
}

export default Register;