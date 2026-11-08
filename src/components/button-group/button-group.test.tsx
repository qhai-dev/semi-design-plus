import { render, screen } from "@testing-library/react";
import { vi, describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { Button } from "../button";
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "./index";

describe("ButtonGroup", () => {
  it("renders a group with members keeping their own clicks", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <ButtonGroup>
        <Button onClick={onClick}>One</Button>
        <Button>Two</Button>
      </ButtonGroup>,
    );
    const group = screen.getByRole("group");
    expect(group).toHaveAttribute("data-slot", "button-group");
    expect(group).toHaveAttribute("data-orientation", "horizontal");
    await user.click(screen.getByRole("button", { name: "One" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("strips member radii and keeps only the outer corners rounded", () => {
    render(
      <ButtonGroup>
        <Button>First</Button>
        <Button>Middle</Button>
        <Button>Last</Button>
      </ButtonGroup>,
    );
    const group = screen.getByRole("group");
    expect(group).toHaveClass("[&>*]:rounded-none");
    expect(group).toHaveClass("[&>*:first-child]:rounded-l-sm");
    expect(group).toHaveClass("[&>*:last-child]:rounded-r-sm");
    // each member loses the 3px button radius from the group's child selector
    expect(screen.getByText("Middle")).toHaveClass("rounded-sm");
  });

  it("joins members with a 1px border-colored separator and merged outline edges", () => {
    render(
      <ButtonGroup>
        <Button>One</Button>
        <Button variant="outline">Two</Button>
      </ButtonGroup>,
    );
    const group = screen.getByRole("group");
    // 1px separator line in --semi-color-border on every following member
    expect(group).toHaveClass(
      "[&>*+*:not([data-slot=button-group-separator]):not([data-slot=button-group-separator]+*)]:border-l",
      "[&>*+*:not([data-slot=button-group-separator]):not([data-slot=button-group-separator]+*)]:border-border",
    );
    // outline members merge adjacent borders via the -1px margin (Semi margin-right: -1px)
    expect(group).toHaveClass(
      "[&>*+*:not([data-slot=button-group-separator]):not([data-slot=button-group-separator]+*)]:-ml-px",
    );
  });

  it("renders the vertical orientation with top/bottom radii", () => {
    render(
      <ButtonGroup orientation="vertical">
        <Button>Top</Button>
        <Button>Bottom</Button>
      </ButtonGroup>,
    );
    const group = screen.getByRole("group");
    expect(group).toHaveAttribute("data-orientation", "vertical");
    expect(group).toHaveClass("flex-col");
    expect(group).toHaveClass("[&>*:first-child]:rounded-t-sm");
    expect(group).toHaveClass("[&>*:last-child]:rounded-b-sm");
    expect(group).toHaveClass(
      "[&>*+*:not([data-slot=button-group-separator]):not([data-slot=button-group-separator]+*)]:border-t",
    );
  });

  it("renders an explicit 1px separator and the text addon", () => {
    render(
      <ButtonGroup>
        <ButtonGroupText>Label</ButtonGroupText>
        <ButtonGroupSeparator />
        <Button>Action</Button>
      </ButtonGroup>,
    );
    expect(screen.getByText("Label")).toHaveClass("bg-muted", "text-foreground");
    const separator = document.querySelector("[data-slot='button-group-separator']");
    expect(separator).toHaveAttribute("role", "separator");
    expect(separator).toHaveClass("bg-border");
  });

  it("lets consumer className override built-ins", () => {
    render(
      <ButtonGroup className="w-full">
        <Button>One</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole("group")).toHaveClass("w-full");
    expect(screen.getByRole("group")).not.toHaveClass("w-fit");
  });
});
