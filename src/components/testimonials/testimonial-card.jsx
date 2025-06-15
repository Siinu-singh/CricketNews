
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const TestimonialCard = ({ testimonial }) => {
  if (!testimonial) {
    return null; 
  }

  return (
    <Card className="w-[300px] min-w-[300px] sm:w-[320px] sm:min-w-[320px] md:w-[350px] md:min-w-[350px] 2xl:w-[400px] 2xl:min-w-[400px] 3xl:w-[450px] 3xl:min-w-[450px] shadow-lg flex-shrink-0 p-4 sm:p-5 md:p-6 2xl:p-7 3xl:p-8 space-y-3 sm:space-y-4 2xl:space-y-5 bg-card text-card-foreground rounded-xl border border-border/50">
      <div className="flex items-center space-x-3 sm:space-x-4 2xl:space-x-5">
        <Avatar className="h-10 w-10 sm:h-12 md:h-14 2xl:h-16 3xl:h-20 border-2 2xl:border-[3px] border-primary">
          <AvatarImage 
            src={testimonial.avatarUrl} 
            alt={testimonial.name} 
            data-ai-hint={testimonial.dataAiHint || "user avatar"}
          />
          <AvatarFallback className="text-sm sm:text-base md:text-lg 2xl:text-xl 3xl:text-2xl">
            {testimonial.name?.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-sm sm:text-base md:text-lg 2xl:text-xl 3xl:text-2xl text-foreground">{testimonial.name}</p>
          <div className="flex items-center mt-0.5 sm:mt-1">
            {Array(testimonial.rating).fill(0).map((_, i) => (
              <Star key={`filled-${i}`} className="h-4 w-4 sm:h-4 md:h-5 2xl:h-6 text-yellow-400 fill-yellow-400" />
            ))}
            {Array(5 - testimonial.rating).fill(0).map((_, i) => (
              <Star key={`empty-${i}`} className="h-4 w-4 sm:h-4 md:h-5 2xl:h-6 text-muted-foreground/50" />
            ))}
          </div>
        </div>
      </div>
      <p className="text-xs sm:text-xs md:text-sm 2xl:text-sm 3xl:text-base text-muted-foreground pt-0.5 sm:pt-1 2xl:pt-1.5">
        {testimonial.date} on <span className="font-medium text-primary">{testimonial.source}</span>
      </p>
      <h3 className="text-base sm:text-lg md:text-xl 2xl:text-2xl 3xl:text-3xl font-bold text-foreground pt-1 sm:pt-2 2xl:pt-3">{testimonial.title}</h3>
      <p className="text-xs sm:text-sm md:text-base 2xl:text-base 3xl:text-lg text-muted-foreground leading-relaxed line-clamp-3 sm:line-clamp-4">{testimonial.text}</p>
    </Card>
  );
};
export default TestimonialCard;
