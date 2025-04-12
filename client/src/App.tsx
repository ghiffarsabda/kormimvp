import { Switch, Route } from "wouter";
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

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/sports" component={Sports} />
      <Route path="/events" component={Events} />
      <Route path="/news" component={News} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/contact" component={Contact} />
      <Route path="/join" component={Join} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen bg-[#F5F7FA] text-[#333333]">
        <Header />
        <main className="flex-grow">
          <Router />
        </main>
        <Footer />
        <BackToTop />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
