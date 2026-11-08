import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
  CommandSeparator,
} from "./index";

const meta = {
  title: "Components/Command",
};

export default meta;

export const Default = {
  render: () => (
    <Command>
      <CommandInput placeholder="Search" aria-label="Search" />
      <CommandList>
        <CommandGroup heading="Suggestions">
          <CommandItem>Item 1</CommandItem>
        </CommandGroup>
        <CommandSeparator />
      </CommandList>
    </Command>
  ),
};
