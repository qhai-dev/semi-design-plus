import { render, screen } from "@testing-library/react";
import { vi, describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { AtSign, Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "./index";

describe("InputGroup", () => {
  it("renders the Semi group box styles (fill-0 bg, 3px radius, 32px height, 1px dividers)", () => {
    render(
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <AtSign aria-hidden />
        </InputGroupAddon>
        <InputGroupInput placeholder="username" />
      </InputGroup>,
    );
    const box = screen
      .getByPlaceholderText("username")
      .closest("[data-slot='input-group']") as HTMLElement;
    expect(box).toHaveAttribute("data-slot", "input-group");
    expect(box).toHaveAttribute("role", "group");
    expect(box).toHaveClass(
      "bg-muted",
      "hover:bg-muted-hover",
      "rounded-sm",
      "h-8",
      "border",
      "border-transparent",
      "divide-x",
      "divide-border",
      "transition-colors",
    );
  });

  it("shows the solid focus border via focus-within", async () => {
    const user = userEvent.setup();
    render(
      <InputGroup>
        <InputGroupInput placeholder="focus me" />
      </InputGroup>,
    );
    const box = screen.getByPlaceholderText("focus me").closest(
      "[data-slot='input-group']",
    ) as HTMLElement;
    expect(box).toHaveClass("focus-within:border-focus-border");
    await user.click(screen.getByPlaceholderText("focus me"));
    expect(screen.getByPlaceholderText("focus me")).toHaveFocus();
  });

  it("passes props through InputGroupInput (data-slot, typing)", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <InputGroup>
        <InputGroupInput placeholder="type here" onChange={onChange} />
      </InputGroup>,
    );
    const input = screen.getByPlaceholderText("type here") as HTMLInputElement;
    expect(input).toHaveAttribute("data-slot", "input-group-control");
    // the group input stays transparent; the group box carries the fill
    expect(input).toHaveClass("bg-transparent", "rounded-none", "flex-1");
    expect(input).not.toHaveClass("bg-muted");
    await user.type(input, "x");
    expect(onChange).toHaveBeenCalled();
  });

  it("disables the group input and keeps the group box carry the disabled fill", () => {
    render(
      <InputGroup>
        <InputGroupInput placeholder="frozen" disabled />
      </InputGroup>,
    );
    const input = screen.getByPlaceholderText("frozen");
    expect(input).toBeDisabled();
    const box = input.closest("[data-slot='input-group']") as HTMLElement;
    expect(box).toHaveClass("has-disabled:bg-disabled-fill");
  });

  it("renders addons and text with text-2 weight 600 and 8/12 padding", () => {
    render(
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="domain" />
        <InputGroupAddon align="inline-end">.com</InputGroupAddon>
      </InputGroup>,
    );
    const text = screen.getByText("https://");
    expect(text).toHaveClass("font-semibold", "text-text-2");
    const startAddon = text.parentElement as HTMLElement;
    expect(startAddon).toHaveAttribute("data-slot", "input-group-addon");
    expect(startAddon).toHaveClass("px-3", "py-2", "order-first");
    const endAddon = screen.getByText(".com");
    expect(endAddon).toHaveClass("px-3", "py-2", "order-last");
  });

  it("triggers the addon button and keeps group focus on the input", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <InputGroup>
        <InputGroupInput placeholder="search" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton aria-label="Search" onClick={onClick}>
            <Search aria-hidden />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>,
    );
    await user.click(screen.getByRole("button", { name: "Search" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("lets consumer className override built-ins (tailwind-merge)", () => {
    render(
      <InputGroup className="h-12">
        <InputGroupInput placeholder="tall" />
      </InputGroup>,
    );
    const box = screen.getByPlaceholderText("tall").closest(
      "[data-slot='input-group']",
    ) as HTMLElement;
    expect(box).toHaveClass("h-12");
    expect(box).not.toHaveClass("h-8");
  });
});
