import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import BackToTop from "@/components/layout/back-to-top";
import Home from "@/pages/home";
import About from "@/pages/about";
import Sports from "@/pages/sports";
import Events from "@/pages/events";
import News from "@/pages/news";
import Gallery from "@/pages/gallery";
import Contact from "@/pages/contact";
import Join from "@/pages/join";
import OrganizationDetails from "@/pages/organization-details";
import NewsDetails from "@/pages/news-details";
import AdminDashboard from "@/pages/admin";
import AdminLogin from "@/pages/admin/login";
import { AdminAuthProvider, useAdminAuth } from "@/hooks/use-auth-admin";
import { useEffect } from "react";

// Protected route component for admin
const AdminProtectedRoute = ({ component: Component }: { component: React.ComponentType }) => {
  const { isAuthenticated } = useAdminAuth();
  const [, navigate] = useLocation();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [isAuthenticated, navigate]);
  
  return isAuthenticated ? <Component /> : null;
};

// Routes that are wrapped with layout (header, footer)
const LayoutRoutes = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F7FA] text-[#333333]">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/sports" component={Sports} />
          <Route path="/sports/:id" component={OrganizationDetails} />
          <Route path="/events" component={Events} />
          <Route path="/news" component={News} />
          <Route path="/news/:id" component={NewsDetails} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/contact" component={Contact} />
          <Route path="/join" component={Join} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

// Admin routes without the main layout
const AdminRoutes = () => {
  return (
    <Switch>
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin">
        <AdminProtectedRoute component={AdminDashboard} />
      </Route>
    </Switch>
  );
};

// Main router that determines which set of routes to use
const AppRoutes = () => {
  const [location] = useLocation();
  
  // Check if current path is admin-related
  if (location.startsWith("/admin")) {
    return <AdminRoutes />;
  }
  
  return <LayoutRoutes />;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminAuthProvider>
        <AppRoutes />
        <Toaster />
      </AdminAuthProvider>
    </QueryClientProvider>
  );
}

export default App;
