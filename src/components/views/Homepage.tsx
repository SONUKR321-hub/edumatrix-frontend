import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  GraduationCap, 
  Users, 
  CreditCard, 
  CalendarClock, 
  ShieldCheck, 
  Star, 
  Play,
  ChevronRight,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Building2,
  Sparkles,
  BarChart3,
  MessageSquare,
  BookOpen,
  Award,
  Globe,
  Zap,
  Heart
} from 'lucide-react';

interface HomepageProps {
  onEnterDashboard: () => void;
}

/* ─── AUTH MODAL ─── */
const AuthModal: React.FC<{
  mode: 'login' | 'register';
  onClose: () => void;
  onSwitch: () => void;
  onSuccess: () => void;
}> = ({ mode, onClose, onSwitch, onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    password: '',
    role: 'owner'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Frosted backdrop */}
      <div className="absolute inset-0 bg-stone-950/30 backdrop-blur-md" />

      <div
        className="relative w-full max-w-md bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-stone-200/60"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative top accent */}
        <div className="h-1.5 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400" />

        <div className="p-8 sm:p-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-amber-500/20">
              E
            </div>
            <div>
              <h2 className="text-xl font-bold text-stone-900 tracking-tight">
                {mode === 'login' ? 'Welcome back' : 'Create your account'}
              </h2>
              <p className="text-sm text-stone-500">
                {mode === 'login' ? 'Sign in to your EduMatrix workspace' : 'Start your 14-day free trial'}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {mode === 'register' && (
              <>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-400 transition-all"
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="tel"
                    placeholder="Phone number (+91)"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-400 transition-all"
                  />
                </div>

                <div className="relative">
                  <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Institution name"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-400 transition-all"
                  />
                </div>
              </>
            )}

            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-400 transition-all"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-11 pr-12 py-3.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-400 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {mode === 'login' && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-stone-600 cursor-pointer select-none">
                  <input type="checkbox" className="rounded border-stone-300 text-amber-500 focus:ring-amber-400" />
                  <span>Remember me</span>
                </label>
                <button className="text-amber-600 hover:text-amber-700 font-medium">
                  Forgot password?
                </button>
              </div>
            )}

            {mode === 'register' && (
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-400 appearance-none cursor-pointer"
              >
                <option value="owner">I'm a School Owner / Director</option>
                <option value="teacher">I'm a Teacher / Faculty</option>
                <option value="parent">I'm a Parent / Guardian</option>
              </select>
            )}

            <button
              onClick={onSuccess}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg shadow-amber-500/25 active:scale-[0.98] text-sm"
            >
              {mode === 'login' ? 'Sign in to EduMatrix' : 'Create free account'}
            </button>

            {mode === 'register' && (
              <p className="text-[11px] text-stone-400 text-center leading-relaxed">
                By creating an account, you agree to our Terms of Service and Privacy Policy.
                No credit card required for 14-day trial.
              </p>
            )}
          </div>

          {/* Separator */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-stone-200" />
            <span className="text-xs text-stone-400">or continue with</span>
            <div className="flex-1 h-px bg-stone-200" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-stone-700 hover:bg-stone-100 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-stone-700 hover:bg-stone-100 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/></svg>
              Apple ID
            </button>
          </div>

          {/* Switch Mode */}
          <p className="text-center text-sm text-stone-500 mt-6">
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button onClick={onSwitch} className="text-amber-600 hover:text-amber-700 font-semibold">
              {mode === 'login' ? 'Sign up free' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};


/* ─── MAIN HOMEPAGE ─── */
export const Homepage: React.FC<HomepageProps> = ({ onEnterDashboard }) => {
  const [authMode, setAuthMode] = useState<'login' | 'register' | null>(null);

  const features = [
    {
      icon: Users,
      title: 'Student Management',
      desc: 'Complete 360° student profiles with enrollment, academics, attendance, and parent contact in one view.',
      img: '/images/students.png'
    },
    {
      icon: CalendarClock,
      title: 'Smart Timetabling',
      desc: 'AI-powered scheduling that detects faculty and room conflicts before they happen.',
      img: '/images/dashboard.png'
    },
    {
      icon: CreditCard,
      title: 'Fee Collection',
      desc: 'Instant UPI payments, auto-generated receipts, and real-time ledger reconciliation.',
      img: '/images/teacher.png'
    }
  ];

  const stats = [
    { value: '450+', label: 'Schools Trust Us' },
    { value: '2.4L', label: 'Students Managed' },
    { value: '99.9%', label: 'Uptime Guarantee' },
    { value: '< 30s', label: 'Attendance Marking' }
  ];

  const testimonials = [
    {
      quote: "EduMatrix replaced 6 different tools we were juggling. Now everything is in one calm, beautiful workspace.",
      name: 'Dr. Priya Menon',
      role: 'Principal, Modern Academy Kochi',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=80'
    },
    {
      quote: "Fee collection improved by 38% in the first quarter. Parents love the instant UPI receipts.",
      name: 'Rajesh Agarwal',
      role: 'Director, DAV Public School Jaipur',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=96&q=80'
    },
    {
      quote: "Attendance marking went from 15 minutes to 30 seconds. My teachers actually enjoy using it.",
      name: 'Sunita Krishnan',
      role: 'VP Academics, Greenfield International',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=96&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF8] font-sans text-stone-900 selection:bg-amber-100 selection:text-amber-900">

      {/* ━━━━━━━━ NAVIGATION ━━━━━━━━ */}
      <nav className="sticky top-0 z-40 bg-[#FAFAF8]/80 backdrop-blur-xl border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-amber-500/20">
              E
            </div>
            <span className="font-bold text-lg text-stone-900 tracking-tight">
              EduMatrix
            </span>
          </div>

          {/* Nav Links (Desktop) */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <a href="#features" className="hover:text-stone-900 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-stone-900 transition-colors">How it works</a>
            <a href="#testimonials" className="hover:text-stone-900 transition-colors">Testimonials</a>
            <a href="#pricing" className="hover:text-stone-900 transition-colors">Pricing</a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAuthMode('login')}
              className="px-4 py-2 text-sm font-semibold text-stone-700 hover:text-stone-900 transition-colors"
            >
              Log in
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-stone-900 rounded-xl hover:bg-stone-800 transition-all shadow-lg shadow-stone-900/10 active:scale-[0.97]"
            >
              Start free trial
            </button>
          </div>
        </div>
      </nav>


      {/* ━━━━━━━━ HERO SECTION ━━━━━━━━ */}
      <section className="relative overflow-hidden">
        {/* Subtle warm gradient orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-orange-200/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Copy */}
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/60 text-amber-700 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Trusted by 450+ Indian schools</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-stone-900 tracking-tight leading-[1.1]">
                The calm OS for
                <span className="relative inline-block ml-3">
                  <span className="relative z-10">modern</span>
                  <span className="absolute -bottom-1 left-0 right-0 h-3 bg-amber-200/50 -rotate-1 rounded-sm" />
                </span>
                <br />
                education.
              </h1>

              <p className="text-lg text-stone-500 leading-relaxed max-w-lg">
                Replace scattered spreadsheets, WhatsApp chaos, and paper registers with one beautiful, unified workspace that your entire institution will love.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setAuthMode('register')}
                  className="group px-7 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-xl shadow-amber-500/25 active:scale-[0.97] flex items-center gap-2"
                >
                  Start free for 14 days
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={onEnterDashboard}
                  className="group px-6 py-3.5 text-sm font-semibold text-stone-700 bg-white border border-stone-200 rounded-xl hover:border-stone-300 hover:bg-stone-50 transition-all shadow-sm flex items-center gap-2"
                >
                  <Play className="w-4 h-4 text-amber-500" />
                  See live demo
                </button>
              </div>

              {/* Social Proof Micro */}
              <div className="flex items-center gap-3 pt-4">
                <div className="flex -space-x-2">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=40&q=80" className="w-8 h-8 rounded-full border-2 border-[#FAFAF8] object-cover" alt="" />
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=40&q=80" className="w-8 h-8 rounded-full border-2 border-[#FAFAF8] object-cover" alt="" />
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=40&q=80" className="w-8 h-8 rounded-full border-2 border-[#FAFAF8] object-cover" alt="" />
                  <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=40&q=80" className="w-8 h-8 rounded-full border-2 border-[#FAFAF8] object-cover" alt="" />
                </div>
                <div className="text-xs text-stone-500">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="font-semibold text-stone-700 ml-1">4.9</span>
                  </div>
                  <span>from 200+ school reviews</span>
                </div>
              </div>
            </div>

            {/* Right: Hero Visual */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-stone-900/10 border border-stone-200/50">
                <img
                  src="/images/hero.png"
                  alt="EduMatrix modern classroom"
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                {/* Floating card overlays */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/50 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-900">Attendance saved</p>
                    <p className="text-[11px] text-stone-500">Class 10B — 38/40 present</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/50">
                  <p className="text-xs font-bold text-stone-900 tabular-nums">₹34.8L</p>
                  <p className="text-[11px] text-stone-500">Collected this month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ━━━━━━━━ TRUST LOGOS BAR ━━━━━━━━ */}
      <section className="border-y border-stone-200/50 bg-white/50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
          <p className="text-center text-xs font-semibold text-stone-400 uppercase tracking-widest mb-6">
            Trusted by leading institutions across India
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-stone-300">
            {['Delhi Public School', 'Ryan International', 'Modern Academy', 'DAV Group', 'Greenfield Intl', 'Narayana Schools'].map((name) => (
              <span key={name} className="text-sm font-bold tracking-tight text-stone-300 hover:text-stone-500 transition-colors cursor-default">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>


      {/* ━━━━━━━━ STATS BAR ━━━━━━━━ */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-6 bg-white rounded-2xl border border-stone-100 shadow-sm">
              <div className="text-3xl sm:text-4xl font-extrabold text-stone-900 tabular-nums tracking-tight">
                {stat.value}
              </div>
              <p className="text-sm text-stone-500 mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>


      {/* ━━━━━━━━ FEATURES SECTION ━━━━━━━━ */}
      <section id="features" className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold text-amber-600 uppercase tracking-widest">Features</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-3 tracking-tight">
            Everything your institution needs
          </h2>
          <p className="text-stone-500 mt-3 max-w-lg mx-auto">
            From daily attendance to annual compliance — one platform, zero friction.
          </p>
        </div>

        <div className="space-y-20">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const isReversed = i % 2 === 1;
            return (
              <div key={feature.title} className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${isReversed ? 'lg:direction-rtl' : ''}`}>
                {/* Image Side */}
                <div className={`${isReversed ? 'lg:order-2' : ''}`}>
                  <div className="rounded-2xl overflow-hidden shadow-xl shadow-stone-900/5 border border-stone-200/50">
                    <img
                      src={feature.img}
                      alt={feature.title}
                      className="w-full h-72 sm:h-80 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://images.unsplash.com/photo-${i === 0 ? '1523240795612-9a054b0db644' : i === 1 ? '1497633762265-9d179a990aa6' : '1524178232363-1fb2b075b655'}?auto=format&fit=crop&w=800&q=80`;
                      }}
                    />
                  </div>
                </div>

                {/* Text Side */}
                <div className={`space-y-5 ${isReversed ? 'lg:order-1' : ''}`}>
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/50 flex items-center justify-center text-amber-600">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900 tracking-tight">{feature.title}</h3>
                  <p className="text-stone-500 leading-relaxed">{feature.desc}</p>
                  <ul className="space-y-2.5 text-sm text-stone-600">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>Works on any device — mobile, tablet, desktop</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>Real-time sync across all staff members</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>Export-ready for UDISE+ and board compliance</span>
                    </li>
                  </ul>
                  <button className="group inline-flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700 mt-2">
                    Learn more
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* ━━━━━━━━ HOW IT WORKS ━━━━━━━━ */}
      <section id="how-it-works" className="bg-white border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold text-amber-600 uppercase tracking-widest">How it works</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-3 tracking-tight">
              Up and running in 3 simple steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                icon: Globe,
                title: 'Sign up & configure',
                desc: 'Create your account, add your institution details, class sections, and staff. Takes under 10 minutes.'
              },
              {
                step: '02',
                icon: Users,
                title: 'Import your data',
                desc: 'Upload existing student records via CSV or add them manually. We handle the migration.'
              },
              {
                step: '03',
                icon: Zap,
                title: 'Go live instantly',
                desc: 'Start marking attendance, collecting fees, and managing timetables from day one. No training needed.'
              }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="relative p-7 rounded-2xl bg-stone-50/50 border border-stone-100 group hover:bg-white hover:shadow-lg hover:shadow-stone-900/5 transition-all">
                  <span className="text-5xl font-extrabold text-stone-100 group-hover:text-amber-100 absolute top-5 right-6 transition-colors tabular-nums">
                    {item.step}
                  </span>
                  <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200/40 flex items-center justify-center text-amber-600 mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-stone-900">{item.title}</h4>
                  <p className="text-sm text-stone-500 mt-2 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ━━━━━━━━ TESTIMONIALS ━━━━━━━━ */}
      <section id="testimonials" className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold text-amber-600 uppercase tracking-widest">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-3 tracking-tight">
            Loved by educators across India
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="p-7 bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-md hover:shadow-stone-900/5 transition-all">
              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-stone-600 leading-relaxed mb-6">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-bold text-stone-900">{t.name}</p>
                  <p className="text-xs text-stone-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ━━━━━━━━ PRICING ━━━━━━━━ */}
      <section id="pricing" className="bg-white border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold text-amber-600 uppercase tracking-widest">Pricing</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-3 tracking-tight">
              Simple, transparent pricing
            </h2>
            <p className="text-stone-500 mt-3 max-w-md mx-auto">
              No setup fees. No hidden charges. Cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Starter */}
            <div className="p-7 rounded-2xl border border-stone-200 bg-[#FAFAF8] space-y-5">
              <div>
                <h3 className="font-bold text-lg text-stone-900">Coaching</h3>
                <p className="text-xs text-stone-500 mt-1">For tutors & small coaching centers</p>
              </div>
              <div>
                <span className="text-4xl font-extrabold text-stone-900 tabular-nums">₹18</span>
                <span className="text-sm text-stone-500 ml-1">/ student / month</span>
              </div>
              <ul className="space-y-2.5 text-sm text-stone-600">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Up to 300 students</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Attendance & SMS alerts</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" /> UPI fee collection</li>
              </ul>
              <button
                onClick={() => setAuthMode('register')}
                className="w-full py-3 text-sm font-semibold text-stone-700 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 transition-all"
              >
                Start free trial
              </button>
            </div>

            {/* Pro (Popular) */}
            <div className="relative p-7 rounded-2xl border-2 border-amber-400 bg-white shadow-xl shadow-amber-500/10 space-y-5">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg shadow-amber-500/25">
                Most Popular
              </div>
              <div>
                <h3 className="font-bold text-lg text-stone-900">School OS</h3>
                <p className="text-xs text-stone-500 mt-1">For K-12 schools & institutions</p>
              </div>
              <div>
                <span className="text-4xl font-extrabold text-amber-600 tabular-nums">₹35</span>
                <span className="text-sm text-stone-500 ml-1">/ student / month</span>
              </div>
              <ul className="space-y-2.5 text-sm text-stone-600">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Unlimited students & staff</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Timetable conflict engine</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" /> UDISE+ compliance exports</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Parent & student portals</li>
              </ul>
              <button
                onClick={() => setAuthMode('register')}
                className="w-full py-3 text-sm font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg shadow-amber-500/20"
              >
                Start free trial
              </button>
            </div>

            {/* Enterprise */}
            <div className="p-7 rounded-2xl border border-stone-200 bg-[#FAFAF8] space-y-5">
              <div>
                <h3 className="font-bold text-lg text-stone-900">Enterprise</h3>
                <p className="text-xs text-stone-500 mt-1">For chains & education groups</p>
              </div>
              <div>
                <span className="text-4xl font-extrabold text-stone-900">Custom</span>
              </div>
              <ul className="space-y-2.5 text-sm text-stone-600">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Multi-campus governance</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Custom ERP integrations</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Dedicated account manager</li>
              </ul>
              <button className="w-full py-3 text-sm font-semibold text-stone-700 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 transition-all">
                Contact sales
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* ━━━━━━━━ FINAL CTA ━━━━━━━━ */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 p-10 sm:p-16 text-center">
          {/* Subtle glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to transform your institution?
            </h2>
            <p className="text-stone-400 max-w-lg mx-auto">
              Join 450+ schools already running on EduMatrix. No credit card needed. Set up in under 10 minutes.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setAuthMode('register')}
                className="group px-8 py-4 text-sm font-semibold text-stone-900 bg-white rounded-xl hover:bg-stone-100 transition-all shadow-xl flex items-center gap-2"
              >
                Start your free trial
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={onEnterDashboard}
                className="px-8 py-4 text-sm font-semibold text-stone-300 border border-stone-700 rounded-xl hover:border-stone-500 hover:text-white transition-all"
              >
                View live demo
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* ━━━━━━━━ FOOTER ━━━━━━━━ */}
      <footer className="border-t border-stone-200/50 bg-white/50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold shadow-md shadow-amber-500/15">
                  E
                </div>
                <span className="font-bold text-stone-900">EduMatrix</span>
              </div>
              <p className="text-xs text-stone-500 leading-relaxed">
                The calm, modern operating system for educational institutions across India.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-stone-900 mb-3">Product</h4>
              <ul className="space-y-2 text-stone-500">
                <li><a href="#features" className="hover:text-stone-900">Features</a></li>
                <li><a href="#pricing" className="hover:text-stone-900">Pricing</a></li>
                <li><a href="#" className="hover:text-stone-900">Integrations</a></li>
                <li><a href="#" className="hover:text-stone-900">Changelog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-stone-900 mb-3">Company</h4>
              <ul className="space-y-2 text-stone-500">
                <li><a href="#" className="hover:text-stone-900">About us</a></li>
                <li><a href="#" className="hover:text-stone-900">Careers</a></li>
                <li><a href="#" className="hover:text-stone-900">Blog</a></li>
                <li><a href="#" className="hover:text-stone-900">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-stone-900 mb-3">Legal</h4>
              <ul className="space-y-2 text-stone-500">
                <li><a href="#" className="hover:text-stone-900">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-stone-900">Terms of Service</a></li>
                <li><a href="#" className="hover:text-stone-900">DPDP Compliance</a></li>
                <li><a href="#" className="hover:text-stone-900">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400">
            <p>© 2026 EduMatrix Technologies Pvt. Ltd. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> UDISE+ Compliant</span>
              <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> DPDP Act 2023</span>
              <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> Made in India</span>
            </div>
          </div>
        </div>
      </footer>


      {/* ━━━━━━━━ AUTH MODAL ━━━━━━━━ */}
      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
          onSwitch={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
          onSuccess={() => {
            setAuthMode(null);
            onEnterDashboard();
          }}
        />
      )}
    </div>
  );
};

export default Homepage;
