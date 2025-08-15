import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectToneType = {
  setTone: (value: string) => void;
};

export function SelectTone({ setTone }: SelectToneType) {
  return (
    <div className="w-full my-3">
      <Select onValueChange={setTone}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a tone" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Tones</SelectLabel>
            <SelectItem value="none">none</SelectItem>
            <SelectItem value="professional">professional</SelectItem>
            <SelectItem value="casual">casual</SelectItem>
            <SelectItem value="friendly">friendly</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
