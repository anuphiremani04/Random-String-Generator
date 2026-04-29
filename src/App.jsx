import { useState, useCallback, useEffect } from 'react';
import { Copy, RefreshCw, Check, Sparkles } from 'lucide-react';

function App() {
  const [length, setLength] = useState(12);
  const [caseMode, setCaseMode] = useState('mixed'); // 'mixed' | 'uppercase' | 'lowercase'
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(3); // in seconds
  const [generatedString, setGeneratedString] = useState('');
  const [copied, setCopied] = useState(false);

  // Memoized string generator function using useCallback
  const generateString = useCallback(() => {
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]\\:;?><,./-=';

    let characters = '';
    if (caseMode === 'uppercase') {
      characters += upper;
    } else if (caseMode === 'lowercase') {
      characters += lower;
    } else {
      characters += lower + upper;
    }

    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    // Fallback if nothing selected
    if (characters.length === 0) characters = lower + upper;

    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setGeneratedString(result);
    console.log(`Generated new string: ${result}`);
  }, [length, caseMode, includeNumbers, includeSymbols]);

  // Side effect: Generate string on initial load and when dependencies change
  useEffect(() => {
    generateString();
  }, [generateString]);

  // Side effect: Handle auto-refresh interval
  useEffect(() => {
    let intervalId;
    if (autoRefresh) {
      intervalId = setInterval(() => {
        generateString();
      }, refreshInterval * 1000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoRefresh, refreshInterval, generateString]);

  // Copy to clipboard functionality
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030308] p-4 font-sans text-slate-100Selection:bg-cyan-500Selection:text-black overflow-hidden relative">
      
      {/* Animated Background Blobs */}
      <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full filter blur-[120px] animate-pulse mix-blend-screen"></div>
      <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-cyan-600/20 rounded-full filter blur-[120px] animate-pulse delay-1000 mix-blend-screen"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-pink-600/10 rounded-full filter blur-[80px] mix-blend-screen"></div>

      {/* Ambient Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] opacity-40"></div>

      <div className="w-full max-w-md bg-[#0d0d1f]/60 backdrop-blur-2xl border border-purple-500/30 rounded-[32px] p-6 md:p-8 shadow-[0_0_80px_-20px_rgba(168,85,247,0.3)] transition-all duration-500 hover:border-purple-400/40 group/card relative z-10">
        
        {/* Iridescent Card Glow */}
        <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-[32px] -z-10 opacity-50 group-hover/card:opacity-100 transition-opacity duration-500"></div>

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <Sparkles size={24} className="animate-spin [animation-duration:6s]" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-wider font-mono">
              STR_GEN.v2
            </h1>
            <p className="text-[10px] md:text-xs text-slate-500 font-mono uppercase tracking-[0.2em] mt-0.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping"></span>
              System Online
            </p>
          </div>
        </div>

        {/* Display Area */}
        <div className="relative group mb-8">
          <div className="w-full bg-black/80 backdrop-blur-md border border-purple-500/30 rounded-2xl p-5 pr-14 text-lg md:text-xl font-mono break-all text-cyan-300 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] min-h-[90px] flex items-center select-all transition-all duration-300 group-hover:border-cyan-500/40 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]">
            <span className="drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
              {generatedString || <span className="text-slate-700 italic text-base">GENERATING...</span>}
            </span>
          </div>
          
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-1">
            <button
              onClick={copyToClipboard}
              title="Copy to Clipboard"
              className="p-2.5 rounded-xl text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all duration-200 active:scale-95"
            >
              {copied ? <Check size={18} className="text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]" /> : <Copy size={18} />}
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          
          {/* Length Slider */}
          <div>
            <div className="flex justify-between items-center mb-2 font-mono">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Length</label>
              <span className="px-2.5 py-0.5 text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-md shadow-[0_0_10px_rgba(34,211,238,0.1)]">
                {length}
              </span>
            </div>
            <input
              type="range"
              min="4"
              max="64"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-500 transition-all duration-300 border border-slate-800"
            />
          </div>

          {/* Case Mode Toggle */}
          <div>
            <label className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 block mb-3">Case Mode</label>
            <div className="grid grid-cols-3 gap-2 p-1 bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl">
              {['mixed', 'uppercase', 'lowercase'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setCaseMode(mode)}
                  className={`py-2 text-xs font-bold font-mono rounded-lg uppercase tracking-wider transition-all duration-300 ${
                    caseMode === mode
                      ? 'bg-gradient-to-r from-cyan-500/80 to-purple-600/80 text-white shadow-[0_0_15px_rgba(34,211,238,0.3)] border border-cyan-400/30'
                      : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/40'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Additional Options */}
          <div className="grid grid-cols-2 gap-3 font-mono">
            <label className="flex items-center gap-3 p-3.5 bg-black/30 border border-purple-500/20 rounded-xl cursor-pointer hover:bg-purple-500/10 hover:border-purple-500/40 transition-all duration-200 group">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-4 h-4 rounded bg-black border-purple-500/30 text-cyan-500 focus:ring-cyan-500/20 focus:ring-offset-0 focus:ring-2 transition-all duration-200 cursor-pointer"
              />
              <span className="text-xs text-slate-400 group-hover:text-cyan-300 transition-colors duration-200 tracking-wider">
                NUMBERS
              </span>
            </label>

            <label className="flex items-center gap-3 p-3.5 bg-black/30 border border-purple-500/20 rounded-xl cursor-pointer hover:bg-purple-500/10 hover:border-purple-500/40 transition-all duration-200 group">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-4 h-4 rounded bg-black border-purple-500/30 text-cyan-500 focus:ring-cyan-500/20 focus:ring-offset-0 focus:ring-2 transition-all duration-200 cursor-pointer"
              />
              <span className="text-xs text-slate-400 group-hover:text-cyan-300 transition-colors duration-200 tracking-wider">
                SYMBOLS
              </span>
            </label>
          </div>

          {/* Auto Refresh Toggle */}
          <div className="p-4 bg-black/30 border border-purple-500/20 rounded-xl space-y-3 font-mono">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RefreshCw size={16} className={`text-cyan-400 ${autoRefresh ? 'animate-spin' : ''} drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]`} />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Auto Refresh</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-900 border border-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-cyan-400 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-600 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500/20 peer-checked:after:bg-cyan-400 peer-checked:border-cyan-500/50 shadow-inner"></div>
              </label>
            </div>

            {autoRefresh && (
              <div className="flex justify-between items-center pt-2 border-t border-purple-500/10 animate-fadeIn">
                <label className="text-[10px] text-slate-500 uppercase tracking-wider">Interval</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={refreshInterval}
                    onChange={(e) => setRefreshInterval(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-14 bg-black border border-purple-500/30 rounded-lg px-2 py-1 text-xs text-center font-mono text-cyan-300 focus:outline-none focus:border-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.1)]"
                  />
                  <span className="text-[10px] text-slate-600">SEC</span>
                </div>
              </div>
            )}
          </div>

          {/* Generate Button */}
          <button
            onClick={generateString}
            className="w-full py-4 px-4 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 hover:from-cyan-400 hover:via-purple-500 hover:to-pink-500 text-black font-black font-mono uppercase tracking-widest rounded-2xl shadow-[0_0_30px_-5px_rgba(34,211,238,0.5)] hover:shadow-[0_0_40px_-5px_rgba(34,211,238,0.6)] transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden group/btn"
          >
            {/* Button Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            <RefreshCw size={18} className="text-black animate-pulse" />
            <span>EXECUTE_GEN</span>
          </button>

        </div>

      </div>
    </div>
  );
}

export default App;


