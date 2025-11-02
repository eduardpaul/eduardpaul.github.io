import React from 'react';

const SocialIcon = ({ name, className = "h-5 w-5" }) => {
  // FIX: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
  const icons = {
    LinkedIn: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ),
    Email: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    ),
    Skype: (
       <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22.98,13.785c-1.339-1.633-3.052-2.7-5.14-3.15c-0.126-1.065-0.542-2.062-1.229-2.935 c-0.95-1.206-2.229-2.04-3.754-2.348c-1.129-0.228-2.313-0.05-3.401,0.479c-1.24,0.606-2.223,1.571-2.859,2.787 c-0.899,1.748-0.923,3.79-0.068,5.559c-1.488,0.72-2.62,1.969-3.029,3.487c-0.459,1.728,0.023,3.493,1.189,4.781 c1.182,1.303,2.83,2.01,4.555,2.01c0.05,0,0.1,0,0.15,0l0.04-0.002c2.148-0.123,4.032-1.24,5.29-2.919 c1.077-1.442,1.662-3.17,1.662-4.942c0-0.285-0.035-0.566-0.101-0.841c1.397-0.171,2.696-0.796,3.725-1.804 C23.666,16.591,23.86,15.113,22.98,13.785z M10.402,8.818c1.352-0.627,2.898-0.58,4.215,0.138c1.23,0.672,2.09,1.823,2.399,3.131 c-0.686-0.255-1.401-0.413-2.138-0.463c-1.554-0.108-3.052,0.245-4.246,1.011c-1.02,0.656-1.784,1.6-2.15,2.68 c-0.559-1.268-0.529-2.738,0.088-3.985C8.89,10.04,9.522,9.263,10.402,8.818z"/>
      </svg>
    ),
    Mobile: (
       <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
      </svg>
    ),
  };
  return icons[name] || null;
};

export default SocialIcon;
