import { useState } from "react";

import { TextArea } from "semi-design-plus";

export function TextAreaDemo() {
    const [value, setValue] = useState("");

    return (
        <TextArea
            placeholder="请输入"
            maxLength={10}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
}
