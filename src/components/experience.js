import React from 'react';
import AnimatedSection from './ui/AnimatedSection';
import ReadMore from './ui/ReadMore';
import { useStaticQuery, graphql } from 'gatsby';
import MarkdownParser from './core/markdownparser';

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
};

const Experience = () => {
  const { cvJson: { experience: { jobs } } } = useStaticQuery(
    graphql`
query {
  cvJson {
    experience { 
      jobs {
        organization {
          name
        }
        roles {
          name
          startDate
          finishDate
          challenges {
            description
          }
        }
      }
    }
  }
}
`)

  return (
    <section id="experience" className="py-12">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">Career Journey</h2>
            <p className="mt-4 text-lg text-slate-600">My professional growth and key contributions over the years.</p>
          </div>
        </AnimatedSection>

        <div className="relative border-l-2 border-blue-200 ml-4 md:ml-0">
          {jobs.map((job, jobIndex) => (
            <AnimatedSection key={jobIndex}>
              {job.roles.map((role, roleIndex) => (
                <div key={roleIndex} className="mb-12 pl-10 md:pl-12 relative">
                  <span className="absolute -left-[1.35rem] top-1 flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full ring-8 ring-white">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 6V5a1 1 0 011-1h6a1 1 0 011 1v1h2a1 1 0 011 1v3a1 1 0 01-1 1h-2.172l-2.414 2.414A1 1 0 0110 14.5V12H8v2.5a1 1 0 01-1.707.707L3.879 12.8A1 1 0 013 12v-3a1 1 0 011-1h2z" clipRule="evenodd" /><path d="M7 7.5a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1z" /></svg>
                  </span>
                  <div className="p-6 bg-white rounded-xl shadow-md border border-slate-100">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                      <h3 className="text-xl font-bold text-slate-900">{role.name}</h3>
                      <time className="text-sm font-medium text-slate-500 mt-1 sm:mt-0">{formatDate(role.startDate)} - {role.finishDate ? formatDate(role.finishDate) : 'Present'}</time>
                    </div>
                    <p className="text-md font-semibold text-blue-600 mb-4">{job.organization.name}</p>
                    {role.challenges.map((challenge, challengeIndex) => (
                      <div key={challengeIndex}>
                        <ReadMore initialMaxHeight="max-h-24" gradientBackgroundClass="from-white">
                          <MarkdownParser text={challenge.description} />
                        </ReadMore>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
