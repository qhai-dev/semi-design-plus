import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireChoiceDescription,
  QuestionnaireDescription,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "./index";

const meta = {
  title: "Components/Questionnaire",
  component: Questionnaire,
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="w-100">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Questionnaire>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Questionnaire>
      <QuestionnaireItem name="q">
        <QuestionnaireInput placeholder="Answer" />
        <QuestionnaireSubmit>Submit</QuestionnaireSubmit>
      </QuestionnaireItem>
    </Questionnaire>
  ),
};

export const WithChoices: Story = {
  render: () => (
    <Questionnaire>
      <QuestionnaireProgress>1 of 2</QuestionnaireProgress>
      <QuestionnaireItem name="plan">
        <QuestionnaireTitle>Which plan are you on?</QuestionnaireTitle>
        <QuestionnaireDescription>Used to tailor setup steps.</QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="free">
            Free
            <QuestionnaireChoiceDescription>Up to 3 projects</QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="pro" defaultChecked>
            Pro
            <QuestionnaireChoiceDescription>Unlimited projects</QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireInput placeholder="Anything else?" />
        <QuestionnaireActions>
          <QuestionnairePrevious />
          <QuestionnaireNext>Next</QuestionnaireNext>
        </QuestionnaireActions>
      </QuestionnaireItem>
    </Questionnaire>
  ),
};
