import { ComponentMeta } from "@storybook/react";
import { FC } from "react";

import { useConnection } from "./connection";

const Root: FC = () => {
  const name = Math.random().toString(36).substr(3, 5);
  const conn = useConnection({
    name,
    autoSave: true,
    synchronize: true,
    location: `test`,
    entities: [],
  });

  return (
    <div>{`${conn?.name} ${
      conn?.isConnected ? `connected` : `not connected`
    }`}</div>
  );
};

export default { title: `connection/Hook` } as ComponentMeta<typeof Root>;

export const Hook = Root.bind({});
