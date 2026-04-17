import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/layout/AppLayout";
import NotFound from "@/pages/not-found";
import Login from "@/pages/Login";
import AdminDashboard from "@/pages/AdminDashboard";
import StudentDashboard from "@/pages/StudentDashboard";
import { useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function ProtectedRoute({ component: Component, allowedRole }: { component: any, allowedRole: string }) {
  const { user, isAuthenticated } = useAuth();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/");
    } else if (user?.role !== allowedRole) {
      setLocation(user?.role === "admin" ? "/admin" : "/student");
    }
  }, [isAuthenticated, user, allowedRole, location, setLocation]);

  if (!isAuthenticated || user?.role !== allowedRole) {
    return null;
  }

  return <Component />;
}

function PublicRoute({ component: Component }: { component: any }) {
  const { user, isAuthenticated } = useAuth();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (isAuthenticated && location === "/") {
      setLocation(user?.role === "admin" ? "/admin" : "/student");
    }
  }, [isAuthenticated, user, location, setLocation]);

  if (isAuthenticated && location === "/") {
    return null;
  }

  return <Component />;
}

function Router() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={() => <PublicRoute component={Login} />} />
        <Route path="/admin" component={() => <ProtectedRoute component={AdminDashboard} allowedRole="admin" />} />
        <Route path="/student" component={() => <ProtectedRoute component={StudentDashboard} allowedRole="student" />} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
