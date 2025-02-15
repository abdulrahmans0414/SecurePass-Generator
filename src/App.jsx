import { useRef, useState, useCallback, useEffect } from 'react';

function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(true); // Enabled by default
  const [charAllowed, setCharAllowed] = useState(true); // Enabled by default
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);

  // Password generation logic
  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*()_+{}[]~`';

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  // Copy password to clipboard
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99); // Select all characters
    navigator.clipboard.writeText(password);
    // alert('Password copied to clipboard!');
  }, [password]);

  // Generate password on component mount and when dependencies change
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  // Calculate password strength
  const calculatePasswordStrength = () => {
    let strength = 0;

    // Length check
    if (length >= 12) strength += 2;
    else if (length >= 8) strength += 1;

    // Uppercase check
    if (/[A-Z]/.test(password)) strength += 1;

    // Number check
    if (numberAllowed && /[0-9]/.test(password)) strength += 1;

    // Special character check
    if (charAllowed && /[!@#$%^&*()_+{}[\]~`]/.test(password)) strength += 1;

    // Determine strength level
    if (strength >= 5) return 'Strong';
    if (strength >= 3) return 'Medium';
    return 'Weak';
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-64 h-64 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-20 animate-move-circle-1"></div>
        <div className="absolute w-48 h-48 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full opacity-20 animate-move-circle-2"></div>
        <div className="absolute w-32 h-32 bg-gradient-to-r from-green-500 to-teal-500 rounded-full opacity-20 animate-move-circle-3"></div>
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-lg bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/50 p-8 space-y-6">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          SecurePass Generator
        </h1>

        {/* Password Display */}
        <div className="group relative">
          <input
            type="text"
            value={password}
            className="w-full px-6 py-4 text-xl rounded-lg bg-gray-700/50 border-2 border-gray-600/50 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all pr-24 font-mono text-gray-100 placeholder-gray-400"
            placeholder="Your secure password..."
            readOnly
            ref={passwordRef}

          />
          <button
            onClick={copyPasswordToClipboard}
            className="absolute right-2 top-2 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-md transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            Copy
          </button>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-700/30 p-6 rounded-xl">
          {/* Length Slider */}
          <div className="space-y-4">
            <label className="flex items-center justify-between text-gray-300 font-medium">
              Length: <span className="text-blue-400 font-bold">{length}</span>
            </label>
            <input
              type="range"

              min={6}
              max={32}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer range-lg accent-blue-500"
            />
          </div>

          {/* Include Numbers */}
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                checked={numberAllowed}
                onChange={() => setNumberAllowed((prev) => !prev)}
                className="w-5 h-5 appearance-none border-2 border-gray-400 rounded-md checked:bg-blue-500 checked:border-blue-500 transition-all cursor-pointer"
              />
              <svg
                className="absolute left-0 top-0 w-5 h-5 pointer-events-none fill-white hidden checkmark"
                viewBox="0 0 20 20"
              >
                <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
              </svg>
            </div>
            <label className="text-gray-300 font-medium">Include Numbers</label>
          </div>

          {/* Include Special Characters */}
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                checked={charAllowed}
                onChange={() => setCharAllowed((prev) => !prev)}
                className="w-5 h-5 appearance-none border-2 border-gray-400 rounded-md checked:bg-purple-500 checked:border-purple-500 transition-all cursor-pointer"
              />
              <svg
                className="absolute left-0 top-0 w-5 h-5 pointer-events-none fill-white hidden checkmark"
                viewBox="0 0 20 20"
              >
                <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
              </svg>
            </div>
            <label className="text-gray-300 font-medium">Special Characters</label>
          </div>
        </div>

        {/* Password Strength Indicator */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            Password Strength:
            <span className="font-bold text-blue-400 ml-2">
              {calculatePasswordStrength()}
            </span>
          </p>
        </div>
      </div>
    </div>
  );

}

export default App
