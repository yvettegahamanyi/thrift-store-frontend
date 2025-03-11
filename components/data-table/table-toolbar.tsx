
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterOption {
  value: string;
  label: string;
}

interface TableToolbarProps {
  filterOptions?: FilterOption[];
  onFilterChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onDownload?: () => void;
  placeholderText?: string;
}

export function TableToolbar({
  filterOptions = [],
  onFilterChange,
  onSearch,
  onDownload,
  placeholderText = "Search..."
}: TableToolbarProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (onSearch) onSearch(searchValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="mb-4 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={placeholderText}
            className="pl-8"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <Button variant="outline" size="sm" onClick={handleSearch}>
          Search
        </Button>
        {filterOptions.length > 0 && onFilterChange && (
          <div className="hidden sm:flex">
            <Select onValueChange={onFilterChange} defaultValue={filterOptions[0].value}>
              <SelectTrigger className="h-8 w-fit gap-1">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      {onDownload && (
        <Button variant="outline" size="sm" onClick={onDownload}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      )}
    </div>
  );
}
