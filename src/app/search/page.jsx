
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";

export default function SearchPage() {
  return (
    <div className="container mx-auto px-8 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Search CricNow</h1>
      <div className="max-w-xl mx-auto bg-card p-8 rounded-lg shadow-lg">
        <div className="flex w-full items-center space-x-2">
          <Input type="text" placeholder="Search for matches, players, teams..." className="text-base" />
          <Button type="submit" size="lg">
            <SearchIcon className="h-5 w-5 mr-2" />
            Search
          </Button>
        </div>
        <div className="mt-6 text-center text-muted-foreground">
          <p>Enter your search query above to find what you're looking for.</p>
        </div>
      </div>
    </div>
  );
}

