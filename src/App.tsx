import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './context/AuthContext';
import PageNotFound from './pages/PageNotFound';
import HomeLayout from './pages/HomeLayout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from './pages/ChangePassword';
import RequestOtp from './pages/RequestOtp';
import DashboardLayout from './pages/DashboardLayout';
import ProtectedRoute from './context/ProtectedRoute';
import AppLayout from './view/AppLayout';
import Pages from './pages/Pages';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      retry: 1,
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <BrowserRouter>
          <ScrollToTop>
            <Routes>
              <Route path="/" element={<HomeLayout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/request-otp" element={<RequestOtp />} />
              <Route
                path="/app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route path='/app/dashboard' element={<DashboardLayout />} />
                <Route path='/app/deposit' element={<Pages />} />
                <Route path='/app/withdraw' element={<Pages />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>

            <Toaster
              position="top-center"
              gutter={12}
              containerStyle={{ margin: '0.5rem' }}
              toastOptions={{
                success: {
                  duration: 3000,
                },
                error: {
                  duration: 3000,
                },
                style: {
                  fontSize: '1rem',
                  maxWidth: '31.25rem',
                  padding: '1rem 1.5rem',
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  animation: 'fade-in 0.5s',
                  borderRadius: '0.4rem',
                },
              }}
            />
          </ScrollToTop>
        </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;