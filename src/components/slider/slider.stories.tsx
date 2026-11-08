import { Slider } from "./index";

const meta = {
  title: "Components/Slider",
};

export default meta;

export const Default = {
  render: () => <Slider defaultValue={[30]} aria-label="slider" />,
};
