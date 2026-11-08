import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "./index";

describe("Avatar", () => {
  it("renders fallback initials with Semi circle styles", () => {
    render(
      <Avatar>
        <AvatarFallback>SD</AvatarFallback>
      </Avatar>,
    );
    const avatar = screen.getByText("SD").closest("[data-slot='avatar']");
    expect(avatar).toHaveClass("size-10", "rounded-full");
  });

  it("supports Semi sizes", () => {
    render(
      <>
        <Avatar size="sm">
          <AvatarFallback>S</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>L</AvatarFallback>
        </Avatar>
      </>,
    );
    expect(screen.getByText("S").closest("[data-slot='avatar']")).toHaveClass(
      "data-[size=sm]:size-8",
    );
    expect(screen.getByText("L").closest("[data-slot='avatar']")).toHaveClass(
      "data-[size=lg]:size-12",
    );
  });

  it("shows the fallback when no image loads (jsdom)", () => {
    render(
      <Avatar>
        <AvatarImage src="avatar.png" alt="User" />
        <AvatarFallback>FB</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByText("FB")).toBeInTheDocument();
  });

  it("groups avatars with -12px overlap and a count avatar", () => {
    render(
      <AvatarGroup>
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+5</AvatarGroupCount>
      </AvatarGroup>,
    );
    const group = screen.getByText("A").closest("[data-slot='avatar-group']");
    expect(group).toHaveClass("-space-x-3");
    const count = screen.getByText("+5");
    expect(count).toHaveAttribute("data-slot", "avatar-group-count");
    expect(count).toHaveClass("bg-tertiary", "rounded-full");
  });
});
