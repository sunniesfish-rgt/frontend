import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchForm() {
  return (
    <form className="flex space-x-2 mb-6">
      <Input type="text" placeholder="Search by title" className="flex-grow" />
      <Input type="text" placeholder="Search by author" className="flex-grow" />
      <Button type="submit">Search</Button>
    </form>
  );
}
