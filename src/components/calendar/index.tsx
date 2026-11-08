"use client";

import * as React from "react";
import {
  DayPicker,
  getDefaultClassNames,
  useDayPicker,
  type DayButton,
  type Locale,
} from "react-day-picker";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "../../lib/cn";

/**
 * react-day-picker v9 API rendered with the Semi Design calendar panel spec
 * (datePicker/datePicker.scss + variables.scss), matched against the rendered
 * panel on semi.design:
 * - panel: bg-3 surface, 6px radius, elevated shadow, 8px padding; a single
 *   month grid is 7 × 36px columns (252px, `$width-datepicker_month`)
 * - nav header: a 32px row with FOUR chevron buttons — « jump-year, ‹ previous
 *   month, month title (16px/600 text-0, centered), › next month, » jump-year
 * - weekday row: 12px/600 text-2 cells of 36px with a 1px bottom border
 * - day cell: 36px outer cell with a 32px INNER box of 3px radius
 *   (`$width-datepicker_day_main-borderRadius` = radius-small) — NOT a circle
 * - day states: hover fill-0 / active fill-1, selected = solid primary with
 *   white text, today = primary semibold text on the near-invisible fill-0
 *   background, range middle stretches the box to the full 36px with 0 radius
 * - days from adjacent months are hidden by default (Semi behavior)
 */

const navButtonClassNames =
  "inline-flex size-8 cursor-pointer select-none items-center justify-center rounded-sm p-0 text-text-2 outline-none transition-colors duration-100 hover:bg-muted active:bg-muted-hover focus-visible:outline-2 focus-visible:outline-primary-light-active disabled:cursor-not-allowed disabled:text-disabled-foreground [&_svg]:size-4 [&_svg]:shrink-0";

function CalendarRoot({
  className,
  rootRef,
  ...props
}: React.ComponentProps<"div"> & { rootRef?: React.Ref<HTMLDivElement> }) {
  return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />;
}

function CalendarChevron({
  className,
  orientation,
  ...props
}: React.ComponentProps<"svg"> & { orientation?: "left" | "right" | "down" | "up" | undefined }) {
  if (orientation === "left") {
    return <ChevronLeft aria-hidden className={cn("size-4", className)} {...props} />;
  }
  if (orientation === "right") {
    return <ChevronRight aria-hidden className={cn("size-4", className)} {...props} />;
  }
  return <ChevronDown aria-hidden className={cn("size-4", className)} {...props} />;
}

