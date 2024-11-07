import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Shield, CheckCircle2, XCircle } from 'lucide-react';

const VerificationResult = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const status = searchParams.get('status');
  const isSuccess = status === 'approved';

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Update user status if verification was successful
    if (isSuccess && user.status === 'unverified') {
      // TODO: Update user status on backend
      setUser({ ...user, status: 'verified' });
    }

    // Redirect to dashboard after 5 seconds
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 5000);

    return () => clearTimeout(timer);
  }, [user, isSuccess, navigate, setUser]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg text-center">
        <div className="mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          {isSuccess ? (
            <>
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">ვერიფიკაცია წარმატებით დასრულდა</h1>
              <p className="text-muted-foreground">
                თქვენ წარმატებით გაიარეთ ვერიფიკაცია. რამდენიმე წამში გადამისამართდებით დეშბორდზე.
              </p>
            </>
          ) : (
            <>
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">ვერიფიკაცია ვერ მოხერხდა</h1>
              <p className="text-muted-foreground">
                სამწუხაროდ ვერიფიკაცია ვერ მოხერხდა. გთხოვთ სცადოთ თავიდან.
              </p>
              <button
                onClick={() => navigate('/verification')}
                className="mt-4 px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium"
              >
                ხელახლა ცდა
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerificationResult;