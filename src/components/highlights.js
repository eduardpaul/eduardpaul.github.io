
import React from 'react';
import AnimatedSection from './ui/AnimatedSection';
import { useStaticQuery, graphql } from 'gatsby';

const Highlights = () => {

    const { cvJson: { experience: { publicArtifacts } } } = useStaticQuery(
        graphql`
query {
  cvJson {
    experience {
        publicArtifacts { 
          details {
            name
            description
            URL
            image {
              link
              alt
            }
          }
          relatedCompetences {
            name
          }
          type
          publishingDate
        }    
    }
  }
}
`)

    return (
        <section id="projects" className="bg-white py-24 sm:py-32">
            <div className="container mx-auto px-6">
                <AnimatedSection>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">Projects & Achievements</h2>
                        <p className="mt-4 text-lg text-slate-600">Recognitions and public contributions to the community.</p>
                    </div>
                </AnimatedSection>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {publicArtifacts.map((artifact, index) => (
                        <AnimatedSection key={index}>
                            <a
                                href={artifact.details.URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block h-full group"
                                aria-label={`View details for ${artifact.details.name}`}
                            >
                                <div className="bg-slate-50 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-6 h-full flex flex-col">
                                    {artifact.details.image && (
                                        <div className="aspect-video mb-6 overflow-hidden rounded-lg">
                                            <img
                                                src={artifact.details.image.link}
                                                alt={artifact.details.image.alt}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    )}
                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                        {artifact.details.name}
                                    </h3>
                                    <p className="text-slate-600 mt-2 flex-grow">{artifact.details.description}</p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {artifact.relatedCompetences.map((comp, i) => (
                                            <span key={i} className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-md">{comp.name}</span>
                                        ))}
                                    </div>
                                </div>
                            </a>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Highlights;
