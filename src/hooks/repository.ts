import { useEffect, useState } from "react";
import { Connection, Repository } from "typeorm";

export const useRepository = <T>(
  connection: Connection | null,
  entity: { new (): T }
) => {
  const [repo, setRepo] = useState<Repository<T> | null>(null);
  useEffect(() => {
    if (connection) setRepo(connection.getRepository(entity));
  }, [connection, entity]);
  return repo;
};
