import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import AnimatedSection from './ui/AnimatedSection';
import ReadMore from './ui/ReadMore';
import CvImage from './core/cvimage';

const Hero = () => {

    const { cvJsonEnhanced: { aboutMe: { profile } } } = useStaticQuery(
        graphql`
query {
  cvJsonEnhanced {
    aboutMe {
      profile {
        description
        name
        surnames
        title
        avatar {
          alt
          link
          localFile {
            id
            childImageSharp {
              gatsbyImageData(width: 400, placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
}
`)

    return (
        <section id="bio" className="container mx-auto px-6 py-12">
            <AnimatedSection>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
                    <div className="md:col-span-2 flex justify-center">
                        <CvImage imageObject={profile.avatar} className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-xl ring-4 ring-white"/>
                    </div>
                    <div className="md:col-span-3 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                            {profile.name} {profile.surnames}
                        </h1>
                        <h2 className="mt-2 text-xl md:text-2xl font-semibold text-blue-600">
                            {profile.title}
                        </h2>
                        <ReadMore initialMaxHeight="max-h-40">
                            <p className="mt-6 text-lg text-slate-600 whitespace-pre-line">
                                {profile.description}
                            </p>
                        </ReadMore>
                    </div>
                </div>
            </AnimatedSection>
        </section>
    );
};

export default Hero;
