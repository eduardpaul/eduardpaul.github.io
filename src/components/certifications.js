
import React from 'react';
import AnimatedSection from './ui/AnimatedSection';
import { useStaticQuery, graphql } from 'gatsby';
import CvImage from './core/cvimage';

const Certifications = () => {

  let { cvJsonEnhanced: { knowledge: { studies } } } = useStaticQuery(
    graphql`
query {
  cvJsonEnhanced {
    knowledge {
      studies {
        studyType
        name
        startDate
        institution {
          image {
            alt
            link
            localFile {
              id
              publicURL
              childImageSharp {
                gatsbyImageData(height: 100, placeholder: BLURRED)
              }
            }
          }
          name
          URL
        }
      }
    }
  }
}
`)

  // sort the certifications by start date in descending order
  studies = [...studies].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
  // filter all certifications
  let certifications = studies.filter(study => study.studyType === 'certification');

  return (
    <section id="certifications" className="py-12">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">Certifications & Education</h2>
            <p className="mt-4 text-lg text-slate-600">My commitment to continuous learning and professional development.</p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {certifications.map((cert, index) => (
            <AnimatedSection key={index} className="h-full">
              <a
                href={cert.institution.URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block group h-full"
                aria-label={`Verify certification: ${cert.name}`}
              >
                <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 text-center transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-lg h-full flex flex-col">
                  <div className="flex-grow flex items-center justify-center">
                    <CvImage
                      imageObject={cert.institution.image}
                      className="h-24 max-h-full object-contain"
                    />
                  </div>
                  <h3 className="font-bold text-slate-800 text-md group-hover:text-blue-600 mt-4">
                    {cert.name}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">{cert.institution.name}</p>
                </div>
              </a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
