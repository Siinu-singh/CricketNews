
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const TestimonialCard = ({ testimonial }) => {
  if (!testimonial) {
    return null; 
  }

  return (
    <Card className="w-[350px] min-w-[350px] shadow-lg flex-shrink-0 p-6 space-y-4 bg-card text-card-foreground rounded-xl border border-border/50">
      <div className="flex items-center space-x-4">
        <Avatar className="h-14 w-14 border-2 border-primary">
          <AvatarImage 
            src={testimonial.avatarUrl} 
            alt={testimonial.name} 
            data-ai-hint={testimonial.dataAiHint || "user avatar"}
          />
          <AvatarFallback className="text-lg">
            {testimonial.name?.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-lg text-foreground">{testimonial.name}</p>
          <div className="flex items-center mt-1">
            {Array(testimonial.rating).fill(0).map((_, i) => (
              <Star key={`filled-${i}`} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            ))}
            {Array(5 - testimonial.rating).fill(0).map((_, i) => (
              <Star key={`empty-${i}`} className="h-5 w-5 text-muted-foreground/50" />
            ))}
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground pt-1">
        {testimonial.date} on <span className="font-medium text-primary">{testimonial.source}</span>
      </p>
      <h3 className="text-xl font-bold text-foreground pt-2">{testimonial.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">{testimonial.text}</p>
    </Card>
  );
};
export default TestimonialCard;
