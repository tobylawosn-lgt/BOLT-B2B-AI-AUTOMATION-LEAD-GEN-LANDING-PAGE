import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

type FormState = "idle" | "submitting" | "success" | "error";

export default function AuditFormModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    team_size: "",
    current_tools: "",
    biggest_friction: "",
  });

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormState("submitting");
    try {
      const { error } = await supabase.from("audit_requests").insert({
        name: formData.name,
        email: formData.email,
        company: formData.company || null,
        team_size: formData.team_size || null,
        current_tools: formData.current_tools || null,
        biggest_friction: formData.biggest_friction || null,
      });
      if (error) throw error;
      setFormState("success");
    } catch {
      setFormState("error");
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const inputClass =
    "w-full bg-neutral-900/60 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all duration-200";
  const labelClass = "text-xs font-medium text-neutral-400 mb-1.5 block";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl"
        style={{ animation: "scaleIn 0.3s cubic-bezier(0.16,1,0.3,1) forwards" }}
      >
        {formState === "success" ? (
          <div className="p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Request received.</h3>
            <p className="text-neutral-400 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
              Thank you. We'll review your submission and get back to you within 48
              hours. Check your inbox — we'll be in touch shortly.
            </p>
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700 rounded-full px-6 py-3 transition-all duration-200"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between p-6 border-b border-neutral-900">
              <div>
                <h3 className="text-lg font-bold text-white">Request an Automation Audit</h3>
                <p className="text-xs text-neutral-500 mt-1">
                  No commitment. No sales call. Just clarity.
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-lg border border-neutral-800 hover:border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="you@company.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    placeholder="Company name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Team Size</label>
                  <select
                    value={formData.team_size}
                    onChange={(e) => handleChange("team_size", e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select range</option>
                    <option value="1-10">1–10</option>
                    <option value="11-50">11–50</option>
                    <option value="51-200">51–200</option>
                    <option value="200+">200+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>Current Tools & Systems</label>
                <input
                  type="text"
                  value={formData.current_tools}
                  onChange={(e) => handleChange("current_tools", e.target.value)}
                  placeholder="e.g. Salesforce, QuickBooks, Zapier, Slack…"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Biggest Operational Friction</label>
                <textarea
                  value={formData.biggest_friction}
                  onChange={(e) => handleChange("biggest_friction", e.target.value)}
                  placeholder="Where do you feel the most time is being wasted on manual work?"
                  rows={3}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {formState === "error" && (
                <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <p className="text-sm text-red-300">
                    Something went wrong. Please try again.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={formState === "submitting"}
                className="w-full inline-flex items-center justify-center gap-3 bg-white text-black font-semibold tracking-tight rounded-xl px-8 py-4 text-base transition-all duration-300 hover:bg-neutral-100 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {formState === "submitting" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    Submit Audit Request
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6h8M6 2l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                )}
              </button>

              <p className="text-xs text-neutral-600 text-center">
                Your information is only used to conduct the audit. No spam, ever.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
