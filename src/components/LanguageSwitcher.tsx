"use client";
import { useRouter, useParams } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function LanguageSwitcher() {
  const router = useRouter();
  const params = useParams();
  const currLang = params.lang || "en";

  const handleChange = (value: string) => {
    router.push(value === "en" ? "/" : `/${value}`);
  };

  return (
    <div className="flex items-center gap-2">
      <Select value={currLang as string} onValueChange={handleChange}>
        <SelectTrigger className="px-2 py-1 rounded text-gray-700">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">EN</SelectItem>
          <SelectItem value="zh">中文</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
