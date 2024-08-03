import { Button, Tooltip } from "@nextui-org/react";
import ConsoleLayout from "~/components/layouts/console";

export default function ConsoleIndex() {
  return (
    <ConsoleLayout>
      Console Index
      <Tooltip
        content={
          <div className="px-1 py-2">
            <div className="text-small font-bold">Custom Content</div>
            <div className="text-tiny">This is a custom tooltip content</div>
          </div>
        }
      >
        <Button className="bordered">Hover me</Button>
      </Tooltip>
    </ConsoleLayout>
  );
}
