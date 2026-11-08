import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "./index";

describe("Field", () => {
  it("renders the vertical Semi Form.Field layout (label top, error bottom)", () => {
    render(
      <Field>
        <FieldLabel htmlFor="username">Username</FieldLabel>
        <input id="username" defaultValue="semi" />
        <FieldDescription>Used to sign in.</FieldDescription>
        <FieldError>Username is required.</FieldError>
      </Field>,
    );
    const field = screen.getByRole("group");
    expect(field).toHaveAttribute("data-slot", "field");
    expect(field).toHaveAttribute("data-orientation", "vertical");
    expect(field).toHaveClass("flex-col", "gap-1");
    const label = screen.getByText("Username");
    expect(label).toHaveClass("text-sm", "font-semibold", "text-foreground");
    expect(screen.getByText("Used to sign in.")).toHaveClass("text-sm", "text-text-2");
    const error = screen.getByRole("alert");
    expect(error).toHaveAttribute("data-slot", "field-error");
    expect(error).toHaveClass("text-sm", "text-destructive");
  });

  it("associates the label with its control via htmlFor", () => {
    render(
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <input id="email" />
      </Field>,
    );
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("id", "email");
    expect(screen.getByText("Email").getAttribute("for")).toBe("email");
  });

  it("renders multiple errors as a list", () => {
    render(
      <Field>
        <FieldError
          errors={[{ message: "At least 8 characters" }, { message: "One uppercase letter" }]}
        />
      </Field>,
    );
    const error = screen.getByRole("alert");
    expect(error).toHaveTextContent("At least 8 characters");
    expect(error.querySelectorAll("li")).toHaveLength(2);
  });

  it("renders nothing when there is no error content", () => {
    render(
      <Field>
        <FieldError errors={[]} />
      </Field>,
    );
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("renders the horizontal layout with label on the left", () => {
    render(
      <Field orientation="horizontal">
        <FieldLabel htmlFor="nickname">Nickname</FieldLabel>
        <input id="nickname" />
      </Field>,
    );
    const field = screen.getByRole("group");
    expect(field).toHaveAttribute("data-orientation", "horizontal");
    expect(field).toHaveClass("flex-row", "items-center");
    expect(field).toHaveClass("[&>[data-slot=field-label]]:mr-4");
  });

  it("renders a group, fieldset and legend structure", () => {
    render(
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Profile</FieldLegend>
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <input id="name" />
          </Field>
        </FieldSet>
      </FieldGroup>,
    );
    expect(document.querySelector("[data-slot='field-group']")).toHaveClass("gap-6");
    expect(document.querySelector("[data-slot='field-set']")).toHaveClass("flex-col");
    expect(screen.getByText("Profile")).toHaveClass("font-semibold");
  });

  it("lets consumer className override built-ins", () => {
    render(
      <Field className="gap-3">
        <FieldLabel htmlFor="a">A</FieldLabel>
        <input id="a" />
      </Field>,
    );
    expect(screen.getByRole("group")).toHaveClass("gap-3");
    expect(screen.getByRole("group")).not.toHaveClass("gap-1");
  });
});
