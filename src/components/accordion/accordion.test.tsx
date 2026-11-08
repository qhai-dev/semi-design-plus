import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./index";

describe("Accordion", () => {
  it("renders with Semi divider and header styles", () => {
    render(
      <Accordion defaultValue={["a"]}>
        <AccordionItem value="a">
          <AccordionTrigger>Trigger</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    const trigger = screen.getByText("Trigger");
    expect(trigger).toHaveAttribute("data-slot", "accordion-trigger");
    expect(trigger).toHaveClass("font-normal", "text-foreground", "hover:bg-muted");
    const item = trigger.closest("[data-slot='accordion-item']");
    expect(item).toHaveClass("not-last:border-b", "not-last:border-border");
  });

  it("shows default open content and toggles on click", async () => {
    const user = userEvent.setup();
    render(
      <Accordion defaultValue={["a"]}>
        <AccordionItem value="a">
          <AccordionTrigger>Section</AccordionTrigger>
          <AccordionContent>Revealed</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>Other</AccordionTrigger>
          <AccordionContent>Hidden</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    expect(screen.getByText("Revealed")).toBeInTheDocument();
    await user.click(screen.getByText("Other"));
    expect(screen.getByText("Hidden")).toBeInTheDocument();
  });

  it("rotates the chevron when expanded", () => {
    render(
      <Accordion defaultValue={["a"]}>
        <AccordionItem value="a">
          <AccordionTrigger>Expanded</AccordionTrigger>
          <AccordionContent>Body</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    const icon = document.querySelector("[data-slot='accordion-trigger-icon']");
    expect(icon).toHaveClass("group-aria-expanded/accordion-trigger:rotate-180");
  });

  it("renders disabled triggers with disabled text", () => {
    render(
      <Accordion>
        <AccordionItem value="a">
          <AccordionTrigger disabled>Locked</AccordionTrigger>
        </AccordionItem>
      </Accordion>,
    );
    expect(screen.getByText("Locked")).toHaveClass("aria-disabled:text-disabled-foreground");
  });
});
