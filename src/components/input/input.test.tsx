import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, expect, it } from "vitest";

import { Input } from "./index";

describe("Input", () => {
    it("renders a textbox with the input data-slot", () => {
        render(<Input placeholder="Type here" />);
        expect(screen.getByPlaceholderText("Type here")).toHaveAttribute(
            "data-slot",
            "input",
        );
    });

    it("accepts typing", async () => {
        const user = userEvent.setup();
        render(<Input placeholder="your name" />);
        const el = screen.getByPlaceholderText("your name") as HTMLInputElement;
        await user.type(el, "semi");
        expect(el).toHaveValue("semi");
    });

    it("applies the Semi fill-box styles with focus border", () => {
        render(<Input placeholder="a" />);
        const el = screen.getByPlaceholderText("a");
        expect(el).toHaveClass("bg-muted", "rounded-sm", "h-8");
    });

    it("supports Semi sizes", () => {
        render(
            <>
                <Input size="small" placeholder="s" />
                <Input size="large" placeholder="l" />
            </>,
        );
        expect(screen.getByPlaceholderText("s")).toHaveClass("h-6");
        expect(screen.getByPlaceholderText("l")).toHaveClass(
            "h-10",
            "text-base",
        );
    });

    it("renders error validation styles via validateStatus", () => {
        render(<Input validateStatus="error" placeholder="e" />);
        const el = screen.getByPlaceholderText("e");
        expect(el).toHaveClass("bg-destructive-light");
    });

    it("renders warning validation styles via validateStatus", () => {
        render(<Input validateStatus="warning" placeholder="w" />);
        expect(screen.getByPlaceholderText("w")).toHaveClass(
            "bg-warning-light",
        );
    });

    it("wraps with prefix/suffix inside an input-wrapper", () => {
        render(<Input prefix="¥" suffix="RMB" placeholder="p" />);
        const wrapper = screen.getByPlaceholderText("p").parentElement;
        expect(wrapper).toHaveAttribute("data-slot", "input-wrapper");
        expect(wrapper).toHaveTextContent("¥");
        expect(wrapper).toHaveTextContent("RMB");
    });

    it("clears the value via the clearable button", async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(<Input clearable defaultValue="text" onChange={onChange} />);
        const el = screen.getByDisplayValue("text") as HTMLInputElement;
        expect(el).toHaveValue("text");
        await user.click(screen.getByRole("button", { name: "Clear" }));
        expect(el).toHaveValue("");
        expect(onChange).toHaveBeenCalled();
    });

    it("toggles password visibility with passwordToggle", async () => {
        const user = userEvent.setup();
        render(<Input type="password" passwordToggle defaultValue="secret" />);
        const el = screen.getByDisplayValue("secret");
        expect(el).toHaveAttribute("type", "password");
        await user.click(screen.getByRole("button", { name: "Show password" }));
        expect(el).toHaveAttribute("type", "text");
        expect(
            screen.getByRole("button", { name: "Hide password" }),
        ).toBeInTheDocument();
    });

    it("keeps the not-allowed cursor when disabled", () => {
        render(<Input disabled placeholder="d" />);
        const el = screen.getByPlaceholderText("d");
        expect(el).toBeDisabled();
        expect(el).toHaveClass(
            "disabled:bg-disabled-fill",
            "cursor-not-allowed",
        );
    });

    it("lets consumer className override built-ins", () => {
        render(<Input className="h-12" placeholder="t" />);
        const el = screen.getByPlaceholderText("t");
        expect(el).toHaveClass("h-12");
        expect(el).not.toHaveClass("h-8");
    });
});
