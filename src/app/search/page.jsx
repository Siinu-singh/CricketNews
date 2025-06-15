
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";

export const metadata = {
  title: 'Search CricketNews - Find Matches, Players, Teams & News',
  description: 'Use the CricketNews search to find information about cricket matches, players, teams, news articles, and more.',
  keywords: ['cricket search', 'find cricket info', 'search matches', 'search players', 'search teams', 'cricketnews'],
  openGraph: {
    title: 'Search CricketNews',
    description: 'Find all cricket information in one place on CricketNews.',
    url: 'https://yourdomain.com/search', 
  },
  twitter: {
    title: 'Search CricketNews - Your Cricket Search Engine',
    description: 'Quickly find cricket matches, players, and news on CricketNews.',
  },
  alternates: {
    canonical: 'https://yourdomain.com/search', 
  },
};

export default function SearchPage() {
  return (
    <div className="container py-6 sm:py-8 2xl:py-12">
      <h1 className="text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl 3xl:text-6xl font-bold mt-8 sm:mt-12 2xl:mt-16 mb-6 sm:mb-8 2xl:mb-12 text-center">Search CricketNews</h1>
      <div className="max-w-md sm:max-w-lg md:max-w-xl 2xl:max-w-2xl 3xl:max-w-3xl mx-auto bg-card p-4 sm:p-6 md:p-8 2xl:p-10 3xl:p-12 rounded-lg shadow-lg">
        <div className="flex flex-col sm:flex-row w-full items-center gap-2 sm:gap-3 2xl:gap-3">
          <Input type="text" placeholder="Search for matches, players, teams..." className="text-sm sm:text-base 2xl:text-lg 3xl:text-xl flex-grow h-10 sm:h-11 2xl:h-12 3xl:h-14" />
          <Button type="submit" className="w-full sm:w-auto text-sm sm:text-base 2xl:text-lg 3xl:text-xl h-10 sm:h-11 2xl:h-12 2xl:px-6 3xl:h-14 3xl:px-7">
            <SearchIcon className="h-4 w-4 sm:h-5 2xl:h-6 mr-2" />
            Search
          </Button>
        </div>
        <div className="mt-4 sm:mt-6 2xl:mt-8 text-center text-muted-foreground text-xs sm:text-sm md:text-base 2xl:text-lg 3xl:text-xl">
          <p>Enter your search query above to find what you're looking for.</p>
        </div>
      </div>
    </div>
  );
}
