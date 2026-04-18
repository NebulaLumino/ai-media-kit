"use client";
import { useState } from "react";

export default function Home() {
  const [inputs, setInputs] = useState<Record<string, string>>({
    brand_name: "",
    primary_color: "",
    accent_color: "",
    brand_tone: "",
    key_stats: "",
    website: "",
    social_links: "",
    tagline: "",
    target_audience: "",
  });
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (key: string, value: string) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOutput("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputs }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setOutput(data.result || "No output received.");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-gray-100">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-rose-500/10" />
        <div className="relative max-w-5xl mx-auto px-4 pt-16 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
            AI-Powered Brand Design
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-pink-400">AI Media Kit</span> Generator
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Generate comprehensive brand media kits including logo guidelines, color palettes, typography, and boilerplate content
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-20">
        <div className="bg-gray-800/40 rounded-2xl p-8 border border-gray-700/50 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            Brand Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Brand Name</label>
                <input type="text" value={inputs.brand_name} onChange={(e) => handleChange("brand_name", e.target.value)} placeholder="e.g. Acme Brand" className="w-full px-4 py-2.5 bg-gray-900/80 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Brand Tagline</label>
                <input type="text" value={inputs.tagline} onChange={(e) => handleChange("tagline", e.target.value)} placeholder="e.g. 'Innovation at your fingertips'" className="w-full px-4 py-2.5 bg-gray-900/80 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Primary Color</label>
                <input type="text" value={inputs.primary_color} onChange={(e) => handleChange("primary_color", e.target.value)} placeholder="e.g. #FF5733 or Electric Blue" className="w-full px-4 py-2.5 bg-gray-900/80 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Accent Color</label>
                <input type="text" value={inputs.accent_color} onChange={(e) => handleChange("accent_color", e.target.value)} placeholder="e.g. #00D4FF or Vibrant Teal" className="w-full px-4 py-2.5 bg-gray-900/80 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Brand Tone & Voice</label>
              <input type="text" value={inputs.brand_tone} onChange={(e) => handleChange("brand_tone", e.target.value)} placeholder="e.g. Bold & playful, Professional & authoritative, Warm & approachable" className="w-full px-4 py-2.5 bg-gray-900/80 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Target Audience</label>
              <input type="text" value={inputs.target_audience} onChange={(e) => handleChange("target_audience", e.target.value)} placeholder="e.g. Gen Z creators, B2B SaaS professionals, Pet owners" className="w-full px-4 py-2.5 bg-gray-900/80 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Key Statistics / Metrics</label>
              <textarea value={inputs.key_stats} onChange={(e) => handleChange("key_stats", e.target.value)} placeholder="e.g. 1M+ users, $10M ARR, 50% MoM growth, 500k social followers..." rows={2} className="w-full px-4 py-2.5 bg-gray-900/80 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Website & Social Links</label>
              <input type="text" value={inputs.social_links} onChange={(e) => handleChange("social_links", e.target.value)} placeholder="e.g. www.example.com | Twitter: @example | LinkedIn: /company/example | Instagram: @example" className="w-full px-4 py-2.5 bg-gray-900/80 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all" />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-pink-500/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Generating Media Kit...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Generate Media Kit
                </>
              )}
            </button>
          </form>
        </div>

        {error && (
          <div className="mt-6 bg-red-900/20 border border-red-500/40 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-red-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          </div>
        )}

        {output && (
          <div className="mt-8 bg-gray-800/40 rounded-2xl p-8 border border-pink-500/30 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                AI Media Kit
              </h3>
              <button onClick={() => navigator.clipboard.writeText(output)} className="text-sm text-pink-400 hover:text-pink-300 flex items-center gap-1 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </button>
            </div>
            <pre className="whitespace-pre-wrap text-gray-300 text-sm leading-relaxed font-mono">{output}</pre>
          </div>
        )}

        <div className="mt-12 text-center text-gray-600 text-sm">
          Powered by DeepSeek AI · Built with Next.js 16
        </div>
      </div>
    </div>
  );
}
