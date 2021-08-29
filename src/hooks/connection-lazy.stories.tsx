import { ComponentMeta } from "@storybook/react";
import { FC } from "react";

import { useLazyConnection } from "./connection";

const Root: FC<{ name: string }> = ({ name }) => {
  const [conn, connect] = useLazyConnection({
    name,
    autoSave: true,
    synchronize: true,
    location: `test-lazy`,
    entities: [],
  });

  return (
    <>
      <div>{`${conn?.name || ``} ${
        conn?.isConnected ? `connected` : `not connected`
      }`}</div>
      <button onClick={() => connect()}>connect</button>
    </>
  );
};

export default {
  title: `Hook/Connection Lazy`,
  args: { name: Math.random().toString(36).substr(3, 5) },
} as ComponentMeta<typeof Root>;

export const LazyHook = Root.bind({});
