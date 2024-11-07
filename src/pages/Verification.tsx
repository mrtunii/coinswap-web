import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Shield } from 'lucide-react';
import { generateAccessToken } from '../services/sumsub';

declare global {
  interface Window {
    SNWidget: {
      init: (params: any) => void;
    };
  }
}

const Verification = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If user is already verified, redirect to dashboard
    if (user?.status === 'verified') {
      navigate('/dashboard');
      return;
    }

    if (!user?.id) {
      navigate('/login');
      return;
    }

    const initSumSub = async () => {
      try {
        // Generate access token
        const { token } = await generateAccessToken(user.id);

        // Load SumSub SDK
        const script = document.createElement('script');
        script.src = 'https://static.sumsub.com/idensic/static/sns-websdk-builder.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
          window.SNWidget?.init({
            accessToken: token,
            
            // Customize the appearance
            customCss: {
              variables: {
                '--black': '#000000',
                '--white': '#ffffff',
                '--primary': '#46ce9d',
                '--secondary': '#EB54BC',
                '--error': '#ef4444',
              },
            },
            
            // Configure callbacks
            onMessage: (type: string, payload: any) => {
              console.log('Message:', type, payload);
              
              if (type === 'idCheck.onApproved') {
                navigate('/verification/result?status=approved');
              } else if (type === 'idCheck.onReject') {
                navigate('/verification/result?status=rejected');
              }
            },
            onError: (error: any) => {
              console.error('SumSub Error:', error);
              setError('დაფიქსირდა შეცდომა. გთხოვთ სცადოთ თავიდან.');
            },
            
            // Configure steps and flow
            includedCountries: ['GE'],
            documents: ['passport', 'id_card', 'drivers'],
            
            // Localization
            lang: 'ka',
            
            // Applicant data
            email: user.email,
            phone: user.phone_number,
            
            // Launch mode
            uiConf: {
              customHeader: false,
              customFooter: false,
              removeButtons: false,
            },
          });
          setLoading(false);
        };

        script.onerror = () => {
          setError('დაფიქსირდა შეცდომა SDK-ის ჩატვირთვისას. გთხოვთ სცადოთ თავიდან.');
          setLoading(false);
        };
      } catch (err) {
        setError('დაფიქსირდა შეცდომა. გთხოვთ სცადოთ თავიდან.');
        setLoading(false);
      }
    };

    initSumSub();

    return () => {
      const script = document.querySelector('script[src*="sns-websdk-builder.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-2">ვერიფიკაცია</h1>
          <p className="text-muted-foreground">
            გთხოვთ გაიაროთ ვერიფიკაცია სერვისის სრულად გამოსაყენებლად
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-center mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center text-muted-foreground">იტვირთება...</div>
        ) : (
          <div id="sumsub-websdk-container" className="rounded-xl overflow-hidden" />
        )}
      </div>
    </div>
  );
};

export default Verification;