import { DirectionProvider } from "./index";

const meta = {
  title: "Components/Direction",
};

export default meta;

export const Default = {
  render: () => (
    <DirectionProvider direction="ltr">
      <div>dir</div>
    </DirectionProvider>
  ),
};
