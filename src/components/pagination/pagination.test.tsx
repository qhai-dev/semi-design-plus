import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./index";

describe("Pagination", () => {
  it("renders pages with Semi item styles", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );
    expect(screen.getByRole("navigation")).toHaveAttribute("aria-label", "pagination");
    const plain = screen.getByText("1");
    expect(plain).toHaveClass("h-8", "rounded-sm", "hover:bg-muted");
    const active = screen.getByText("2");
    expect(active).toHaveClass(
      "data-active:bg-primary-light",
      "data-active:text-primary",
      "data-active:font-semibold",
    );
    expect(active).toHaveAttribute("aria-current", "page");
  });

  it("renders previous/next with icons and labels", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );
    expect(screen.getByLabelText("Go to previous page")).toHaveTextContent("Previous");
    expect(screen.getByLabelText("Go to next page")).toHaveTextContent("Next");
    expect(document.querySelectorAll("[data-slot='pagination-link'] svg").length).toBe(2);
  });

  it("renders the ellipsis", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );
    expect(screen.getByText("More pages")).toBeInTheDocument();
  });
});
