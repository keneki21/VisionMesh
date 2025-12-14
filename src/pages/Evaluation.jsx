import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function Evaluation() {
  const navigate = useNavigate();
  const [selectedHistory, setSelectedHistory] = useState(0);
  const [showSidebar, setShowSidebar] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Function to generate and export PDF
  const exportToPDF = async () => {
    try {
      console.log('Starting PDF generation...');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      let yPosition = margin;

      console.log('PDF dimensions:', pageWidth, pageHeight);

      // Add VisionMesh Header with gradient background effect
      pdf.setFillColor('#0E1424'); // Black background
      pdf.rect(0, 0, pageWidth, 35, 'F');
      
      // Add decorative line
      // pdf.setDrawColor(168, 85, 247); // Purple accent
      // pdf.setLineWidth(1.5);
      // pdf.line(margin, 33, pageWidth - margin, 33);

      // Add VisionMesh logo image
      try {
        const logoElement = document.querySelector('img[src*="logo.png"], img[src="/logo.png"]');
        if (!logoElement) {
          // If logo not in DOM, create temporary image element
          const tempLogo = document.createElement('img');
          tempLogo.src = '/logo.png';
          await new Promise((resolve) => {
            tempLogo.onload = resolve;
            tempLogo.onerror = resolve;
          });
          const logoCanvas = await html2canvas(tempLogo, { backgroundColor: null });
          const logoData = logoCanvas.toDataURL('image/png');
          pdf.addImage(logoData, 'PNG', margin, 8, 15, 15);
        } else {
          const logoCanvas = await html2canvas(logoElement, { backgroundColor: null });
          const logoData = logoCanvas.toDataURL('image/png');
          pdf.addImage(logoData, 'PNG', margin, 8, 15, 15);
        }
      } catch (error) {
        console.log('Could not add logo:', error);
      }

      // VisionMesh Text - styled like website
      pdf.setFontSize(28);
      pdf.setFont(undefined, 'bold');
      pdf.setTextColor(255, 255, 255);
      pdf.text('Vision', pageWidth / 2 - 17, 18, { align: 'center' });
      
      pdf.setTextColor(34, 211, 238); // Cyan-400
      pdf.text('Mesh', pageWidth / 2 + 10, 18, { align: 'center' });
      
      // Tagline
      pdf.setFontSize(9);
      pdf.setFont(undefined, 'normal');
      pdf.setTextColor(220, 220, 255);
      pdf.text('AI-Powered Website Analysis & Optimization', pageWidth / 2, 26, { align: 'center' });
      
      yPosition = 45;

      // Add Title with colored background
      pdf.setFillColor(241, 245, 249); // Light gray background
      pdf.roundedRect(margin, yPosition, pageWidth - (2 * margin), 20, 3, 3, 'F');
      
      pdf.setFontSize(22);
      pdf.setFont(undefined, 'bold');
      pdf.setTextColor(30, 41, 59); // Dark slate
      pdf.text('Evaluation Report', pageWidth / 2, yPosition + 8, { align: 'center' });
      
      pdf.setFontSize(11);
      pdf.setFont(undefined, 'bold');
      pdf.setTextColor(100, 116, 139); // Slate gray
      pdf.text('BISE Lahore Homepage Analysis', pageWidth / 2, yPosition + 15, { align: 'center' });
      yPosition += 28;
      console.log('Title added');

      // Add Overall Score with styled box
      pdf.setFillColor(254, 243, 199); // Amber light background
      pdf.setDrawColor(251, 191, 36); // Amber border
      pdf.setLineWidth(0.5);
      pdf.roundedRect(margin, yPosition, pageWidth - (2 * margin), 18, 2, 2, 'FD');
      
      pdf.setFontSize(13);
      pdf.setFont(undefined, 'bold');
      pdf.setTextColor(146, 64, 14); // Amber dark
      pdf.text('Overall Website Score:', margin + 5, yPosition + 8);
      
      pdf.setFontSize(18);
      pdf.setTextColor(217, 119, 6); // Amber bright
      pdf.text('59/100', pageWidth - margin - 5, yPosition + 8, { align: 'right' });
      
      // Add score indicator bar
      pdf.setFillColor(251, 191, 36); // Amber
      pdf.roundedRect(margin + 5, yPosition + 12, ((pageWidth - (2 * margin) - 10) * 0.59), 3, 1.5, 1.5, 'F');
      
      yPosition += 25;

      // Add screenshot using html2canvas to capture the displayed image
      try {
        const imgElement = document.querySelector('img[alt="Website Screenshot"]');
        if (imgElement) {
          const canvas = await html2canvas(imgElement, {
            useCORS: true,
            allowTaint: true,
            backgroundColor: null
          });
          
          const imgData = canvas.toDataURL('image/png');
          const imgWidth = pageWidth - (2 * margin);
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          
          if (yPosition + imgHeight > pageHeight - margin) {
            pdf.addPage();
            yPosition = margin;
          }

          pdf.addImage(imgData, 'PNG', margin, yPosition, imgWidth, Math.min(imgHeight, 120));
          yPosition += Math.min(imgHeight, 120) + 10;
        }
      } catch (error) {
        console.error('Could not capture screenshot:', error);
        yPosition += 10;
      }

      // Add new page for errors
      pdf.addPage();
      yPosition = margin;

      // Section 1: Identified Errors with styled header
      pdf.setFillColor(254, 226, 226); // Red light background
      pdf.roundedRect(margin, yPosition, pageWidth - (2 * margin), 12, 2, 2, 'F');
      
      pdf.setFontSize(18);
      pdf.setFont(undefined, 'bold');
      pdf.setTextColor(185, 28, 28); // Red dark
      pdf.text('1. Identified Errors (Detailed)', margin + 3, yPosition + 8);
      yPosition += 18;

      // Error 1 with colored badge
      pdf.setFillColor(254, 243, 199); // Yellow light
      pdf.roundedRect(margin, yPosition, 58, 6, 1, 1, 'F');
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'bold');
      pdf.setTextColor(161, 98, 7); // Yellow dark
      pdf.text('WARNING', margin + 2, yPosition + 4);
      
      pdf.setFillColor(243, 244, 246); // Gray light
      pdf.roundedRect(margin + 61, yPosition, 32, 6, 1, 1, 'F');
      pdf.setTextColor(75, 85, 99); // Gray dark
      pdf.text('Score: 65/100', margin + 63, yPosition + 4);
      yPosition += 9;
      
      pdf.setFontSize(11);
      pdf.setTextColor(17, 24, 39);
      pdf.setFont(undefined, 'bold');
      pdf.text('Inconsistent Spacing (Vertical Rhythm):', margin, yPosition);
      pdf.setFont(undefined, 'normal');
      yPosition += 6;
      
      const error1Text = [
        '• In the "E-Services" section, the text content varies in length (e.g., Card 02',
        '  has 3 lines, Card 03 has 1 line). This pushes the "Apply Now" buttons to',
        '  different heights, breaking the visual line.',
        '• The "Green Header" and "Purple Bar" are overcrowded with almost zero',
        '  padding between items.'
      ];
      error1Text.forEach(line => {
        pdf.setFontSize(10);
        pdf.text(line, margin + 5, yPosition);
        yPosition += 5;
      });
      yPosition += 5;

      // Error 2 with colored badge
      pdf.setFillColor(255, 237, 213); // Orange light
      pdf.roundedRect(margin, yPosition, 38, 6, 1, 1, 'F');
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'bold');
      pdf.setTextColor(194, 65, 12); // Orange dark
      pdf.text('HIGH', margin + 2, yPosition + 4);
      
      pdf.setFillColor(243, 244, 246);
      pdf.roundedRect(margin + 41, yPosition, 32, 6, 1, 1, 'F');
      pdf.setTextColor(75, 85, 99);
      pdf.text('Score: 58/100', margin + 43, yPosition + 4);
      yPosition += 9;
      
      pdf.setFontSize(11);
      pdf.setTextColor(17, 24, 39);
      pdf.setFont(undefined, 'bold');
      pdf.text('Poor Alignment (Grid Violation):', margin, yPosition);
      pdf.setFont(undefined, 'normal');
      yPosition += 6;

      const error2Text = [
        '• Center vs. Left Clash: The "E-Services" main title is left-aligned, but the',
        '  cards below it are center-aligned.',
        '• Icon Misalignment: Icons are not vertically centered with their text labels.',
        '• Search Bar: The search input box and button are misaligned.'
      ];
      error2Text.forEach(line => {
        pdf.setFontSize(10);
        pdf.text(line, margin + 5, yPosition);
        yPosition += 5;
      });
      yPosition += 5;

      // Error 3 with colored badge
      pdf.setFillColor(254, 226, 226); // Red light
      pdf.roundedRect(margin, yPosition, 48, 6, 1, 1, 'F');
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'bold');
      pdf.setTextColor(185, 28, 28); // Red dark
      pdf.text('CRITICAL', margin + 2, yPosition + 4);
      
      pdf.setFillColor(243, 244, 246);
      pdf.roundedRect(margin + 51, yPosition, 32, 6, 1, 1, 'F');
      pdf.setTextColor(75, 85, 99);
      pdf.text('Score: 42/100', margin + 53, yPosition + 4);
      yPosition += 9;
      
      pdf.setFontSize(11);
      pdf.setTextColor(17, 24, 39);
      pdf.setFont(undefined, 'bold');
      pdf.text('Color & Accessibility (W3C Failure):', margin, yPosition);
      pdf.setFont(undefined, 'normal');
      yPosition += 6;

      const error3Text = [
        '• Contrast Violation: The cyan buttons use white text on a light blue',
        '  background. This fails WCAG standards.',
        '• Inconsistent Buttons: The site uses three different button styles, confusing',
        '  users about what is clickable.'
      ];
      error3Text.forEach(line => {
        if (yPosition > pageHeight - 20) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.setFontSize(10);
        pdf.text(line, margin + 5, yPosition);
        yPosition += 5;
      });
      yPosition += 5;

      // Error 4 with colored badge
      if (yPosition > pageHeight - 40) {
        pdf.addPage();
        yPosition = margin;
      }

      pdf.setFillColor(219, 234, 254); // Blue light
      pdf.roundedRect(margin, yPosition, 46, 6, 1, 1, 'F');
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'bold');
      pdf.setTextColor(30, 64, 175); // Blue dark
      pdf.text('MEDIUM', margin + 2, yPosition + 4);
      
      pdf.setFillColor(243, 244, 246);
      pdf.roundedRect(margin + 49, yPosition, 32, 6, 1, 1, 'F');
      pdf.setTextColor(75, 85, 99);
      pdf.text('Score: 70/100', margin + 51, yPosition + 4);
      yPosition += 9;
      
      pdf.setFontSize(11);
      pdf.setTextColor(17, 24, 39);
      pdf.setFont(undefined, 'bold');
      pdf.text('Learnability & Heuristics (Nielsen\'s Violations):', margin, yPosition);
      pdf.setFont(undefined, 'normal');
      yPosition += 6;

      const error4Text = [
        '• Menu Overload: There are 5 different navigation areas visible at once.',
        '• Jargon: "RTI" (Right to Information) is a bureaucratic acronym that students',
        '  or parents may not understand.',
        '• Click Targets: Links are too close together, causing accidental clicks on',
        '  mobile devices.'
      ];
      error4Text.forEach(line => {
        if (yPosition > pageHeight - 20) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.setFontSize(10);
        pdf.text(line, margin + 5, yPosition);
        yPosition += 5;
      });

      // Add new page for solutions
      pdf.addPage();
      yPosition = margin;

      // Section 2: Solutions with styled header
      pdf.setFillColor(220, 252, 231); // Green light background
      pdf.roundedRect(margin, yPosition, pageWidth - (2 * margin), 12, 2, 2, 'F');
      
      pdf.setFontSize(18);
      pdf.setFont(undefined, 'bold');
      pdf.setTextColor(21, 128, 61); // Green dark
      pdf.text('2. Solutions & Recommendations', margin + 3, yPosition + 8);
      yPosition += 18;

      // Solution 1 with icon
      pdf.setFillColor(240, 253, 244); // Green very light
      pdf.roundedRect(margin - 2, yPosition - 2, pageWidth - (2 * margin) + 4, 7, 1, 1, 'F');
      
      pdf.setFontSize(12);
      pdf.setTextColor(22, 101, 52);
      pdf.setFont(undefined, 'bold');
      pdf.text('Fix Spacing & Alignment', margin, yPosition + 4);
      pdf.setFont(undefined, 'normal');
      yPosition += 10;

      const solution1Text = [
        '• Use Flexbox for Cards: Implement CSS Flexbox on the "E-Services" cards so',
        '  that the "Apply Now" buttons are pinned to the bottom.',
        '• Standardize Alignment: Left-align all major headings and card text for a',
        '  cleaner, professional look.'
      ];
      solution1Text.forEach(line => {
        pdf.setFontSize(10);
        pdf.text(line, margin + 5, yPosition);
        yPosition += 5;
      });
      yPosition += 5;

      // Solution 2 with icon
      pdf.setFillColor(240, 253, 244);
      pdf.roundedRect(margin - 2, yPosition - 2, pageWidth - (2 * margin) + 4, 7, 1, 1, 'F');
      
      pdf.setFontSize(12);
      pdf.setTextColor(22, 101, 52);
      pdf.setFont(undefined, 'bold');
      pdf.text('Consolidate Navigation (Reduce Clutter)', margin, yPosition + 4);
      pdf.setFont(undefined, 'normal');
      yPosition += 10;

      const solution2Text = [
        '• Merge Menus: Remove the Purple Bar entirely. Move "Name/F-Name',
        '  Correction" items into a dropdown menu under "E-Services".',
        '• Simplify: Reduce the interface to one primary navigation bar at the top and',
        '  one footer. This reduces cognitive load.'
      ];
      solution2Text.forEach(line => {
        pdf.setFontSize(10);
        pdf.text(line, margin + 5, yPosition);
        yPosition += 5;
      });
      yPosition += 5;

      // Solution 3 with icon
      pdf.setFillColor(240, 253, 244);
      pdf.roundedRect(margin - 2, yPosition - 2, pageWidth - (2 * margin) + 4, 7, 1, 1, 'F');
      
      pdf.setFontSize(12);
      pdf.setTextColor(22, 101, 52);
      pdf.setFont(undefined, 'bold');
      pdf.text('Improve Accessibility & Colors', margin, yPosition + 4);
      pdf.setFont(undefined, 'normal');
      yPosition += 10;

      const solution3Text = [
        '• Fix Contrast: Change the cyan buttons to a Dark Teal or Royal Blue so the',
        '  white text is legible (passing WCAG AA standards).',
        '• Consistent Design System: Choose one button style for all "Call to Action"',
        '  buttons and stick to it throughout the site.'
      ];
      solution3Text.forEach(line => {
        pdf.setFontSize(10);
        pdf.text(line, margin + 5, yPosition);
        yPosition += 5;
      });
      yPosition += 5;

      // Solution 4 with icon
      pdf.setFillColor(240, 253, 244);
      pdf.roundedRect(margin - 2, yPosition - 2, pageWidth - (2 * margin) + 4, 7, 1, 1, 'F');
      
      pdf.setFontSize(12);
      pdf.setTextColor(22, 101, 52);
      pdf.setFont(undefined, 'bold');
      pdf.text('Clarify Terminology', margin, yPosition + 4);
      pdf.setFont(undefined, 'normal');
      yPosition += 10;

      const solution4Text = [
        '• Expand Acronyms: Rename "RTI" to "Right to Info" or "Public Info."',
        '• Add Search Labels: Add placeholder text inside the Search box (e.g.,',
        '  "Search by Roll No...") to guide the user.'
      ];
      solution4Text.forEach(line => {
        pdf.setFontSize(10);
        pdf.text(line, margin + 5, yPosition);
        yPosition += 5;
      });

      // Add professional footer on each page
      const totalPages = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        
        // Footer line
        pdf.setDrawColor(200, 200, 200);
        pdf.setLineWidth(0.3);
        pdf.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);
        
        // Footer text
        pdf.setFontSize(8);
        pdf.setTextColor(120, 120, 120);
        pdf.text(`Generated by VisionMesh • ${new Date().toLocaleDateString()}`, margin, pageHeight - 10);
        pdf.text(`Page ${i} of ${totalPages}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
      }

      console.log('PDF generation complete, opening in new window...');
      
      // Open PDF in new tab using blob
      const pdfBlob = pdf.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');
      
      console.log('PDF opened successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const [historyItems, setHistoryItems] = useState([
    {
      id: 1,
      name: 'BISE lahore Homepage Analysis',
      date: 'Nov 15, 2024',
      time: '14:30 PM',
      thumbnail: '📊',
      score: 87,
      category: 'E-commerce'
    },
    {
      id: 2,
      name: 'Portfolio Website Review',
      date: 'Nov 14, 2024',
      time: '10:15 AM',
      thumbnail: '💼',
      score: 92,
      category: 'Portfolio'
    },
    {
      id: 3,
      name: 'SaaS Dashboard Design',
      date: 'Nov 12, 2024',
      time: '16:45 PM',
      thumbnail: '📈',
      score: 78,
      category: 'SaaS'
    },
    {      id: 4,
      name: 'Non-Profit Org Site',
      date: 'Nov 10, 2024',
      time: '09:00 AM',
      thumbnail: '🌍',
      score: 85,
      category: 'Non-Profit'
    },
    {      id: 5,
      name: 'Blog Platform UX Review',
      date: 'Nov 08, 2024',
      time: '11:20 AM',
      thumbnail: '📝',
      score: 80,
      category: 'Blog'
    },
    {      id: 6,
      name: 'Educational Site Analysis',
      date: 'Nov 05, 2024', 
      time: '13:10 PM',
      thumbnail: '🎓',
      score: 88,
      category: 'Education'
    },
    {      id: 7,
      name: 'Healthcare Portal Review',
      date: 'Nov 03, 2024',
      time: '15:00 PM',
      thumbnail: '🏥',
      score: 90,
      category: 'Healthcare'
    },
    {      id: 8, 
      name: 'Travel Agency Site',
      date: 'Nov 01, 2024',
      time: '12:30 PM',
      thumbnail: '✈️',
      score: 83,
      category: 'Travel'  
    },
    {      id: 9,
      name: 'Restaurant Website UX',
      date: 'Oct 30, 2024',
      time: '14:00 PM',
      thumbnail: '🍽️',
      score: 82,
      category: 'Restaurant'
    },
    {      id: 10,
      name: 'Financial Services Site',  
      date: 'Oct 28, 2024',
      time: '10:45 AM',
      thumbnail: '💰',
      score: 89,
      category: 'Financial Services'
    }
  ]);

  return (
    <div className="min-h-screen h-screen flex relative bg-gray-950 overflow-hidden pt-16">
      {/* Cool Background Designs */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Colorful gradient blobs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-purple-600/35 to-pink-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-gradient-to-tl from-cyan-500/40 to-blue-500/35 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-600/35 to-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-[380px] h-[380px] bg-gradient-to-bl from-teal-500/30 to-cyan-400/30 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '5.5s', animationDelay: '0.5s' }}></div>
        
        {/* Additional gradient blobs */}
        <div className="absolute top-1/2 left-1/6 w-[350px] h-[350px] bg-gradient-to-br from-fuchsia-600/28 to-purple-600/28 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6.5s', animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/5 right-1/3 w-[420px] h-[420px] bg-gradient-to-bl from-blue-500/32 to-indigo-600/32 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '0.8s' }}></div>
        <div className="absolute bottom-1/5 right-1/5 w-[450px] h-[450px] bg-gradient-to-tr from-emerald-500/28 to-teal-500/28 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7.5s', animationDelay: '2.5s' }}></div>
        
        {/* Flowing wave lines */}
        <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <defs>
            <linearGradient id="evalGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'rgb(168, 85, 247)', stopOpacity: 0.3 }} />
              <stop offset="50%" style={{ stopColor: 'rgb(34, 211, 238)', stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: 'rgb(236, 72, 153)', stopOpacity: 0.3 }} />
            </linearGradient>
          </defs>
          <path d="M0,200 Q250,150 500,200 T1000,200" stroke="url(#evalGrad1)" strokeWidth="3" fill="none" className="animate-pulse" style={{ animationDuration: '4s' }}/>
          <path d="M0,400 Q250,500 500,400 T1000,400" stroke="url(#evalGrad1)" strokeWidth="3" fill="none" className="animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}/>
          <path d="M0,600 Q250,550 500,600 T1000,600" stroke="url(#evalGrad1)" strokeWidth="2" fill="none" className="animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}/>
        </svg>
        
        {/* Scattered light particles */}
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `rgba(${Math.random() > 0.5 ? '168, 85, 247' : '34, 211, 238'}, ${0.2 + Math.random() * 0.2})`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
        
        {/* Radial burst effects */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-20">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/35 to-transparent animate-ping" style={{ animationDuration: '5s' }}></div>
        </div>
        
        {/* Geometric accents */}
        <div className="absolute top-1/3 left-1/5 w-40 h-40 border border-cyan-400/25 rounded-lg rotate-12 animate-pulse opacity-35"></div>
        <div className="absolute bottom-1/3 right-1/5 w-32 h-32 border border-purple-400/25 rounded-full animate-pulse opacity-30" style={{ animationDuration: '4s' }}></div>
      </div>

      {/* Left Sidebar - Always Visible */}
      <div className="w-64 bg-gray-900/80 backdrop-blur-md border-r border-gray-700 flex flex-col z-50 flex-shrink-0 fixed left-0 top-16 bottom-0">
        {/* New Analysis Button */}
        <div className="p-3">
          <button
            onClick={() => navigate('/home')}
            className="w-full px-3 py-2.5 bg-transparent hover:bg-gray-800 text-white rounded-lg font-medium transition-colors flex items-center justify-start gap-2 border border-gray-700 hover:border-gray-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Analysis
          </button>
        </div>

        {/* Search */}
        <div className="px-3 pb-3">
          <div className="relative">
            <svg className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-600"
            />
          </div>
        </div>

        {/* Your chats header */}
        <div className="px-3 py-2 border-b border-gray-700">
          <button className="flex items-center justify-between w-full text-left px-2 py-1 hover:bg-gray-800 rounded transition-colors">
            <span className="text-sm text-gray-400">Your chats</span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-scroll py-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800 overscroll-contain">
          <div className="space-y-0.5">
            {historyItems
              .filter(item => 
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.category.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((item, index) => (
                <div key={item.id}>
                  {index % 2 === 0 && (
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                      {item.date}
                    </div>
                  )}
                  <button
                    onClick={() => setSelectedHistory(historyItems.findIndex(h => h.id === item.id))}
                    className={`w-full text-left px-3 py-2.5 text-sm transition-colors flex items-center justify-between group ${
                      selectedHistory === historyItems.findIndex(h => h.id === item.id)
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    <span className="truncate flex-1">{item.name}</span>
                    <svg className="w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              ))}
            {historyItems.filter(item => 
              item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.category.toLowerCase().includes(searchQuery.toLowerCase())
            ).length === 0 && searchQuery && (
              <div className="px-3 py-4 text-center text-gray-500 text-sm">
                No results found
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full relative overflow-y-auto ml-64 overscroll-contain">
        {/* Analysis Report */}
        <div className="p-6 max-w-6xl mx-auto">
          {/* Website Screenshot */}
          <div className="mb-6">
            <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden max-w-4xl">
              <img 
                src="/ss.png" 
                alt="Website Screenshot" 
                className="w-full h-auto object-contain max-h-[500px]"
              />
            </div>
          </div>

          {/* Overall Score Card */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">Overall Website Score</h2>
                <p className="text-gray-400 text-sm">Based on design, accessibility, and usability metrics</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-5xl font-bold text-white mb-1">59</div>
                  <div className="text-sm text-gray-400">out of 100</div>
                </div>
                <div className="w-24 h-24 relative">
                  <svg className="transform -rotate-90 w-24 h-24">
                    <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-700" />
                    <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset="102" className="text-orange-500" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-orange-500">59%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 1: Identified Errors */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 mb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              1. Identified Errors (Detailed)
            </h2>
          </div>

          <div className="mb-6">
            <div className="space-y-6 text-gray-300">
              {/* Error 1 */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded uppercase">Warning</span>
                  <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs font-bold rounded">Score: 65/100</span>
                  <span className="text-white">Inconsistent Spacing (Vertical Rhythm):</span>
                </h3>
                <ul className="space-y-2 pl-5">
                  <li className="list-disc">In the "E-Services" section, the text content varies in length (e.g., Card 02 has 3 lines, Card 03 has 1 line). This pushes the "Apply Now" buttons to different heights, breaking the visual line.</li>
                  <li className="list-disc">The "Green Header" and "Purple Bar" are overcrowded with almost zero padding between items.</li>
                </ul>
              </div>

              {/* Error 2 */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs font-bold rounded uppercase">High</span>
                  <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs font-bold rounded">Score: 58/100</span>
                  <span className="text-white">Poor Alignment (Grid Violation):</span>
                </h3>
                <ul className="space-y-2 pl-5">
                  <li className="list-disc"><strong className="text-white">Center vs. Left Clash:</strong> The "E-Services" main title is left-aligned, but the cards below it are center-aligned. The "Latest News" is left-aligned again. This zig-zag pattern fatigues the eye.</li>
                  <li className="list-disc"><strong className="text-white">Icon Misalignment:</strong> In the gray bar (Complaints, RTI), the icons are not vertically centered with their text labels.</li>
                  <li className="list-disc"><strong className="text-white">Search Bar:</strong> The search input box and button are misaligned with the surrounding elements in the top right.</li>
                </ul>
              </div>

              {/* Error 3 */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded uppercase">Critical</span>
                  <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs font-bold rounded">Score: 42/100</span>
                  <span className="text-white">Color & Accessibility (W3C Failure):</span>
                </h3>
                <ul className="space-y-2 pl-5">
                  <li className="list-disc"><strong className="text-white">Contrast Violation:</strong> The cyan buttons (bottom left) use white text on a light blue background. This is unreadable for many users and fails WCAG (Web Content Accessibility Guidelines) standards.</li>
                  <li className="list-disc"><strong className="text-white">Inconsistent Buttons:</strong> The site uses three different button styles: Dark Blue Rectangles (Top), Red Rounded (Middle), and Cyan Rounded (Bottom). This confuses users about what is clickable.</li>
                </ul>
              </div>

              {/* Error 4 */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded uppercase">Medium</span>
                  <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs font-bold rounded">Score: 70/100</span>
                  <span className="text-white">Learnability & Heuristics (Nielsen's Violations):</span>
                </h3>
                <ul className="space-y-2 pl-5">
                  <li className="list-disc"><strong className="text-white">Menu Overload:</strong> There are 5 different navigation areas visible at once (Green top, Purple bar, Main Cards, Gray icon bar, Side menu). Users don't know where to look first.</li>
                  <li className="list-disc"><strong className="text-white">Jargon:</strong> "RTI" (Right to Information) is a bureaucratic acronym that students or parents may not understand.</li>
                  <li className="list-disc"><strong className="text-white">Click Targets:</strong> Links in the purple bar ("Name Correction", "F-Name Correction") are too close together. On a mobile device, users will accidentally click the wrong one.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 2: Solutions & Recommendations */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 mb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              2. Solutions & Recommendations
            </h2>
          </div>

          <div className="mb-6">
            <div className="space-y-6 text-gray-300">
              {/* Solution 1 */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Fix Spacing & Alignment</h3>
                <ul className="space-y-2 pl-5">
                  <li className="list-disc"><strong className="text-white">Use Flexbox for Cards:</strong> Implement CSS Flexbox on the "E-Services" cards so that the "Apply Now" buttons are pinned to the bottom of the container. This keeps them perfectly aligned regardless of text length.</li>
                  <li className="list-disc"><strong className="text-white">Standardize Alignment:</strong> Left-align all major headings and card text for a cleaner, professional look that is easier to read.</li>
                </ul>
              </div>

              {/* Solution 2 */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Consolidate Navigation (Reduce Clutter)</h3>
                <ul className="space-y-2 pl-5">
                  <li className="list-disc"><strong className="text-white">Merge Menus:</strong> Remove the Purple Bar entirely. Move "Name/F-Name Correction" items into a dropdown menu under "E-Services" in the main header.</li>
                  <li className="list-disc"><strong className="text-white">Simplify:</strong> Reduce the interface to one primary navigation bar at the top and one footer. This reduces cognitive load.</li>
                </ul>
              </div>

              {/* Solution 3 */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Improve Accessibility & Colors</h3>
                <ul className="space-y-2 pl-5">
                  <li className="list-disc"><strong className="text-white">Fix Contrast:</strong> Change the cyan buttons to a Dark Teal or Royal Blue so the white text is legible (passing WCAG AA standards).</li>
                  <li className="list-disc"><strong className="text-white">Consistent Design System:</strong> Choose one button style (e.g., Rounded Red) for all "Call to Action" buttons and stick to it throughout the site.</li>
                </ul>
              </div>

              {/* Solution 4 */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Clarify Terminology</h3>
                <ul className="space-y-2 pl-5">
                  <li className="list-disc"><strong className="text-white">Expand Acronyms:</strong> Rename "RTI" to "Right to Info" or "Public Info."</li>
                  <li className="list-disc"><strong className="text-white">Add Search Labels:</strong> Add placeholder text inside the Search box (e.g., "Search by Roll No...") to guide the user.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-20 flex flex-wrap gap-3">
            <button 
              onClick={() => navigate('/code-generation')}
              className="px-6 py-3 bg-white hover:bg-gray-100 text-black rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              Generate Optimized Design
            </button>
            <button 
              onClick={exportToPDF}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Report
            </button>
            {/* <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share Analysis
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Evaluation;