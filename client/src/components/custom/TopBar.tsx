import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Search, SlidersHorizontal } from "lucide-react";

type Props = {
  onSearch?: (value: string) => void;
  onFilterClick?: () => void;
};

export default function TopBar({ onSearch, onFilterClick }: Props) {
  return (
    <div className="flex items-center gap-4 p-3 bg-transparent">
      {/* Left: Search */}
      <div className="flex items-center gap-2 border rounded-none px-3 py-1 bg-muted">
        <Search size={16} className="text-muted-foreground" />
        <Input
          placeholder="Search board"
          className="border-none focus-visible:ring-0 shadow-none"
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <Avatar className="h-8 w-8">
          <AvatarFallback>SR</AvatarFallback>
        </Avatar>

        {/* Filter Button */}
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={onFilterClick}
        >
          <SlidersHorizontal size={16} />
          Filter
        </Button>
      </div>
    </div>
  );
}