/** Semi-style nav: « ‹ (title) › » with jump-year buttons on the outside. */
function CalendarNav({
  onPreviousClick,
  onNextClick,
  ...props
}: React.ComponentProps<"nav"> & {
  onPreviousClick?: React.MouseEventHandler<HTMLButtonElement>;
  onNextClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const { goToMonth, months } = useDayPicker();
  const currentMonth = months[0]?.date;
  const jump = (years: number) => {
    if (!currentMonth) return;
    const target = new Date(currentMonth);
    target.setFullYear(target.getFullYear() + years);
    goToMonth(target);
  };

  return (
    <nav
      data-slot="calendar-nav"
      aria-label="Calendar navigation"
      className={cn(
        "absolute inset-x-0 top-0 flex h-12 w-full items-center justify-between px-1",
        props.className,
      )}
    >
      <div className="flex items-center">
        <button
          type="button"
          aria-label="Previous year"
          data-slot="calendar-nav-previous-year"
          onClick={() => jump(-1)}
          className={navButtonClassNames}
        >
          <ChevronsLeft aria-hidden />
        </button>
        <button
          type="button"
          aria-label="Previous month"
          data-slot="calendar-nav-previous-month"
          onClick={onPreviousClick}
          className={navButtonClassNames}
        >
          <ChevronLeft aria-hidden />
        </button>
      </div>
      <div className="flex items-center">
        <button
          type="button"
          aria-label="Next month"
          data-slot="calendar-nav-next-month"
          onClick={onNextClick}
          className={navButtonClassNames}
        >
          <ChevronRight aria-hidden />
        </button>
        <button
          type="button"
          aria-label="Next year"
          data-slot="calendar-nav-next-year"
          onClick={() => jump(1)}
          className={navButtonClassNames}
        >
          <ChevronsRight aria-hidden />
        </button>
      </div>
    </nav>
  );
}

function CalendarWeekNumber({ children, ...props }: React.ComponentProps<"td">) {
  return (
    <td {...props}>
      <div className="flex size-9 items-center justify-center text-center">{children}</div>
    </td>
  );
}

function Calendar({
  className,
  classNames,
  showOutsideDays = false,
  captionLayout = "label",
  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const defaultClassNames = getDefaultClassNames();

  // stable identity across renders so day buttons are not remounted
  const DayButtonComponent = React.useMemo(
    () =>
      function CalendarDayButtonWrapper(dayButtonProps: React.ComponentProps<typeof DayButton>) {
        return <CalendarDayButton locale={locale} {...dayButtonProps} />;
      },
    [locale],
  );

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "[--cell-size:2.25rem] group/calendar w-fit rounded-xl bg-popover p-2 text-popover-foreground shadow-elevated",
        className,
      )}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn("relative flex flex-col gap-4", defaultClassNames.months),
        month: cn("flex w-full flex-col pt-12", defaultClassNames.month),
        nav: cn(defaultClassNames.nav),
        button_previous: cn("hidden", defaultClassNames.button_previous),
        button_next: cn("hidden", defaultClassNames.button_next),
        month_caption: cn(
          "absolute inset-x-0 top-0 flex h-12 w-full items-center justify-center px-12",
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          "flex h-8 w-full items-center justify-center gap-1.5 text-base font-semibold",
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          "relative rounded-sm border border-border",
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn("absolute inset-0 bg-popover opacity-0", defaultClassNames.dropdown),
        caption_label: cn(
          "flex h-8 items-center gap-1 text-base leading-[22px] font-semibold text-foreground select-none",
          defaultClassNames.caption_label,
        ),
        month_grid: cn("border-collapse", defaultClassNames.month_grid),
        weekdays: cn("flex border-b border-border", defaultClassNames.weekdays),
        weekday: cn(
          "flex size-9 items-center justify-center text-xs font-semibold text-text-2 select-none",
          defaultClassNames.weekday,
        ),
        week: cn("flex w-full", defaultClassNames.week),
        week_number_header: cn("w-9 select-none", defaultClassNames.week_number_header),
        week_number: cn(
          "flex size-9 items-center justify-center text-xs text-text-2 select-none",
          defaultClassNames.week_number,
        ),
        day: cn(
          "relative size-9 p-0 text-center text-sm align-middle select-none",
          defaultClassNames.day,
        ),
        range_start: cn("bg-primary-light", defaultClassNames.range_start),
        range_middle: cn("bg-primary-light", defaultClassNames.range_middle),
        range_end: cn("bg-primary-light", defaultClassNames.range_end),
        outside: cn("invisible", defaultClassNames.outside),
        disabled: cn("text-disabled-foreground", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: CalendarRoot,
        Chevron: CalendarChevron,
        Nav: CalendarNav,
        DayButton: DayButtonComponent,
        WeekNumber: CalendarWeekNumber,
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  const selected = Boolean(modifiers.selected);
  const rangeEdge = Boolean(modifiers.range_start || modifiers.range_end);

  return (
    <button
      ref={ref}
      type="button"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle
          ? "true"
          : undefined
      }
      data-range-start={modifiers.range_start ? "true" : undefined}
      data-range-end={modifiers.range_end ? "true" : undefined}
      data-range-middle={modifiers.range_middle ? "true" : undefined}
      className={cn(
        // 32px inner box, 3px radius, centered in the 36px cell
        "relative isolate z-10 mx-auto flex size-8 items-center justify-center rounded-sm text-sm leading-5 outline-none transition-colors duration-100",
        "hover:bg-muted active:bg-muted-hover",
        "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-light-active",
        "disabled:cursor-not-allowed disabled:bg-disabled-fill disabled:text-disabled-foreground disabled:hover:bg-disabled-fill",
        // today: primary semibold text on the near-invisible fill-0 background
        !selected && modifiers.today && "bg-muted font-semibold text-primary hover:bg-muted",
        // range middle: stretch to the full 36px cell with no radius
        modifiers.range_middle &&
          "w-9 rounded-none bg-transparent text-foreground hover:bg-transparent",
        // selected endpoints / single: solid primary, keep radius at edges
        selected &&
          !modifiers.range_middle &&
          (rangeEdge || modifiers.range_start || modifiers.range_end
            ? "w-9 rounded-sm bg-primary font-semibold text-primary-foreground hover:bg-primary"
            : "bg-primary font-semibold text-primary-foreground hover:bg-primary"),
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
