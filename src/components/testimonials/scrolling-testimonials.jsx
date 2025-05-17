
"use client";
import TestimonialCard from './testimonial-card';

const ScrollingTestimonials = ({ testimonials }) => {
  if (!testimonials || testimonials.length === 0) {
    return <p className="text-center text-muted-foreground">No testimonials available yet.</p>;
  }
  // Duplicate testimonials for seamless looping, ensuring enough items for a good scroll
  const itemsToDisplay = testimonials.length < 4 ? 
    [...testimonials, ...testimonials, ...testimonials, ...testimonials] : 
    [...testimonials, ...testimonials];


  return (
    <div className="marquee-container w-full py-8 group">
      <div className="marquee-content flex gap-6 group-hover:[animation-play-state:paused]">
        {itemsToDisplay.map((testimonial, index) => (
          <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
};
export default ScrollingTestimonials;
