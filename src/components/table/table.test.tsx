import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./index";

describe("Table", () => {
  it("renders a table with Semi header styles", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Semi</TableCell>
          </TableRow>
        </TableBody>
        <TableCaption>Caption</TableCaption>
      </Table>,
    );
    expect(screen.getByRole("table")).toHaveAttribute("data-slot", "table");
    const head = screen.getByText("Name");
    expect(head).toHaveClass("font-normal", "text-text-2", "h-9", "px-4");
    expect(screen.getByText("Semi")).toHaveClass("px-4", "py-3");
    const header = document.querySelector("[data-slot='table-header']");
    expect(header).toHaveClass("bg-1");
  });

  it("styles rows with dividers and hover fill", () => {
    render(
      <Table>
        <TableBody>
          <TableRow data-testid="row">
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    const row = screen.getByTestId("row");
    expect(row).toHaveClass("border-b", "border-border", "hover:bg-muted");
  });

  it("marks selected rows with primary-light background", () => {
    render(
      <Table>
        <TableBody>
          <TableRow data-state="selected" data-testid="selected-row">
            <TableCell>Picked</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(screen.getByTestId("selected-row")).toHaveClass(
      "data-[state=selected]:bg-primary-light",
    );
  });

  it("renders footer and caption", () => {
    render(
      <Table>
        <TableFooter>
          <TableRow>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableFooter>
        <TableCaption>3 items</TableCaption>
      </Table>,
    );
    expect(document.querySelector("[data-slot='table-footer']")).toHaveClass(
      "bg-1",
      "border-t",
    );
    expect(screen.getByText("3 items")).toHaveClass("text-text-2");
  });
});
