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
        <section id="bio" className="container mx-auto px-6 py-20">
            <AnimatedSection>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                    <div className="md:col-span-5 lg:col-span-4 flex justify-center md:justify-start">
                        <CvImage imageObject={profile.avatar} className="w-56 h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full object-cover shadow-xl ring-4 ring-white"/>
                    </div>
                    <div className="md:col-span-7 lg:col-span-8 text-left">
                        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                            {profile.name} {profile.surnames}
                        </h1>
                        <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-primary-600">
                            {profile.title}
                        </h2>
                        <ReadMore initialMaxHeight="max-h-40">
                            <p className="mt-6 text-lg text-gray-600 whitespace-pre-line">
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
