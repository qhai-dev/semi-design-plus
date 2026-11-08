import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "../button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./index";

describe("Card", () => {
  it("renders with Semi card styles (6px radius, border, no shadow)", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Body</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );
    const card = screen.getByText("Card title").closest("[data-slot='card']");
    expect(card).toHaveClass("rounded-xl", "border-border", "bg-card");
    expect(card).not.toHaveClass("shadow-elevated");
    expect(screen.getByText("Card title")).toHaveClass("text-base", "font-semibold");
    expect(screen.getByText("Description")).toHaveClass("text-muted-foreground");
    expect(screen.getByText("Body")).toHaveClass("text-text-1");
  });

  it("renders small size with tighter spacing", () => {
    render(
      <Card size="sm">
        <CardContent>Compact</CardContent>
      </Card>,
    );
    const card = screen.getByText("Compact").closest("[data-slot='card']");
    expect(card).toHaveAttribute("data-size", "sm");
    expect(card).toHaveClass("data-[size=sm]:[--card-spacing:--spacing(4)]");
  });

  it("positions card action in the header grid", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Titled</CardTitle>
          <CardAction>
            <Button size="sm">Edit</Button>
          </CardAction>
        </CardHeader>
      </Card>,
    );
    const action = screen.getByText("Edit").closest("[data-slot='card-action']");
    expect(action).toHaveClass("col-start-2");
  });
});
