import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/cn";

/**
 * Semi Design collapse spec: header rows (text-0, regular weight) with
 * fill-0 hover / fill-1 active, 1px dividers between items, a text-2 chevron
 * on the right, and text-1 content.
 */
function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("not-last:border-b not-last:border-border", className)}
      {...props}
    />
  );
}

function AccordionTrigger({ className, children, ...props }: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative mx-2 my-1 flex flex-1 items-center justify-between rounded-sm px-2 py-2 text-left text-sm font-normal text-foreground outline-none transition-colors duration-100",
          "hover:bg-muted active:bg-muted-hover focus-visible:outline-2 focus-visible:outline-primary-light-active",
          "aria-disabled:text-disabled-foreground aria-disabled:cursor-not-allowed aria-disabled:hover:bg-transparent",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown
          aria-hidden
          data-slot="accordion-trigger-icon"
          className="pointer-events-none ml-2 size-4 shrink-0 text-text-2 transition-transform duration-100 group-aria-expanded/accordion-trigger:rotate-180"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({ className, children, ...props }: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "mx-2 mb-2 mt-1 px-2 text-text-1 h-(--accordion-panel-height) data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-primary [&_p:not(:last-child)]:mb-4",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
