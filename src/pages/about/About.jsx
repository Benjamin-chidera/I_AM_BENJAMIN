/* eslint-disable react/no-unescaped-entities */

import { useEffect, useState } from "react";
// import db from "../../assets/db.png";
import { useAboutStore } from "../../store/about.store";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useProfileStore } from "../../store/profile.store";

const About = () => {
  const { about_me, getAbout, isUpdating } = useAboutStore();
  const [loading, setLoading] = useState(true);
   const { profile, getProfile } = useProfileStore();

  useEffect(() => {
    const fetchAbout = async () => {
      setLoading(true);
      await Promise.all([getAbout(), getProfile()]);
      setLoading(false);
    };
    fetchAbout();
  }, [getAbout, getProfile]);
  if (loading) {
    return (
      <main className="mx-6 lg:mx-12 pt-10 lg:flex justify-between">
        {/* Profile Image Skeleton */}
        <section className="relative lg:sticky lg:top-10 lg:h-[350px] lg:w-[300px] transition-all duration-500">
          <Skeleton
            height={350}
            width={300}
            className="hidden lg:block rounded-tl-xl rounded-tr-xl"
          />
        </section>

        {/* About Content Skeleton */}
        <section className="lg:ml-10 flex-1">
          <div className="p-8 space-y-4">
            <Skeleton width={200} height={32} />
            <Skeleton count={5} height={20} className="mb-3" />
            <Skeleton width={150} height={24} className="mt-6 mb-3" />
            <Skeleton count={4} height={20} className="mb-2" />
            <Skeleton count={3} height={20} className="mt-6" />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-6 lg:mx-12 pt-10 lg:flex justify-between">
      {/* Profile Image */}
      <section className="relative lg:sticky lg:top-10 lg:h-[350px] lg:w-[300px] transition-all duration-500">
        <img
          className="hidden lg:block h-full w-full object-cover cursor-pointer rounded-tl-xl rounded-tr-xl"
          src={profile?.profile_image}
          alt="Benjamin"
        />
      </section>

      {/* About Content */}
      <section className="lg:ml-10 flex-1">
        <div
          className="p-8 max-w-none space-y-5 leading-relaxed text-lg prose prose-invert prose-cyan"
          dangerouslySetInnerHTML={{ __html: about_me || "" }}
          style={{
            opacity: isUpdating ? 0.6 : 1,
            pointerEvents: isUpdating ? "none" : "auto",
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Fallback if no about_me content */}
        {!about_me && (
          <div className="p-8 text-gray-400 text-center">
            <p>No about information available yet.</p>
          </div>
        )}
      </section>

      <style>{`
        /* About section prose styling */
        .prose h1 {
          font-size: 2.25rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 1.25rem;
        }

        .prose h2 {
          font-size: 1.875rem;
          font-weight: 600;
          color: #22d3ee;
          margin-top: 2rem;
          margin-bottom: 1rem;
          text-decoration: underline;
        }

        .prose h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #22d3ee;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }

        .prose p {
          color: #d1d5db;
          margin-bottom: 1.25rem;
          line-height: 1.75;
          font-size: 1.125rem;
        }

        .prose strong {
          color: #ffffff;
          font-weight: 600;
        }

        .prose em {
          color: #d1d5db;
          font-style: italic;
        }

        .prose ul {
          color: #d1d5db;
          margin-left: 1.5rem;
          margin-bottom: 1rem;
          list-style-type: disc;
        }

        .prose li {
          margin-bottom: 0.75rem;
          font-size: 1rem;
          line-height: 1.6;
        }

        .prose li strong {
          color: #ffffff;
        }

        .prose blockquote {
          border-left: 4px solid #22d3ee;
          padding-left: 1rem;
          color: #9ca3af;
          font-style: italic;
          margin: 1.5rem 0;
        }

        .prose code {
          background: #1a1a2e;
          color: #22d3ee;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.875rem;
        }

        .prose pre {
          background: #1a1a2e;
          color: #e5e5e5;
          padding: 1rem;
          border-radius: 8px;
          overflow-x: auto;
          margin: 1rem 0;
        }

        .prose a {
          color: #22d3ee;
          text-decoration: none;
          font-weight: 500;
        }

        .prose a:hover {
          text-decoration: underline;
          color: #06b6d4;
        }
      `}</style>
    </main>
  );
};

export default About;
