import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Inbox } from "lucide-react";
import { Button } from "../button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./index";

describe("Empty", () => {
  it("renders centered with Semi typography", () => {
    render(
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No data</EmptyTitle>
          <EmptyDescription>Nothing to show here.</EmptyDescription>
        </EmptyHeader>
      </Empty>,
    );
    const empty = screen.getByText("No data").closest("[data-slot='empty']");
    expect(empty).toHaveClass("flex-col", "items-center", "justify-center");
    expect(screen.getByText("No data")).toHaveClass("font-semibold", "text-foreground");
    expect(screen.getByText("Nothing to show here.")).toHaveClass("text-text-1");
  });

  it("renders an icon media variant", () => {
    render(
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Inbox aria-hidden />
          </EmptyMedia>
          <EmptyTitle>Inbox zero</EmptyTitle>
        </EmptyHeader>
      </Empty>,
    );
    const media = screen.getByText("Inbox zero").closest("[data-slot='empty']")
      ?.querySelector("[data-slot='empty-icon']");
    expect(media).toHaveClass("bg-muted", "rounded-lg");
  });

  it("renders footer actions", () => {
    render(
      <Empty>
        <EmptyHeader>
          <EmptyTitle>Create your first project</EmptyTitle>
        </EmptyHeader>
        <EmptyContent>
          <Button>New project</Button>
        </EmptyContent>
      </Empty>,
    );
    const content = screen.getByRole("button", { name: "New project" }).closest(
      "[data-slot='empty-content']",
    );
    expect(content).toBeInTheDocument();
  });
});
