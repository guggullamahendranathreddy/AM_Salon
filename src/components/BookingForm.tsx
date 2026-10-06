import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Phone, MessageSquare, Clock, FileText, User, Sparkle, ArrowRight, ShieldCheck, Heart, Instagram } from "lucide-react";
import { SERVICE_ITEMS } from "../data";

interface BookingFormProps {
  selectedService: string;
  onClearService: () => void;
}

export default function BookingForm({ selectedService, onClearService }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    id: string;
    name: string;
    phone: string;
    service: string;
    date: string;
    time: string;
    notes: string;
  } | null>(null);

  // Synchronize initial component input with parent selection row state click
  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg(null);
  };

  // Pre-configured time options for luxury schedules
  const hourlySlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM",
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Clientside basic checks
    if (!formData.name.trim() || !formData.phone.trim() || !formData.service || !formData.date || !formData.time) {
      setErrorMsg("Please fill in all mandatory fields before booking.");
      return;
    }

    // Basic Indian mobile validator (+91 or standard 10 digit)
    const cleanerPhone = formData.phone.replace(/\D/g, "");
    if (cleanerPhone.length < 10) {
      setErrorMsg("Please provide a valid 10-digit mobile number for communication.");
      return;
    }

    setLoading(true);

    try {
      // POST the booking payload to our Express backend API route
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong while booking.");
      }

      // Capture Success structure
      setSuccessData({
        id: data.bookingId,
        name: formData.name,
        phone: formData.phone,
        service: formData.service,
        date: formData.date,
        time: formData.time,
        notes: formData.notes,
      });

      // Assemble WhatsApp Redirect link
      const textMessage = `Hello AM Unisex Salon,\n\nName: ${formData.name}\nPhone: ${formData.phone}\nService: ${formData.service}\nPreferred Date: ${formData.date}\nPreferred Time: ${formData.time}\nNotes: ${formData.notes || "None"}\n\nI would like to book an appointment.`;
      const whatsappUrl = `https://wa.me/917569979965?text=${encodeURIComponent(textMessage)}`;

      // Reset local inputs
      setFormData({
        name: "",
        phone: "",
        service: "",
        date: "",
        time: "",
        notes: "",
      });
      onClearService();

      // Launch WhatsApp automatic routing window instantly
      window.location.href = whatsappUrl;

    } catch (err: any) {
      setErrorMsg(err.message || "Our server has rate-limited your IP to prevent spam bookings. Please wait 1 minute.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="book" className="relative py-20 bg-bg-dark overflow-hidden">
      
      {/* Decorative styling items */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* COLUMN 1: INTRODUCTORY BRAND HERO & QUICK CONTACT BUTTONS */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <span className="text-secondary text-xs uppercase font-body tracking-[0.3em] font-semibold flex items-center justify-center lg:justify-start gap-2 mb-2">
              <Sparkle className="w-3.5 h-3.5 text-secondary" /> Priority Booking
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight mt-1 mb-6">
              Book an Appointment at <span className="text-gradient">AM Unisex Salon</span>
            </h2>
            <p className="text-sm text-luxury-cream/65 font-body leading-relaxed mb-8 font-light">
              We look forward to hosting you at our salon in Nallagandla, Hyderabad! Fill out this booking form to reserve your chair. Your requested timing is forwarded straight to our staff over WhatsApp for instant confirmation.
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
              
              <a
                href="https://wa.me/917569979965?text=Hello%20AM%20Unisex%20Salon!%20I%20would%20like%20to%20inquire%20about%20booking%20an%20appointment."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-sm bg-bg-charcoal border border-white/5 hover:border-[#25D366]/40 hover:bg-bg-charcoal/95 group transition-all"
              >
                <div className="h-10 w-10 rounded-full bg-[#1e4620]/20 flex items-center justify-center text-[#25D366] shrink-0">
                  <MessageSquare className="w-5 h-5 text-[#25D366] fill-[#25D366]/10" />
                </div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-white font-body">Chat on WhatsApp</h4>
              </a>

              <a
                href="tel:+917569979965"
                className="flex items-center gap-4 p-4 rounded-sm bg-bg-charcoal border border-white/5 hover:border-primary/40 hover:bg-bg-charcoal/95 group transition-all"
              >
                <div className="h-10 w-10 rounded-full bg-[#3d1a1e]/20 flex items-center justify-center text-secondary shrink-0">
                  <Phone className="w-5 h-5 text-secondary" />
                </div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-white font-body">Call Us Directly</h4>
              </a>

              <a
                href="https://www.instagram.com/akshaiunisexsalonpragathinagar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-sm bg-bg-charcoal border border-white/5 hover:border-slate-500/40 hover:bg-bg-charcoal/95 group transition-all"
              >
                <div className="h-10 w-10 rounded-full bg-slate-500/10 flex items-center justify-center text-white shrink-0">
                  <Instagram className="w-5 h-5 text-purple-400" />
                </div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-white font-body">Follow on Instagram</h4>
              </a>

            </div>

            <div className="mt-8 flex items-center justify-center lg:justify-start gap-2.5 text-xs text-accent font-body">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Complimentary structural locks consultation included with any cut.</span>
            </div>

          </div>

          {/* COLUMN 2: THE FORM INPUT SHEET AREA */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-lg bg-bg-charcoal border border-white/5 shadow-2xl relative">
              
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight mb-6 flex items-center gap-2">
                Appointment Schedule Ledger
              </h3>

              {/* Form trigger sheet */}
              <form onSubmit={handleFormSubmit} className="space-y-6">
                
                {/* Error Banner */}
                {errorMsg && (
                  <div className="p-4 bg-primary/20 border border-primary/45 rounded-sm text-xs text-secondary font-body font-semibold">
                    {errorMsg}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="relative">
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-accent mb-2 font-body">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-3.5 rounded-sm bg-bg-dark border border-white/5 text-sm text-white placeholder-luxury-cream/25 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/40 transition-all font-body font-light"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-accent mb-2 font-body">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter 10-digit mobile number"
                        className="w-full pl-10 pr-4 py-3.5 rounded-sm bg-bg-dark border border-white/5 text-sm text-white placeholder-luxury-cream/25 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/40 transition-all font-body font-light"
                      />
                    </div>
                  </div>
                </div>

                {/* Service Required Select */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-accent font-body">
                      Service Required *
                    </label>
                    {formData.service && (
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((p) => ({ ...p, service: "" }));
                          onClearService();
                        }}
                        className="text-[9px] uppercase tracking-wider text-secondary font-bold"
                      >
                        Clear Selection
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Sparkle className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary opacity-60" />
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3.5 rounded-sm bg-bg-dark border border-white/5 text-sm text-luxury-cream focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/40 transition-all font-body font-light appearance-none"
                    >
                      <option value="">-- Choose a Luxury Treatment --</option>
                      
                      {/* Populate OptGroups */}
                      <optgroup label="✂️ Men's Grooming" className="bg-bg-charcoal">
                        {SERVICE_ITEMS.filter(s => s.category === "men").map(service => (
                          <option key={service.id} value={service.name}>{service.name}</option>
                        ))}
                      </optgroup>
                      
                      <optgroup label="👑 Women's Styling" className="bg-bg-charcoal">
                        {SERVICE_ITEMS.filter(s => s.category === "women").map(service => (
                          <option key={service.id} value={service.name}>{service.name}</option>
                        ))}
                      </optgroup>

                      <optgroup label="Specialized Hair treatments" className="bg-bg-charcoal">
                        {SERVICE_ITEMS.filter(s => s.category === "hair").map(service => (
                          <option key={service.id} value={service.name}>{service.name}</option>
                        ))}
                      </optgroup>

                      <optgroup label="✨ Gentle Skin Care" className="bg-bg-charcoal">
                        {SERVICE_ITEMS.filter(s => s.category === "skin").map(service => (
                          <option key={service.id} value={service.name}>{service.name}</option>
                        ))}
                      </optgroup>

                      <optgroup label="💄 Elite Bridal Makeup" className="bg-bg-charcoal">
                        {SERVICE_ITEMS.filter(s => s.category === "bridal").map(service => (
                          <option key={service.id} value={service.name}>{service.name}</option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Preferred Date */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-accent mb-2 font-body">
                      Preferred Date *
                    </label>
                    <div
                      className="relative cursor-pointer"
                      onClick={() => {
                        const dateInput = document.getElementById("booking-date-input") as HTMLInputElement;
                        if (dateInput) {
                          try {
                            dateInput.showPicker();
                          } catch (e) {
                            dateInput.focus();
                          }
                        }
                      }}
                    >
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-accent pointer-events-none" />
                      <input
                        id="booking-date-input"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        onClick={(e) => {
                          try {
                            (e.target as HTMLInputElement).showPicker();
                          } catch (err) {}
                        }}
                        required
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full pl-10 pr-4 py-3.5 rounded-sm bg-bg-dark border border-white/5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/40 transition-all font-body font-light cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Preferred Time */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-accent mb-2 font-body">
                      Preferred Time *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3.5 rounded-sm bg-bg-dark border border-white/5 text-sm text-luxury-cream focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/40 transition-all font-body font-light appearance-none"
                      >
                        <option value="">-- Choose Slot --</option>
                        {hourlySlots.map((slot) => (
                          <option key={slot} value={slot} className="bg-bg-charcoal">{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Additional notes */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-accent mb-2 font-body">
                    Additional Instructions / Notes
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3.5 top-4 w-4 h-4 text-accent" />
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Specify if you have specialized locks requests, allergies or favor a certain senior treatment stylist..."
                      rows={3}
                      className="w-full pl-10 pr-4 py-3.5 rounded-sm bg-bg-dark border border-white/5 text-sm text-white placeholder-luxury-cream/25 focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all font-body font-light resize-none"
                    />
                  </div>
                </div>

                {/* Submit button indicator */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-sm bg-gradient-to-r from-primary to-secondary text-white font-semibold py-4 text-xs md:text-sm tracking-widest uppercase flex items-center justify-center gap-2 hover:translate-y-[-1px] transition-all duration-300 shadow-lg select-none cursor-pointer active:translate-y-[1px]"
                >
                  {loading ? (
                    <>
                      <div className="h-4.5 w-4.5 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
                      Compiling Reservation details...
                    </>
                  ) : (
                    <>
                      Secure Slot & Launch WhatsApp
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>

            </div>
          </div>

        </div>
      </div>

      {/* LUXE ACHIEVEMENT POPUP DIALOG */}
      <AnimatePresence>
        {successData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-bg-dark/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.92, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 15 }}
              className="w-full max-w-md p-8 rounded-lg bg-bg-charcoal border border-primary/40 shadow-2xl overflow-hidden relative text-center"
            >
              {/* Background gradient spark */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-primary to-secondary" />

              <div className="h-14 w-14 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-display font-bold text-white tracking-tight mb-2 uppercase">
                Reservation success!
              </h3>
              <p className="text-[11px] font-mono font-bold tracking-widest text-accent uppercase bg-bg-dark py-1.5 px-3 rounded-full inline-block mb-4">
                ID: {successData.id}
              </p>

              <div className="text-left bg-bg-dark p-5 rounded border border-white/5 space-y-2 mb-6">
                <p className="text-xs text-luxury-cream/70 font-body">
                  Client Name: <span className="text-white font-bold">{successData.name}</span>
                </p>
                <p className="text-xs text-luxury-cream/70 font-body">
                  Service Requested: <span className="text-white font-bold">{successData.service}</span>
                </p>
                <p className="text-xs text-secondary font-bold font-body">
                  Timing: {successData.date} @ {successData.time}
                </p>
              </div>

              <p className="text-xs text-luxury-cream/50 font-body leading-relaxed mb-6">
                We are launching WhatsApp to securely synchronize this request with Manish and Pookar at the reception desk. If WhatsApp doesn't open automatically, please click below.
              </p>

              <button
                onClick={() => {
                  const textMessage = `Hello AM Unisex Salon,\n\nName: ${successData.name}\nPhone: ${successData.phone}\nService: ${successData.service}\nPreferred Date: ${successData.date}\nPreferred Time: ${successData.time}\nNotes: ${successData.notes || "None"}\n\nI would like to book an appointment.`;
                  window.open(`https://wa.me/917569979965?text=${encodeURIComponent(textMessage)}`, "_blank");
                  setSuccessData(null);
                }}
                className="w-full py-4 text-xs tracking-wider uppercase font-bold text-white bg-gradient-to-r from-primary to-secondary rounded-sm hover:-translate-y-0.5 active:translate-y-0 shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-white fill-white/10" />
                Manually Open WhatsApp Chat
              </button>
              
              <button
                onClick={() => {
                  setSuccessData(null);
                }}
                className="w-full py-3 mt-2 text-xs font-semibold tracking-wider uppercase text-luxury-cream/40 hover:text-white transition-colors"
              >
                Close Window
              </button>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
