import { ComponentMeta } from "@storybook/react";
import { FC } from "react";
import { BeforeInsert, PrimaryGeneratedColumn, Entity, Column } from "typeorm";

import { useConnection } from "./connection";
import { useRepository } from "./repository";

@Entity()
class TestEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column(() => Number)
  random!: number;
  @BeforeInsert()
  generateRandom() {
    this.random = Math.random();
  }
}
const Root: FC<{ name: string }> = ({ name }) => {
  const conn = useConnection({
    name,
    autoSave: true,
    synchronize: true,
    location: `test-repo`,
    entities: [TestEntity],
  });

  const repo = useRepository(conn, TestEntity);

  return <div>{repo ? `connected` : `not connected`}</div>;
};

export default {
  title: `Hook/Repository`,
  args: { name: Math.random().toString(36).substr(3, 5) },
} as ComponentMeta<typeof Root>;

export const Hook = Root.bind({});
