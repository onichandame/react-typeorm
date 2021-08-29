import { ComponentMeta } from "@storybook/react";
import { FC } from "react";
import { BeforeInsert, PrimaryGeneratedColumn, Entity, Column } from "typeorm";

import { useConnection } from "./connection";
import { useRepository } from "./repository";
import { useAllDocs } from "./allDocs";

@Entity()
class TestEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column(`float`)
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
    location: `test-allDocs`,
    entities: [TestEntity],
  });

  const repo = useRepository(conn, TestEntity);

  const docs = useAllDocs(repo);

  return (
    <div>
      <ul>
        {docs.map((v) => (
          <li key={v.id}>
            {`id: ${v.id}; random: ${v.random}`}
            <button onClick={() => repo?.remove(v)}>delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => repo?.save(new TestEntity())}>new item</button>
    </div>
  );
};

export default {
  title: `Hook/All Docs`,
  args: { name: Math.random().toString(36).substr(3, 5) },
} as ComponentMeta<typeof Root>;

export const Hook = Root.bind({});
