import { ButtonGroup } from "./index";
import { Button } from "../button";

const meta = { title: "Components/ButtonGroup" };
export default meta;

export const Default = {
  render: () => (
    <ButtonGroup>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  ),
};
