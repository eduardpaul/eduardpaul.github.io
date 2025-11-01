
import React from 'react';
import AnimatedSection from './ui/AnimatedSection';
import { useStaticQuery, graphql } from 'gatsby';

const Certifications = () => {

    // Query for all studies that are certifications from the cv.json file
    let { cvJson: { knowledge: { studies } } } = useStaticQuery(
        graphql`
query {
  cvJson {
    knowledge {
      studies {
        studyType
        name
        startDate
        institution {
          image {
            alt
            link
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
        <section id="certifications" className="py-24 sm:py-32">
            <div className="container mx-auto px-6">
                <AnimatedSection>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">Certifications & Education</h2>
                        <p className="mt-4 text-lg text-slate-600">My commitment to continuous learning and professional development.</p>
                    </div>
                </AnimatedSection>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
                                    <div class="flex-grow">
                                        {cert.institution.image && (
                                            <img
                                                src={cert.institution.image.link}
                                                alt={cert.institution.image.alt}
                                                className="h-24 w-24 mx-auto mb-4 object-contain"
                                            />
                                        )}
                                        <h3 className="font-bold text-slate-800 text-md group-hover:text-blue-600">{cert.name}</h3>
                                    </div>
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
