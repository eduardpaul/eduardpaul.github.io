import React from 'react';
import AnimatedSection from './ui/AnimatedSection';
import { useStaticQuery, graphql } from 'gatsby';
import MarkdownParser from './core/markdownparser';

const Competencies = () => {

    let { cvJsonEnhanced: { aboutMe: { interestingFacts } } } = useStaticQuery(
        graphql`
query {
  cvJsonEnhanced {
    aboutMe {
      interestingFacts {
        fact
        topic
      }
    }
  }
}
`)

    // custom sort for interesting facts by the lenght of the fact
    interestingFacts = [...interestingFacts].sort((a, b) => { return a.fact.length - b.fact.length });

    return (
        <section id="competencies" className="bg-white py-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {interestingFacts.map((fact, index) => (
                        <AnimatedSection key={index}>
                            <div className="bg-slate-50 p-8 h-full flex flex-col rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                                <h3 className="flex items-center text-xl font-bold text-blue-700 mb-4">
                                    {fact.topic}
                                </h3>
                                <MarkdownParser text={fact.fact} className="list-disc pl-5 text-[15px] text-slate-700 leading-relaxed space-y-2" />
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Competencies;
