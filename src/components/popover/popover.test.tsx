import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { Button } from "../button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "./index";

describe("Popover", () => {
  it("renders trigger and stays closed", () => {
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>
          <PopoverTitle>Title</PopoverTitle>
        </PopoverContent>
      </Popover>,
    );
    expect(screen.getByRole("button", { name: "Open" })).toHaveAttribute(
      "data-slot",
      "popover-trigger",
    );
    expect(screen.queryByText("Title")).not.toBeInTheDocument();
  });

  it("opens with Semi popover styles", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger render={<Button>Open</Button>} />
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Semi title</PopoverTitle>
            <PopoverDescription>Semi description</PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>,
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    const title = await screen.findByText("Semi title");
    const popup = title.closest("[data-slot='popover-content']");
    expect(popup).toHaveClass(
      "bg-popover",
      "rounded-xl",
      "border-border",
      "shadow-elevated",
      "p-3",
    );
    expect(title).toHaveClass("font-semibold", "border-b");
    expect(await screen.findByText("Semi description")).toHaveClass("text-text-2");
  });

  it("omits the arrow when requested", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger render={<Button>Open</Button>} />
        <PopoverContent showArrow={false}>
          <PopoverTitle>No arrow</PopoverTitle>
        </PopoverContent>
      </Popover>,
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    await screen.findByText("No arrow");
    expect(document.querySelector("[data-slot='popover-content'] svg")).toBeNull();
  });

  it("supports a custom side", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger render={<Button>Open</Button>} />
        <PopoverContent side="right">
          <PopoverTitle>Right side</PopoverTitle>
        </PopoverContent>
      </Popover>,
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(await screen.findByText("Right side")).toBeInTheDocument();
  });
});
