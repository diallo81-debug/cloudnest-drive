import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Cloud, 
  Shield, 
  Zap, 
  Users, 
  ArrowRight, 
  Check,
  FolderOpen,
  Share2,
  Lock
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: FolderOpen,
    title: 'Smart Organization',
    description: 'Keep your files organized with intelligent folder structures and quick search.',
  },
  {
    icon: Share2,
    title: 'Easy Sharing',
    description: 'Share files and folders with anyone, with granular permission controls.',
  },
  {
    icon: Lock,
    title: 'Secure Storage',
    description: 'Your files are encrypted and protected with enterprise-grade security.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Upload and access your files instantly from anywhere in the world.',
  },
];

const stats = [
  { value: '10M+', label: 'Files stored' },
  { value: '99.9%', label: 'Uptime' },
  { value: '150+', label: 'Countries' },
  { value: '4.9/5', label: 'User rating' },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Logo size="sm" />
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="gradient-primary shadow-glow">
                Get started free
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Cloud className="h-4 w-4" />
              Cloud storage reimagined
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Your files,{' '}
              <span className="gradient-text">everywhere</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Store, share, and collaborate on files with your team. 
              CloudNest gives you 15GB free storage with enterprise-grade security.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="gradient-primary shadow-glow h-12 px-8">
                  Start for free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-12 px-8">
                Watch demo
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-success" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-success" />
                15GB free storage
              </div>
            </div>
          </motion.div>

          {/* Hero Image / Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 relative"
          >
            <div className="absolute inset-0 gradient-primary opacity-10 blur-3xl rounded-3xl" />
            <div className="relative glass rounded-2xl border shadow-xl overflow-hidden">
              <div className="h-8 bg-secondary/50 flex items-center gap-2 px-4 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-warning/60" />
                <div className="w-3 h-3 rounded-full bg-success/60" />
              </div>
              <div className="p-8 bg-gradient-to-br from-background to-secondary/20">
                <div className="grid grid-cols-4 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.05 }}
                      className="aspect-square rounded-xl bg-card border border-border p-4 flex flex-col items-center justify-center gap-2"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FolderOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div className="w-full h-2 bg-secondary rounded" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features to help you manage, share, and protect your files
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group glass rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 shadow-glow group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="gradient-primary rounded-3xl p-10 md:p-16 text-center text-primary-foreground relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="relative">
              <div className="flex justify-center mb-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-primary-foreground/20 border-2 border-primary-foreground/30 flex items-center justify-center"
                    >
                      <Users className="h-4 w-4" />
                    </div>
                  ))}
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Join 100,000+ teams using CloudNest
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                Start storing and sharing your files securely today. 
                No credit card required to get started.
              </p>
              <Link to="/register">
                <Button 
                  size="lg" 
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 h-12 px-8"
                >
                  Get started for free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Logo size="sm" />
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 CloudNest. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
