import  { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '../../../AuthContext/AuthContext';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInUser(email, password); // Call the signInUser function from context
      toast.success('Login successful', { position: 'top-center' });
      navigate('/'); // Redirect to home or dashboard
    } catch (error) {
      toast.error('Login failed. Please check your credentials', { position: 'top-center' },error);
    }
  };

  return (
    <div className="min-h-screen p-4">
      <h2 className="text-3xl mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4 card-body">
        {/* Email */}
        <div className="form-control">
          <label className="label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Password */}
        <div className="form-control">
          <label className="label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Error message */}
        <div className="text-red-500 text-center mt-2"></div>

        <button type="submit" className="btn btn-primary w-full">Log In</button>
      </form>

      <div className="text-center mt-4">
        <p>
          Don't have an account? <Link to="/SignUp" className="text-blue-500">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
