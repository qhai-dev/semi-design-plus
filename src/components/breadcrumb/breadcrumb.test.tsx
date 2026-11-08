import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./index";

describe("Breadcrumb", () => {
  it("renders items with Semi text colors", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Current</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );
    expect(screen.getByRole("navigation")).toHaveAttribute("data-slot", "breadcrumb");
    expect(screen.getByText("Home")).toHaveClass("hover:text-primary");
    const page = screen.getByText("Current");
    expect(page).toHaveClass("text-foreground");
    expect(screen.getByText("Current")).not.toHaveClass("font-semibold");
    expect(
      document.querySelector("[data-slot='breadcrumb-separator']"),
    ).toHaveClass("text-text-2");
  });

  it("marks the current page with aria-current", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Here</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );
    expect(screen.getByText("Here")).toHaveAttribute("aria-current", "page");
  });

  it("renders the ellipsis block", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );
    expect(screen.getByText("More")).toBeInTheDocument();
  });
});
