import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function Help() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('getting-started');

  // Read category from URL parameter
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setActiveCategory(category);
    }
  }, [searchParams]);

  const faqs = {
    'getting-started': [ 
      {
        question: 'What is VisionMesh?',
        answer: 'VisionMesh is an advanced platform that analyzes images and generates corresponding code. It helps developers quickly convert visual designs into functional code.'
      },
      {
        question: 'How do I get started?',
        answer: 'Simply upload an image on the Home page, and our AI will analyze it and generate code for you. You can then view the evaluation and generated code on their respective pages.'
      },
      {
        question: 'What image formats are supported?',
        answer: 'VisionMesh supports common image formats including JPG, PNG, GIF, and WebP. For best results, use high-quality images with clear visual elements.'
      }
    ],
    'features': [
      {
        question: 'What can VisionMesh analyze?',
        answer: 'VisionMesh can analyze UI components, layouts, color schemes, typography, and design patterns from images. It identifies elements and generates corresponding HTML, CSS, and JavaScript code.'
      },
      {
        question: 'Can I edit the generated code?',
        answer: 'Yes! The Code Generation page allows you to view, edit, and copy the generated code. You can customize it to fit your specific needs.'
      },
      {
        question: 'How accurate is the code generation?',
        answer: 'Our AI continuously learns and improves. The accuracy depends on image quality and complexity. Simple, clear designs typically yield more accurate results.'
      }
    ],
    'account': [
      {
        question: 'How do I update my profile?',
        answer: 'Go to Settings > Profile to update your personal information, profile picture, and bio.'
      },
      {
        question: 'How do I change my password?',
        answer: 'Navigate to Settings > Security and enter your current password followed by your new password.'
      },
      {
        question: 'Can I delete my account?',
        answer: 'Yes, you can permanently delete your account from Settings > Account. Please note this action is irreversible.'
      }
    ],
    'troubleshooting': [
      {
        question: 'Why is my image not uploading?',
        answer: 'Check that your image file size is under 10MB and is in a supported format (JPG, PNG, GIF, WebP). Also ensure you have a stable internet connection.'
      },
      {
        question: 'The generated code doesn\'t match my design',
        answer: 'Try uploading a higher quality image with better contrast. Complex designs may require manual adjustments to the generated code.'
      },
      {
        question: 'I\'m not receiving notifications',
        answer: 'Check your notification settings in Settings > Notifications and ensure you\'ve allowed browser notifications.'
      }
    ]
  };

  const categories = [
    { id: 'getting-started', name: 'Getting Started', icon: '' },
    { id: 'features', name: 'Features', icon: '' },
    { id: 'account', name: 'Account', icon: '' },
    { id: 'troubleshooting', name: 'Troubleshooting', icon: '' }
  ];

  return (
    <div className="min-h-screen bg-gray-950 pt-16 sm:pt-20 relative overflow-hidden">
      {/* Cool Background Designs */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-purple-600/60 to-pink-600/50 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-gradient-to-tl from-cyan-500/65 to-blue-500/55 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-600/55 to-purple-500/50 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '2s' }}></div>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Help Center</h1>
          </div>
          <p className="text-gray-400 text-sm sm:text-base">Find answers to common questions and learn how to use VisionMesh</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Category Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-left transition-all duration-300 flex items-center gap-3 mb-1 ${
                    activeCategory === category.id
                      ? 'bg-cyan-400 text-white shadow-lg shadow-cyan-600/30'
                      : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span className="font-medium text-sm sm:text-base">{category.name}</span>
                </button>
              ))}
            </div>

            {/* Contact Support */}
            <div className="mt-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4">
              <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">Need More Help?</h3>
              <p className="text-gray-400 text-xs sm:text-sm mb-3">Can't find what you're looking for?</p>
              <button className="w-full px-4 py-2 bg-cyan-400 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors text-sm">
                Contact Support
              </button>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
                {categories.find(c => c.id === activeCategory)?.name}
              </h2>

              <div className="space-y-4 sm:space-y-6">
                {faqs[activeCategory].map((faq, index) => (
                  <div key={index} className="pb-4 sm:pb-6 border-b border-white/10 last:border-0 last:pb-0">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">{faq.question}</h3>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <a
                href="#"
                className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <h4 className="text-white font-semibold text-sm">Documentation</h4>
                </div>
                <p className="text-gray-400 text-xs">Complete API docs</p>
              </a>

              <a
                href="#"
                className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                  </svg>
                  <h4 className="text-white font-semibold text-sm">Tutorials</h4>
                </div>
                <p className="text-gray-400 text-xs">Step-by-step guides</p>
              </a>

              <a
                href="#"
                className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                  <h4 className="text-white font-semibold text-sm">Community</h4>
                </div>
                <p className="text-gray-400 text-xs">Join discussions</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;