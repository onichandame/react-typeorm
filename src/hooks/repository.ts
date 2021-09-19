import { useEffect, useState } from "react";
import { Connection, Repository } from "typeorm";
import retry from "@onichandame/retry";

export const useRepository = <T>(
  connection: Connection | null,
  entity: { new (): T; name: string }
) => {
  const [repo, setRepo] = useState<Repository<T> | null>(null);
  useEffect(() => {
    let active = true;
    const tryOnce = async () => {
      if (connection) {
        console.debug(
          `trying to get repository ${entity.name} on connection ${connection.name}`
        );
        const repo = connection.getRepository(entity);
        if (active) setRepo(repo);
      }
    };
    retry(tryOnce, { attempts: 5, interval: 200 });
    return () => {
      active = false;
    };
  }, [connection, entity]);
  return repo;
};
