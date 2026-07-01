import React, { useState, useEffect } from 'react';

interface ApplyJob {
  id: string;
  title: string;
  location: string;
}

interface JobApplicationModalProps {
  job: ApplyJob | null;
  onClose: () => void;
}

const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  linkedin: '',
  message: '',
};

const MAX_CV_BYTES = 5 * 1024 * 1024;
const ALLOWED_CV_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const readFileAsBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== 'string') {
        reject(new Error('Failed to read CV file'));
        return;
      }
      const base64 = result.split(',')[1];
      if (!base64) {
        reject(new Error('Failed to encode CV file'));
        return;
      }
      resolve(base64);
    };
    reader.onerror = () => reject(new Error('Failed to read CV file'));
    reader.readAsDataURL(file);
  });

const JobApplicationModal: React.FC<JobApplicationModalProps> = ({ job, onClose }) => {
  const [formData, setFormData] = useState(emptyForm);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvError, setCvError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Lock background scroll while the modal is open.
  useEffect(() => {
    if (!job) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [job]);

  // Reset the form whenever a new job is opened.
  useEffect(() => {
    if (job) {
      setFormData(emptyForm);
      setCvFile(null);
      setCvError('');
      setIsSubmitted(false);
      setIsSubmitting(false);
    }
  }, [job]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setCvError('');

    if (!file) {
      setCvFile(null);
      return;
    }

    if (!ALLOWED_CV_TYPES.includes(file.type)) {
      setCvFile(null);
      setCvError('Please upload a PDF or Word document (.pdf, .doc, .docx).');
      e.target.value = '';
      return;
    }

    if (file.size > MAX_CV_BYTES) {
      setCvFile(null);
      setCvError('CV must be 5 MB or smaller.');
      e.target.value = '';
      return;
    }

    setCvFile(file);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job) return;

    if (!cvFile) {
      setCvError('Please upload your CV to apply.');
      return;
    }

    setIsSubmitting(true);

    try {
      const cvBase64 = await readFileAsBase64(cvFile);

      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          jobId: job.id,
          jobTitle: job.title,
          cvBase64,
          cvFileName: cvFile.name,
          cvContentType: cvFile.type,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit application');
      }

      setIsSubmitting(false);
      setIsSubmitted(true);

      setTimeout(() => {
        onClose();
      }, 3500);
    } catch (error) {
      console.error('Application submission error:', error);
      setIsSubmitting(false);
      const message =
        error instanceof Error && error.message
          ? error.message
          : 'Failed to submit your application. Please try again or email us at felipe@imkan.ai';
      alert(message);
    }
  };

  if (!job) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background-dark/95 backdrop-blur-sm" onClick={handleClose}></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-background-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {/* Close Button */}
        <button
          onClick={handleClose}
          disabled={isSubmitting}
          className="absolute top-5 right-5 z-50 text-gray-400 hover:text-white transition-colors bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-lg p-2 disabled:opacity-50"
          aria-label="Close"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto overscroll-contain">
          {!isSubmitted ? (
            <>
              <div className="mb-6 pr-10">
                <p className="text-primary text-sm font-semibold mb-1">Apply for</p>
                <h2 className="text-2xl md:text-3xl font-bold text-white">{job.title}</h2>
                {job.location && job.location !== '—' && (
                  <p className="text-gray-400 text-sm mt-1 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base text-primary/70">location_on</span>
                    {job.location}
                  </p>
                )}
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label htmlFor="apply-cv" className="block text-sm font-medium text-gray-300 mb-2">
                    CV / Resume <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="file"
                    id="apply-cv"
                    name="cv"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleCvChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-background-dark file:font-semibold file:cursor-pointer hover:file:bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                  {cvFile && !cvError && (
                    <p className="mt-2 text-xs text-gray-400 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm text-primary">description</span>
                      {cvFile.name} ({(cvFile.size / 1024).toFixed(0)} KB)
                    </p>
                  )}
                  {cvError && <p className="mt-2 text-xs text-red-400">{cvError}</p>}
                  <p className="mt-2 text-xs text-gray-500">PDF or Word, up to 5 MB.</p>
                </div>

                <div>
                  <label htmlFor="apply-firstName" className="block text-sm font-medium text-gray-300 mb-2">
                    First Name <span className="text-gray-500 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="apply-firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="Enter your first name"
                  />
                </div>

                <div>
                  <label htmlFor="apply-lastName" className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name <span className="text-gray-500 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="apply-lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="Enter your last name"
                  />
                </div>

                <div>
                  <label htmlFor="apply-email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address <span className="text-gray-500 font-normal">(optional)</span>
                  </label>
                  <input
                    type="email"
                    id="apply-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="apply-phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Mobile Phone <span className="text-gray-500 font-normal">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="apply-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="+966 XX XXX XXXX"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="apply-linkedin" className="block text-sm font-medium text-gray-300 mb-2">
                    LinkedIn or Portfolio <span className="text-gray-500 font-normal">(optional)</span>
                  </label>
                  <input
                    type="url"
                    id="apply-linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="https://linkedin.com/in/you"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="apply-message" className="block text-sm font-medium text-gray-300 mb-2">
                    Why you? <span className="text-gray-500 font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="apply-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-y"
                    placeholder="Tell us a bit about yourself and why you're a great fit..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="sm:col-span-2 w-full mt-2 bg-primary text-background-dark font-bold py-3 px-6 rounded-xl hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(37,226,244,0.3)] hover:shadow-[0_0_30px_rgba(37,226,244,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined animate-spin">refresh</span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit application
                      <span className="material-symbols-outlined">send</span>
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-10">
              <div className="size-20 mx-auto mb-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-5xl text-primary">check_circle</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Application Received!</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                Thanks for applying for <span className="text-white font-medium">{job.title}</span>. Our team will review
                your application and get back to you if there's a fit.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobApplicationModal;
