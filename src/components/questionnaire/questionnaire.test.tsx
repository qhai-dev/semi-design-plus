import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Questionnaire,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "./index";

describe("Questionnaire", () => {
  it("renders the questionnaire structure with data-slots", () => {
    render(
      <Questionnaire>
        <QuestionnaireProgress>1 of 2</QuestionnaireProgress>
        <QuestionnaireItem name="q1">
          <QuestionnaireTitle>Pick one</QuestionnaireTitle>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="a">Alpha</QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireInput placeholder="Answer" />
          <QuestionnaireSubmit>Submit</QuestionnaireSubmit>
        </QuestionnaireItem>
      </Questionnaire>,
    );
    expect(screen.getByText("1 of 2")).toHaveAttribute("data-slot", "questionnaire-progress");
    expect(screen.getByText("Pick one")).toHaveAttribute("data-slot", "questionnaire-title");
    const choice = screen.getByText("Alpha").closest("[data-slot='questionnaire-choice']");
    expect(choice).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Answer")).toHaveAttribute(
      "data-slot",
      "questionnaire-input",
    );
    expect(screen.getByText("Submit")).toHaveAttribute("data-slot", "questionnaire-submit");
  });

  it("styles choices per Semi (6px radius, border, fill hover, primary-light checked)", () => {
    render(
      <Questionnaire>
        <QuestionnaireItem name="q1">
          <QuestionnaireChoices>
            <QuestionnaireChoice value="a" defaultChecked>
              Alpha
              <QuestionnaireChoiceDescription>First option</QuestionnaireChoiceDescription>
            </QuestionnaireChoice>
            <QuestionnaireChoice value="b">Beta</QuestionnaireChoice>
          </QuestionnaireChoices>
        </QuestionnaireItem>
      </Questionnaire>,
    );
    const checked = screen.getByText("Alpha").closest("[data-slot='questionnaire-choice']")!;
    expect(checked).toHaveClass("rounded-xl", "border", "border-border", "bg-transparent");
    expect(checked).toHaveClass("hover:bg-muted", "transition-colors", "duration-100");
    expect(checked).toHaveClass("data-checked:border-primary", "data-checked:bg-primary-light");
    const indicator = checked.querySelector("[data-slot='questionnaire-choice-indicator']");
    expect(indicator).toHaveClass("border-text-3");
    expect(indicator).toHaveClass("group-data-[type=radio]/questionnaire-choice:rounded-full");
    expect(indicator!.querySelector("svg")).toBeInTheDocument();
  });

  it("styles the free-text input with the Semi fill/focus spec", () => {
    render(
      <Questionnaire>
        <QuestionnaireItem name="q1">
          <QuestionnaireInput placeholder="Answer" />
        </QuestionnaireItem>
      </Questionnaire>,
    );
    const input = screen.getByPlaceholderText("Answer");
    expect(input).toHaveClass("bg-muted", "rounded-md", "focus-visible:border-primary");
    expect(input).toHaveClass("disabled:bg-disabled-fill", "disabled:cursor-not-allowed");
  });

  it("renders errors with the destructive token and Next with the solid button style", () => {
    render(
      <Questionnaire>
        <QuestionnaireItem name="q1">
          <QuestionnaireError>This field is required</QuestionnaireError>
          <QuestionnaireNext>Next</QuestionnaireNext>
        </QuestionnaireItem>
      </Questionnaire>,
    );
    expect(screen.getByText("This field is required")).toHaveClass("text-sm", "text-destructive");
    expect(screen.getByText("Next")).toHaveClass("bg-primary", "text-primary-foreground");
  });

  it("titles use the Semi 16px/600 scale", () => {
    render(
      <Questionnaire>
        <QuestionnaireItem name="q1">
          <QuestionnaireTitle>Question</QuestionnaireTitle>
        </QuestionnaireItem>
      </Questionnaire>,
    );
    expect(screen.getByText("Question")).toHaveClass("text-base", "font-semibold");
  });

  it("lets consumer className override built-ins", () => {
    render(<Questionnaire className="gap-6">Override</Questionnaire>);
    expect(screen.getByText("Override")).toHaveClass("gap-6");
  });
});
