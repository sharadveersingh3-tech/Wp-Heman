import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Send, 
  Sparkles, 
  Briefcase, 
  Layers, 
  DollarSign, 
  Calendar, 
  MessageSquare, 
  Mail, 
  Phone, 
  CheckCircle, 
  User, 
  Globe, 
  Sliders, 
  ChevronRight, 
  ShieldCheck,
  UserCheck,
  ExternalLink,
  MessageCircle,
  Clock,
  Check,
  X,
  FileText
} from 'lucide-react';

interface ProjectLead {
  id: string;
  clientName: string;
  contactPerson: string;
  email: string;
  phone: string;
  projectPillar: string;
  budget: string;
  timeline: string;
  description: string;
  submittedAt: string;
  status: 'new' | 'contacted' | 'discussion' | 'closed';
}

interface StudioProfile {
  studioName: string;
  ownerName: string;
  email: string;
  phone: string;
  location: string;
  primaryService: string;
  startingRate: string;
  bio: string;
}

const DEFAULT_PROFILE: StudioProfile = {
  studioName: "ADVYS STUDIO",
  ownerName: "Advys Creative Team",
  email: "srdkarlos4@gmail.com",
  phone: "+91 98765 43210",
  location: "Mumbai, India",
  primaryService: "Premium Creative Services & UI/UX Design",
  startingRate: "$10,000",
  bio: "We help premier brands build beautiful, high-conversion interfaces and cinematic assets that stand at the pinnacle of their respective industries."
};

const SAMPLE_LEADS: ProjectLead[] = [
  {
    id: "lead-1",
    clientName: "Valo Capital",
    contactPerson: "Arjun Mehta",
    email: "arjun@valocapital.com",
    phone: "+91 99887 76655",
    projectPillar: "UI/UX Design",
    budget: "$15k - $30k",
    timeline: "1 - 3 months",
    description: "We are designing a new dashboard for high-net-worth wealth management. Need a highly aesthetic, minimal, dark mode interface reminiscent of Linear or Vercel.",
    submittedAt: new Date(Date.now() - 36 * 3600 * 1000).toLocaleString(),
    status: 'new'
  },
  {
    id: "lead-2",
    clientName: "Nirvana Hotels & Resorts",
    contactPerson: "Sarah D'Souza",
    email: "sarah@nirvanaescapes.com",
    phone: "+91 91234 56789",
    projectPillar: "Brand Identity & Videography",
    budget: "$30k - $50k",
    timeline: "Immediate (1 month)",
    description: "Launch of our premium boutique villas in Goa. We need creative direction, high-fashion lifestyle photoshoots, brand films, and social content to drive pre-bookings.",
    submittedAt: new Date(Date.now() - 6 * 3600 * 1000).toLocaleString(),
    status: 'contacted'
  }
];

