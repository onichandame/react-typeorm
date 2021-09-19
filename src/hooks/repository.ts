import { useEffect, useState } from "react";
import { Connection, Repository } from "typeorm";

export const useRepository = <T>(
  connection: Connection | null,
  entity: { new (): T; name: string }
) => {
  const [repo, setRepo] = useState<Repository<T> | null>(null);
  useEffect(() => {
    if (connection) {
      try {
        console.debug(
          `trying to get repository ${entity.name} on connection ${connection.name}`
        );
        setRepo(connection.getRepository(entity));
      } catch (e) {
        console.error(e);
      }
    }
  }, [connection, entity]);
  return repo;
};
