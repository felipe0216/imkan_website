import React, { useState } from 'react';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactFormModal: React.FC<ContactFormModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission (you can replace this with actual API call)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ firstName: '', lastName: '', phone: '', email: '' });
      onClose();
    }, 3000);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({ firstName: '', lastName: '', phone: '', email: '' });
      setIsSubmitted(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background-dark/95 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-background-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {/* Close Button */}
        <button 
          onClick={handleClose}
          disabled={isSubmitting}
          className="absolute top-6 right-6 z-50 text-gray-400 hover:text-white transition-colors bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-lg p-2 disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-3xl">close</span>
        </button>

        {/* Content */}
        <div className="p-8 md:p-10">
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="mb-6 text-center">
                <h2 className="text-3xl font-bold text-white mb-3">Get in Touch</h2>
                
                {/* Fun message */}
                <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mb-4">
                  <span>Do you like this website? It was made with AI in one week</span>
                  <span className="material-symbols-outlined text-primary text-xl">robot</span>
                </div>
                
                <p className="text-gray-400 text-sm">
                  Fill out the form below and we'll get back to you shortly.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                    First Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="Enter your first name"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="Enter your last name"
                  />
                </div>

                {/* Mobile Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Mobile Phone <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="+966 XX XXX XXXX"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="your.email@company.com"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-6 bg-primary text-background-dark font-bold py-3 px-6 rounded-xl hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(37,226,244,0.3)] hover:shadow-[0_0_30px_rgba(37,226,244,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined animate-spin">refresh</span>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <span className="material-symbols-outlined">send</span>
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            /* Success Message */
            <div className="text-center py-8">
              <div className="size-20 mx-auto mb-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-5xl text-primary">check_circle</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
              <p className="text-gray-400">
                Thank you for reaching out. We'll get back to you shortly.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactFormModal;
