
import React from 'react';

export const CERTIFICATIONS = [
    { name: "DevOps Engineer Expert (AZ-400)", issuer: "Microsoft", date: "09/2023" },
    { name: "Azure Developer Associate (AZ-204)", issuer: "Microsoft", date: "02/2022" },
    { name: "Security, Compliance, and Identity (SC-900)", issuer: "Microsoft", date: "01/2022" },
    { name: "Azure AI Fundamentals (AI-900)", issuer: "Microsoft", date: "01/2022" },
    { name: "M365 Fundamentals (MS-900)", issuer: "Microsoft", date: "03/2021" },
    { name: "DevOps Foundation®", issuer: "DevOps Institute", date: "12/2020" },
    { name: "M365 Developer Associate (MS-600)", issuer: "Microsoft", date: "10/2020" },
    { name: "Azure Fundamentals (AZ-900)", issuer: "Microsoft", date: "09/2020" },
    { name: "Professional Scrum Master I", issuer: "Scrum.org", date: "05/2019" },
];

const Certifications = () => {
    return (
        <section id="certifications">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    Certifications
                </h2>
                <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-600">
                    Continuously learning and validating expertise.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CERTIFICATIONS.map((cert, index) => (
                    <div key={index} className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex items-center space-x-4">
                        <div className="flex-shrink-0">
                           <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                        </div>
                        <div>
                            <p className="font-semibold text-slate-800">{cert.name}</p>
                            <p className="text-sm text-slate-500">{cert.issuer} &bull; {cert.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Certifications;