export default function ProjectOnboarding({ navigateTo }: { navigateTo: (view: any) => void }) {
  const [activeTab, setActiveTab] = useState<'client_brief' | 'studio_profile' | 'leads_manager'>('client_brief');
  
  // State for client brief form fields (all mandatory)
  const [clientName, setClientName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [projectPillar, setProjectPillar] = useState('UI/UX Design');
  const [budget, setBudget] = useState('$15k - $30k');
  const [timeline, setTimeline] = useState('1 - 3 months');
  const [description, setDescription] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Email delivery target
  const [recipientEmail, setRecipientEmail] = useState('srdkarlos4@gmail.com');
  const [lastSubmittedLead, setLastSubmittedLead] = useState<ProjectLead | null>(null);
  const [copiedText, setCopiedText] = useState(false);
  
  // Wizard steps for client brief
  const [formStep, setFormStep] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Leads state
  const [leads, setLeads] = useState<ProjectLead[]>([]);
  // Profile state
  const [profile, setProfile] = useState<StudioProfile>(DEFAULT_PROFILE);

  // Load from local storage
  useEffect(() => {
    const savedLeads = localStorage.getItem('advys_client_leads');
    if (savedLeads) {
      try {
        setLeads(JSON.parse(savedLeads));
      } catch (e) {
        setLeads(SAMPLE_LEADS);
      }
    } else {
      setLeads(SAMPLE_LEADS);
      localStorage.setItem('advys_client_leads', JSON.stringify(SAMPLE_LEADS));
    }

    const savedProfile = localStorage.getItem('advys_studio_profile');
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setProfile(parsed);
        if (parsed.email) {
          setRecipientEmail(parsed.email);
        }
      } catch (e) {
        setProfile(DEFAULT_PROFILE);
      }
    }
  }, []);

  // Save Leads to LocalStorage
  const saveLeadsToStorage = (updatedLeads: ProjectLead[]) => {
    setLeads(updatedLeads);
    localStorage.setItem('advys_client_leads', JSON.stringify(updatedLeads));
  };

  // Copy structured brief to clipboard
  const copyLeadToClipboard = (lead: ProjectLead) => {
    const text = `PROJECT BRIEFING PACKAGE - SENT VIA ADVYS STUDIO
===================================================

[STUDIO RECIPIENT INBOX]
Email Desk: ${recipientEmail}

[CLIENT CLASSIFICATION]
Legal Brand Name: ${lead.clientName}
Inquiry Contact:  ${lead.contactPerson}

[VERIFIED CONNECTION CHANNELS]
Email Address:    ${lead.email}
Phone Connection: ${lead.phone}

[ASSIGNMENT PARAMETERS]
Creative Pillar:  ${lead.projectPillar}
Project Budget:   ${lead.budget}
Delivery Roadmap: ${lead.timeline}

[CORE OBJECTIVES & SCOPE NARRATIVE]
---------------------------------------------------
${lead.description}
---------------------------------------------------

Submitted via Advys Studio Onboarding Platform at ${lead.submittedAt}`;
    
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  // Generate mailto link
  const getSubmissionMailTo = (lead: ProjectLead) => {
    const subject = encodeURIComponent(`[Advys Briefing] Project Intake: ${lead.clientName} - ${lead.projectPillar}`);
    const body = encodeURIComponent(`PROJECT INITIATION BRIEFING
===========================

STUDIO DELIVERY DESTINATION:
Recipient Email Desk: ${recipientEmail}

CLIENT SPECIFICATIONS:
Legal Corporate Brand: ${lead.clientName}
Representative:        ${lead.contactPerson}

CLIENT CHANNEL PATHS:
Business Email:  ${lead.email}
Direct Phone:    ${lead.phone}

ROADMAP DEFINITIONS:
Assigned Service: ${lead.projectPillar}
Investment Cap:   ${lead.budget}
Timeline Slot:    ${lead.timeline}

IN-DEPTH VENTURE GOALS & OBJECTIVES:
------------------------------------
${lead.description}

------------------------------------
Submitted securely via Studio Onboarding Desk.
Dynamic Local Timestamp: ${lead.submittedAt}`);

    return `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
  };

  // Submit Client Brief
  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final validations
    if (!clientName || !contactPerson || !clientEmail || !clientPhone || !description) {
      setValidationError('Please complete all fields to submit.');
      return;
    }
    if (!agreeTerms) {
      setValidationError('You must agree to share these project brief details.');
      return;
    }

    const newLead: ProjectLead = {
      id: `lead-${Date.now()}`,
      clientName,
      contactPerson,
      email: clientEmail,
      phone: clientPhone,
      projectPillar,
      budget,
      timeline,
      description,
      submittedAt: new Date().toLocaleString(),
      status: 'new'
    };

    const updated = [newLead, ...leads];
    saveLeadsToStorage(updated);
    setLastSubmittedLead(newLead);
    setFormSubmitted(true);
    setValidationError('');

    // Clear form inputs
    setClientName('');
    setContactPerson('');
    setClientEmail('');
    setClientPhone('');
    setDescription('');
    setAgreeTerms(false);
  };

  const handleNextStep = () => {
    if (formStep === 1) {
      if (!clientName.trim() || !contactPerson.trim()) {
        setValidationError('Both legal company name and contact person are required.');
        return;
      }
    } else if (formStep === 2) {
      if (!clientEmail.trim() || !clientPhone.trim()) {
        setValidationError('Both business email and connection phone number are required.');
        return;
      }
      // Simple email validation pattern
      if (!clientEmail.includes('@')) {
        setValidationError('Please provide a valid business email.');
        return;
      }
    } else if (formStep === 3) {
      if (!description.trim() || description.length < 15) {
        setValidationError('Please provide a concrete outline of your goals (at least 15 characters).');
        return;
      }
    }
    setValidationError('');
    setFormStep(p => p + 1);
  };

  // Save Profile update
  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('advys_studio_profile', JSON.stringify(profile));
    // Brief toast simulation or indicator
    alert('Studio profile details saved successfully!');
  };

  // Update lead status
  const updateLeadStatus = (id: string, nextStatus: ProjectLead['status']) => {
    const updated = leads.map(l => l.id === id ? { ...l, status: nextStatus } : l);
    saveLeadsToStorage(updated);
  };

  // Delete lead
  const deleteLead = (id: string) => {
    if (confirm('Are you sure you want to dismiss this lead?')) {
      const updated = leads.filter(l => l.id !== id);
      saveLeadsToStorage(updated);
    }
  };

  // Pre-formatted messages for connecting
  const getMailToLink = (lead: ProjectLead) => {
    const subject = encodeURIComponent(`Project Collaboration Inquiry: ${lead.projectPillar}`);
    const body = encodeURIComponent(`Hi ${lead.contactPerson},\n\nThank you for reaching out to ${profile.studioName} with your project details regarding ${lead.projectPillar}!\n\nWe read your brief ("${lead.description.substring(0, 100)}...") and we think your budget of ${lead.budget} and timeline of ${lead.timeline} is a perfect potential fit for our current development slot.\n\nLet's jump on a quick 15-minute discovery call to align goals next week.\n\nBest regards,\n${profile.ownerName}\n${profile.studioName}`);
    return `mailto:${lead.email}?subject=${subject}&body=${body}`;
  };

  const getWhatsAppLink = (lead: ProjectLead) => {
    const cleanedPhone = lead.phone.replace(/[^0-9+]/g, '');
    const message = encodeURIComponent(`Hi ${lead.contactPerson}, this is ${profile.ownerName} from ${profile.studioName}. We received your intake brief regarding a potential "${lead.projectPillar}" project and would love to connect. Let us know a good time to call!`);
    return `https://wa.me/${cleanedPhone}?text=${message}`;
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-gold selection:text-black pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
      {/* Background ambient gold glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[300px] h-[300px] bg-gold/5 rounded-full filter blur-[100px] pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Header navigation section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 border-b border-white/5 pb-8">
          <div>
            <button 
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2 text-white/50 hover:text-gold transition-colors text-xs uppercase tracking-widest font-sans mb-4 group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Return to Studio Interface
            </button>
            <h1 className="text-4xl md:text-5xl font-serif leading-none uppercase tracking-tight">
              Studio <span className="italic text-gold">Onboarding</span> & Connect
            </h1>
            <p className="text-white/40 text-sm mt-2 font-sans font-light">
              Submit your inquiry project briefs, manage studio credentials, and establish client connections.
            </p>
          </div>


        </div>

        {/* Tab content area */}
        <AnimatePresence mode="wait">
          
          {/* CLIENT BRIEF INTAKE TAB */}
          {activeTab === 'client_brief' && (
            <motion.div
              key="client_brief"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              {formSubmitted ? (
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-zinc-950 border border-gold/30 rounded-lg p-10 md:p-16 text-center shadow-[0_0_50px_rgba(201,168,76,0.1)]"
                >
                  <div className="w-20 h-20 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif text-white uppercase tracking-tight mb-4">
                    Brief <span className="italic text-gold">Locked In</span> Successfully!
                  </h3>
                  <p className="text-white/50 text-sm max-w-md mx-auto mb-8 font-sans leading-relaxed">
                    Thank you. Your inquiry details have been saved to local workspace storage and are immediately available to view in our <strong>Inquiries Hub</strong> for studio review.
                  </p>
                  
                  {lastSubmittedLead && (
                    <div className="space-y-6 max-w-lg mx-auto text-left mb-10">
                      <div className="bg-zinc-900 border border-white/5 rounded-md p-6 text-xs text-white/70 space-y-2 font-mono">
                        <p className="text-gold/80 font-bold uppercase tracking-widest text-[9px] mb-3">Submission Snapshot</p>
                        <p><span className="text-white/40">CLIENT:</span> {lastSubmittedLead.contactPerson} at {lastSubmittedLead.clientName || 'Private client'}</p>
                        <p><span className="text-white/40">CLASSIFICATION:</span> {lastSubmittedLead.projectPillar}</p>
                        <p><span className="text-white/40">INVESTMENT RANGE:</span> {lastSubmittedLead.budget}</p>
                        <p><span className="text-white/40">STATUS:</span> Pending Studio Correspondence</p>
                      </div>

                      {/* Recipient dispatch option */}
                      <div className="bg-zinc-900/40 border border-gold/20 rounded-md p-6 space-y-4">
                        <div className="flex items-center gap-2">
                          <Mail size={16} className="text-gold" />
                          <h4 className="text-xs font-sans font-bold uppercase tracking-widest text-white/90">Transmit Briefing Package</h4>
                        </div>
                        <p className="text-[11px] text-white/55 font-sans leading-relaxed">
                          We can format and dispatch a full briefing package directly to your choice of email ID. Customize the destination email address below:
                        </p>
                        
                        <div className="grid grid-cols-1 gap-2">
                          <label className="text-[9px] font-sans font-bold uppercase tracking-widest text-white/40">Send To Email ID</label>
                          <input
                            type="email"
                            value={recipientEmail}
                            onChange={(e) => setRecipientEmail(e.target.value)}
                            placeholder="e.g., target-email@domain.com"
                            className="bg-zinc-950 border border-white/10 rounded-md p-3 text-xs text-white focus:outline-none focus:border-gold transition-colors font-mono"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          <a
                            href={getSubmissionMailTo(lastSubmittedLead)}
                            className="bg-gold text-black hover:bg-gold/80 transition-all py-3 rounded-md text-[10px] font-bold uppercase tracking-widest text-center flex items-center justify-center gap-2 font-sans"
                          >
                            <Send size={12} />
                            Send via Email
                          </a>
                          <button
                            type="button"
                            onClick={() => copyLeadToClipboard(lastSubmittedLead)}
                            className="border border-white/15 hover:border-gold text-white/80 hover:text-white transition-all py-3 rounded-md text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 font-sans"
                          >
                            {copiedText ? (
                              <>
                                <Check size={12} className="text-green-400" />
                                Copied Brief!
                              </>
                            ) : (
                              <>
                                <FileText size={12} />
                                Copy Brief Text
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => { setFormSubmitted(false); setFormStep(1); }}
                      className="border border-gold text-gold hover:bg-gold hover:text-black transition-all px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest"
                    >
                      Log Another Lead
                    </button>
                    <button
                      onClick={() => setActiveTab('leads_manager')}
                      className="bg-gold text-black hover:bg-transparent hover:text-gold border border-gold transition-all px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest"
                    >
                      Navigate to Inquiries Hub
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-zinc-950 border border-white/10 rounded-lg p-8 md:p-12 shadow-2xl relative overflow-hidden">
                  
                  {/* Step Indicators */}
                  <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-6">
                    <div className="flex items-center gap-1">
                      <span className={`text-xs font-sans tracking-widest font-bold ${formStep >= 1 ? 'text-gold' : 'text-white/30'}`}>01 IDENTIFICATION</span>
                      <ChevronRight size={12} className="text-white/20" />
                      <span className={`text-xs font-sans tracking-widest font-bold ${formStep >= 2 ? 'text-gold' : 'text-white/30'}`}>02 CHANNELS</span>
                      <ChevronRight size={12} className="text-white/20" />
                      <span className={`text-xs font-sans tracking-widest font-bold ${formStep >= 3 ? 'text-gold' : 'text-white/30'}`}>03 SPECIFICATION</span>
                    </div>
                    <span className="text-xs font-mono text-white/35">Step {formStep} of 3</span>
                  </div>

                  {/* Form Wrapper */}
                  <form onSubmit={handleClientSubmit} className="space-y-8">
                    
                    {/* Error Alerts */}
                    {validationError && (
                      <motion.div 
                        initial={{ opacity: 0, y: -5 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="bg-red-950/40 border border-red-500/30 text-red-200 px-5 py-3 rounded text-xs font-sans"
                      >
                        ✕ {validationError}
                      </motion.div>
                    )}

                    {/* STEP 1: CLIENT IDENTIFICATION */}
                    {formStep === 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                      >
                        <div className="border-l-2 border-gold pl-4 creative-intro">
                          <h4 className="text-md font-serif text-white tracking-widest uppercase">Company & Contact Person</h4>
                          <p className="text-xs text-white/40 mt-1">Please introduce yourself and state the legal organization you represent.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-sans font-bold uppercase tracking-widest text-white/60 flex items-center gap-1.5">
                              <User size={10} className="text-gold" />
                              Contact Person Name <span className="text-gold">*</span>
                            </label>
                            <input
                              type="text"
                              value={contactPerson}
                              onChange={(e) => setContactPerson(e.target.value)}
                              placeholder="e.g., Katherine Vance"
                              className="w-full bg-zinc-900 border border-white/10 rounded-md p-4 text-sm text-white focus:outline-none focus:border-gold transition-colors"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-[10px] font-sans font-bold uppercase tracking-widest text-white/60 flex items-center gap-1.5">
                              <Globe size={10} className="text-gold" />
                              Legal Organization / Brand Name <span className="text-gold">*</span>
                            </label>
                            <input
                              type="text"
                              value={clientName}
                              onChange={(e) => setClientName(e.target.value)}
                              placeholder="e.g., Vance Creative Group"
                              className="w-full bg-zinc-900 border border-white/10 rounded-md p-4 text-sm text-white focus:outline-none focus:border-gold transition-colors"
                              required
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2: CHANNELS */}
                    {formStep === 2 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                      >
                        <div className="border-l-2 border-gold pl-4">
                          <h4 className="text-md font-serif text-white tracking-widest uppercase">Digital Contact Details</h4>
                          <p className="text-xs text-white/40 mt-1">Provide your verified digital credentials to initiate direct discussions.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-sans font-bold uppercase tracking-widest text-white/60 flex items-center gap-1.5">
                              <Mail size={10} className="text-gold" />
                              Your Inquiry Email Address <span className="text-gold">*</span>
                            </label>
                            <input
                              type="email"
                              value={clientEmail}
                              onChange={(e) => setClientEmail(e.target.value)}
                              placeholder="e.g., katherine@vancecreative.com"
                              className="w-full bg-zinc-900 border border-white/10 rounded-md p-4 text-sm text-white focus:outline-none focus:border-gold transition-colors"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-[10px] font-sans font-bold uppercase tracking-widest text-white/60 flex items-center gap-1.5">
                              <Phone size={10} className="text-gold" />
                              Your WhatsApp or Cell Connection (inc. country code) <span className="text-gold">*</span>
                            </label>
                            <input
                              type="text"
                              value={clientPhone}
                              onChange={(e) => setClientPhone(e.target.value)}
                              placeholder="e.g., +91 99887 76655"
                              className="w-full bg-zinc-900 border border-white/10 rounded-md p-4 text-sm text-white focus:outline-none focus:border-gold transition-colors"
                              required
                            />
                          </div>

                          <div className="space-y-2 col-span-1 md:col-span-2 border-t border-white/5 pt-6 mt-2">
                            <label className="text-[10px] font-sans font-bold uppercase tracking-widest text-white/60 flex items-center gap-1.5">
                              <Send size={10} className="text-gold" />
                              Destination Email Address for this Brief <span className="text-gold">*</span>
                            </label>
                            <input
                              type="email"
                              value={recipientEmail}
                              onChange={(e) => setRecipientEmail(e.target.value)}
                              placeholder="e.g., recipient-email@domain.com"
                              className="w-full bg-zinc-900 border border-white/10 rounded-md p-4 text-sm text-white focus:outline-none focus:border-gold transition-colors"
                              required
                            />
                            <p className="text-[10px] text-white/30 font-sans italic mt-1 bg-white/5 px-3 py-2 rounded">
                              Provide the target email address where you want to route the finalized briefing parameters on completion.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: ASSIGNMENT SPECIFICATIONS */}
                    {formStep === 3 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                      >
                        <div className="border-l-2 border-gold pl-4">
                          <h4 className="text-md font-serif text-white tracking-widest uppercase">Project Specifications & Objectives</h4>
                          <p className="text-xs text-white/40 mt-1">Designate project structure, overall parameters, and desired roadmap goals.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-sans font-bold uppercase tracking-widest text-white/60 flex items-center gap-1.5">
                              <Layers size={10} className="text-gold" />
                              Primary Creative Field <span className="text-gold">*</span>
                            </label>
                            <select
                              value={projectPillar}
                              onChange={(e) => setProjectPillar(e.target.value)}
                              className="w-full bg-zinc-900 border border-white/10 rounded-md p-4 text-sm text-white focus:outline-none focus:border-gold transition-colors block"
                            >
                              <option>UI/UX Design</option>
                              <option>Photography Shoot</option>
                              <option>Videography Shoot</option>
                              <option>Brand Identity</option>
                              <option>Full Scale Studio Retainer</option>
                            </select>
                          </div>

                          <div className="space-y-2">
                            <label className="text-[10px] font-sans font-bold uppercase tracking-widest text-white/60 flex items-center gap-1.5">
                              <DollarSign size={10} className="text-gold" />
                              Estimated Project Investment <span className="text-gold">*</span>
                            </label>
                            <select
                              value={budget}
                              onChange={(e) => setBudget(e.target.value)}
                              className="w-full bg-zinc-900 border border-white/10 rounded-md p-4 text-sm text-white focus:outline-none focus:border-gold transition-colors block"
                            >
                              <option>$5k - $15k</option>
                              <option>$15k - $30k</option>
                              <option>$30k - $50k</option>
                              <option>$50k+</option>
                            </select>
                          </div>

                          <div className="space-y-2">
                            <label className="text-[10px] font-sans font-bold uppercase tracking-widest text-white/60 flex items-center gap-1.5">
                              <Calendar size={10} className="text-gold" />
                              Roadmap Timeline <span className="text-gold">*</span>
                            </label>
                            <select
                              value={timeline}
                              onChange={(e) => setTimeline(e.target.value)}
                              className="w-full bg-zinc-900 border border-white/10 rounded-md p-4 text-sm text-white focus:outline-none focus:border-gold transition-colors block"
                            >
                              <option>Immediate (1 month)</option>
                              <option>1 - 3 months</option>
                              <option>3 - 6 months</option>
                              <option>Flexible Plan</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-sans font-bold uppercase tracking-widest text-white/60 flex items-center gap-1.5">
                            <MessageSquare size={10} className="text-gold" />
                            Core Objectives & Description <span className="text-gold">*</span>
                          </label>
                          <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Briefly state your primary objectives, deliverables needed, and what exceptional looks like for your venture..."
                            rows={4}
                            className="w-full bg-zinc-900 border border-white/10 rounded-md p-4 text-sm text-white focus:outline-none focus:border-gold transition-colors resize-none"
                            required
                          />
                        </div>

                        {/* Terms Checkbox */}
                        <div className="flex items-start gap-3 bg-zinc-900/40 p-4 border border-white/5 rounded-md">
                          <input
                            type="checkbox"
                            id="agreeTerms"
                            checked={agreeTerms}
                            onChange={(e) => setAgreeTerms(e.target.checked)}
                            className="mt-1 accent-gold text-black rounded"
                            required
                          />
                          <label htmlFor="agreeTerms" className="text-xs text-white/55 leading-relaxed selection:bg-gold select-none cursor-pointer">
                            <span className="text-white/80 font-medium">Verify Brief Intent:</span> I confirm that this briefing represents a genuine professional proposal. This information will be cached locally to permit instant studio correspondence.
                          </label>
                        </div>
                      </motion.div>
                    )}

                    {/* Step Navigation Controls */}
                    <div className="flex items-center justify-between border-t border-white/5 pt-8 mt-10">
                      {formStep > 1 ? (
                        <button
                          type="button"
                          onClick={() => setFormStep(prev => prev - 1)}
                          className="px-6 py-3 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-white hover:border-white hover:text-white transition-all text-left"
                        >
                          Previous
                        </button>
                      ) : (
                        <div />
                      )}

                      {formStep < 3 ? (
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="px-8 py-3 bg-gold text-black hover:bg-transparent hover:text-gold border border-gold transition-all rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 font-sans overflow-hidden"
                        >
                          Next Step
                          <ChevronRight size={14} />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="px-8 py-3 bg-gold text-black hover:scale-[1.03] active:scale-[0.98] border border-gold transition-all rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 group font-sans font-semibold overflow-hidden shadow-lg shadow-gold/25"
                        >
                          Lock & Submit Brief
                          <Send size={12} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          )}

          {/* STUDIO PROFILE TAB */}
          {activeTab === 'studio_profile' && (
            <motion.div
              key="studio_profile"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-zinc-950 border border-white/10 rounded-lg p-8 md:p-12 shadow-2xl">
                <div className="border-l-2 border-gold pl-4 mb-8">
                  <h3 className="text-xl font-serif text-white uppercase tracking-widest">My Studio Credentials</h3>
                  <p className="text-xs text-white/40 mt-1">
                    Manage the main profile details where potential customers connect with you. These credentials dynamically fill corresponding fields.
                  </p>
                </div>

                <form onSubmit={handleProfileSave} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-sans font-bold uppercase tracking-widest text-white/50">Studio Brand Name</label>
                      <input
                        type="text"
                        value={profile.studioName}
                        onChange={(e) => setProfile({ ...profile, studioName: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 rounded-md p-4 text-sm text-white focus:outline-none focus:border-gold transition-colors"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-sans font-bold uppercase tracking-widest text-white/50">Lead Representative / Creator</label>
                      <input
                        type="text"
                        value={profile.ownerName}
                        onChange={(e) => setProfile({ ...profile, ownerName: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 rounded-md p-4 text-sm text-white focus:outline-none focus:border-gold transition-colors"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-sans font-bold uppercase tracking-widest text-white/50">Primary Contact Email</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 rounded-md p-4 text-sm text-white focus:outline-none focus:border-gold transition-colors"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-sans font-bold uppercase tracking-widest text-white/50">Direct WhatsApp / Call Line</label>
                      <input
                        type="text"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 rounded-md p-4 text-sm text-white focus:outline-none focus:border-gold transition-colors"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-sans font-bold uppercase tracking-widest text-white/50">Physical Headquarters</label>
                      <input
                        type="text"
                        value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 rounded-md p-4 text-sm text-white focus:outline-none focus:border-gold transition-colors"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-sans font-bold uppercase tracking-widest text-white/50">Starting Studio Project Rate</label>
                      <input
                        type="text"
                        value={profile.startingRate}
                        onChange={(e) => setProfile({ ...profile, startingRate: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 rounded-md p-4 text-sm text-white focus:outline-none focus:border-gold transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-sans font-bold uppercase tracking-widest text-white/50">Core Service Offer Focus</label>
                    <input
                      type="text"
                      value={profile.primaryService}
                      onChange={(e) => setProfile({ ...profile, primaryService: e.target.value })}
                      className="w-full bg-zinc-900 border border-white/10 rounded-md p-4 text-sm text-white focus:outline-none focus:border-gold transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-sans font-bold uppercase tracking-widest text-white/50">Studio Elevator Pitch / Bio</label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      rows={3}
                      className="w-full bg-zinc-900 border border-white/10 rounded-md p-4 text-sm text-white focus:outline-none focus:border-gold transition-colors resize-none"
                      required
                    />
                  </div>

                  <div className="flex justify-end pt-6">
                    <button
                      type="submit"
                      className="px-8 py-4 bg-gold text-black hover:bg-transparent hover:text-gold border border-gold transition-all duration-300 rounded-full text-xs font-bold uppercase tracking-widest"
                    >
                      Save Profile Credentials
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {/* OPPORTUNITIES & LEADS HUB */}
          {activeTab === 'leads_manager' && (
            <motion.div
              key="leads_manager"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Stats overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-zinc-950 border border-white/5 p-6 rounded-lg text-center">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white/40 block mb-2">Aggregate Inquiries</span>
                  <span className="text-4xl font-serif text-white font-bold">{leads.length}</span>
                </div>
                <div className="bg-zinc-950 border border-white/5 p-6 rounded-lg text-center">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-red-400 block mb-2">Pending Interaction</span>
                  <span className="text-4xl font-serif text-red-500 font-bold">{leads.filter(l => l.status === 'new').length}</span>
                </div>
                <div className="bg-zinc-950 border border-white/5 p-6 rounded-lg text-center">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-amber-400 block mb-2">Active Proposals</span>
                  <span className="text-4xl font-serif text-amber-500 font-bold">
                    {leads.filter(l => l.status === 'contacted' || l.status === 'discussion').length}
                  </span>
                </div>
                <div className="bg-zinc-950 border border-white/5 p-6 rounded-lg text-center">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-green-400 block mb-2">Studio Representative</span>
                  <span className="text-xs font-sans text-gold/80 break-words line-clamp-1">{profile.ownerName}</span>
                </div>
              </div>

              {/* Lead Cards List */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-serif uppercase tracking-wider text-white flex items-center gap-2">
                    <FileText size={16} className="text-gold" />
                    Incoming Prospective Briefs ({leads.length})
                  </h3>
                  <button 
                    onClick={() => {
                        if (confirm('Verify: Reset to initial sample inquiries? Saved records will be overridden.')) {
                            saveLeadsToStorage(SAMPLE_LEADS);
                        }
                    }}
                    className="text-[10px] text-white/35 hover:text-gold uppercase tracking-widest font-sans transition-colors"
                  >
                    Reset Demotech Mock Leads
                  </button>
                </div>

                {leads.length === 0 ? (
                  <div className="bg-zinc-950 border border-white/5 p-16 rounded-lg text-center text-white/40">
                    <MessageSquare size={48} className="mx-auto text-white/20 mb-4" />
                    <p className="text-sm font-sans mb-2">No prospective inquiries lodged yet.</p>
                    <p className="text-xs font-sans">Switch to the <strong>Intake Wizard</strong> to simulate or capture custom submissions.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {leads.map((lead) => (
                      <motion.div
                        key={lead.id}
                        layoutId={lead.id}
                        className="bg-zinc-950 border border-white/10 rounded-lg p-6 lg:p-8 flex flex-col lg:flex-row lg:items-start justify-between gap-8 hover:border-gold/30 transition-colors shadow-xl"
                      >
                        <div className="space-y-6 max-w-3xl">
                          {/* Client Title and Header info */}
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="px-3 py-1 bg-gold/10 border border-gold/20 text-gold text-[8px] font-bold uppercase tracking-widest rounded-full">
                              {lead.projectPillar}
                            </span>
                            <span className="text-white/30 text-[10px] font-mono">
                              Lodged: {lead.submittedAt}
                            </span>
                            <span className={`px-2.5 py-0.5 rounded text-[8.5px] uppercase tracking-wider font-extrabold ${
                              lead.status === 'new' ? 'bg-red-950 text-red-400 border border-red-500/10' :
                              lead.status === 'contacted' ? 'bg-amber-950 text-amber-400 border border-amber-500/10' :
                              lead.status === 'discussion' ? 'bg-blue-900/30 text-blue-400 border border-blue-500/10' :
                              'bg-zinc-800 text-zinc-400'
                            }`}>
                              {lead.status === 'new' ? 'Unread / New' : lead.status}
                            </span>
                          </div>

                          <div>
                            <h4 className="text-2xl font-serif text-white tracking-tight leading-none mb-1">
                              {lead.clientName}
                            </h4>
                            <p className="text-xs text-white/50">
                              Proposed by <span className="text-white/80 font-medium">{lead.contactPerson}</span>
                            </p>
                          </div>

                          {/* Parameters */}
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-y border-white/5 py-4 text-xs font-sans">
                            <div>
                              <p className="text-white/30 uppercase text-[9px] tracking-widest mb-1">Target Investment</p>
                              <p className="text-gold font-medium">{lead.budget}</p>
                            </div>
                            <div>
                              <p className="text-white/30 uppercase text-[9px] tracking-widest mb-1">Expected Inception</p>
                              <p className="text-white/80">{lead.timeline}</p>
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                              <p className="text-white/30 uppercase text-[9px] tracking-widest mb-1">Connect Channels</p>
                              <p className="text-white/80 break-words font-mono text-[11px]">{lead.email}</p>
                            </div>
                          </div>

                          {/* Description Brief */}
                          <div>
                            <p className="text-white/30 uppercase text-[9px] tracking-widest mb-2 font-bold">Brief Narrative & Objectives</p>
                            <p className="text-sm font-sans font-light text-white/70 leading-relaxed italic bg-zinc-900/40 p-4 border border-white/5 rounded-md">
                              "{lead.description}"
                            </p>
                          </div>
                        </div>

                        {/* Connection Controls (The "where I can connect to potential customers" workspace) */}
                        <div className="lg:w-80 flex flex-col justify-between gap-6 self-stretch border-t lg:border-t-0 lg:border-l border-white/5 pt-6 lg:pt-0 lg:pl-8">
                          
                          <div className="space-y-4">
                            <p className="text-white/30 uppercase text-[9px] tracking-widest font-bold label">Process Management</p>
                            <div className="space-y-2">
                              <label className="text-[10px] text-white/50 block">Lifecycle stage:</label>
                              <select
                                value={lead.status}
                                onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                                className="w-full bg-zinc-900 border border-white/10 rounded-md p-2.5 text-xs text-white focus:outline-none focus:border-gold"
                              >
                                <option value="new">Mark as New</option>
                                <option value="contacted">Mark as Contacted</option>
                                <option value="discussion">Mark as Briefing Discussion</option>
                                <option value="closed">Dismissed</option>
                              </select>
                            </div>
                          </div>

                          {/* ACTION CHANNELS */}
                          <div className="space-y-3 mt-auto">
                            <p className="text-[9px] text-white/40 uppercase tracking-widest font-bold flex items-center gap-1.5">
                              <Sparkles size={10} className="text-gold" />
                              Establish Correspondence
                            </p>
                            
                            {/* Email connect with loaded templates */}
                            <a
                              href={getMailToLink(lead)}
                              onClick={() => {
                                if (lead.status === 'new') updateLeadStatus(lead.id, 'contacted');
                              }}
                              className="w-full bg-zinc-900 hover:bg-zinc-800 border border-white/15 hover:border-gold/40 text-white p-3 rounded-md text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2.5 transition-colors"
                            >
                              <Mail size={14} className="text-gold" />
                              Draft Lead Email
                            </a>

                            {/* WhatsApp Direct */}
                            <a
                              href={getWhatsAppLink(lead)}
                              target="_blank"
                              rel="noreferrer"
                              onClick={() => {
                                if (lead.status === 'new') updateLeadStatus(lead.id, 'contacted');
                              }}
                              className="w-full bg-gold hover:bg-gold/90 text-black p-3 rounded-md text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all shadow-[0_0_20px_rgba(201,168,76,0.15)]"
                            >
                              <MessageCircle size={14} />
                              WhatsApp Connect
                            </a>

                            {/* Dismiss/Trash */}
                            <button
                              onClick={() => deleteLead(lead.id)}
                              className="w-full text-center text-red-450 hover:text-red-400 text-[10px] uppercase tracking-widest transition-colors pt-2 block"
                            >
                              Remove Inquiry Card
                            </button>
                          </div>

                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
}
