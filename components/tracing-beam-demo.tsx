"use client";
import React from "react";
import { TracingBeam } from "@/components/ui/tracing-beam";

export default function TracingBeamDemo() {
  return (
    <TracingBeam className="px-6">
      <div className="max-w-2xl mx-auto antialiased pt-4 relative">
        {dummyContent.map((item, index) => (
          <div key={`content-${index}`} className="mb-10">
            <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
              {item.badge}
            </h2>

            <p className="text-xl mb-4 font-semibold">
              {item.title}
            </p>

            <div className="text-sm prose prose-sm dark:prose-invert">
              {item?.image && (
                <img
                  src={item.image}
                  alt="blog thumbnail"
                  height="1000"
                  width="1000"
                  className="rounded-lg mb-10 object-cover"
                />
              )}
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </TracingBeam>
  );
}

const dummyContent = [
  {
    title: "AI Consulting & Strategy",
    description: (
      <>
        <p>
          Helping businesses integrate AI solutions into their workflows. From strategy development to implementation, 
          I work with companies to identify opportunities where AI can drive value and efficiency.
        </p>
        <p>
          My approach focuses on practical applications that solve real business problems, ensuring 
          sustainable adoption and measurable results.
        </p>
      </>
    ),
    badge: "Consulting",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3",
  },
  {
    title: "Technical Development",
    description: (
      <>
        <p>
          Building custom AI applications using modern frameworks and tools. Specializing in RAG systems, 
          chatbots, and machine learning integrations that enhance user experiences.
        </p>
        <p>
          From prototype to production, I ensure solutions are scalable, maintainable, and aligned 
          with business objectives.
        </p>
      </>
    ),
    badge: "Development",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3",
  },
  {
    title: "Speaking & Education",
    description: (
      <>
        <p>
          Sharing knowledge through conferences, workshops, and educational content. Making AI accessible 
          to developers and business leaders through practical examples and real-world case studies.
        </p>
      </>
    ),
    badge: "Speaking",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=3506&ixlib=rb-4.0.3",
  },
];