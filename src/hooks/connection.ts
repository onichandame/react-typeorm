import { ConnectionOptions, Connection, createConnection } from "typeorm";
import { useCallback, useEffect, useState } from "react";
import localforage from "localforage";
// prettier-ignore
// @ts-ignore
import SQL from "sql.js/dist/sql-asm";

type Props = Omit<
  Extract<ConnectionOptions, { type: `sqljs` }>,
  "type" | "useLocalForage"
>;

let done = false;

const setup = () => {
  useEffect(() => {
    if (!done) {
      (window as any).localforage = localforage;
      (window as any).SQL = SQL;
      done = true;
    }
  }, []);
};

export const useConnection = (props: Props) => {
  const [conn, setConn] = useState<Connection | null>(null);
  setup();
  useEffect(() => {
    let active = true;
    createConnection({ type: `sqljs`, useLocalForage: true, ...props }).then(
      (conn) => {
        if (active) setConn(conn);
      }
    );
    return () => {
      active = false;
    };
  }, [props]);

  return conn;
};

export const useLazyConnection = (props: Props) => {
  const [conn, setConn] = useState<Connection | null>(null);
  setup();
  const connect = useCallback(
    async (props2?: Props) => {
      setConn(
        await createConnection({
          type: `sqljs`,
          useLocalForage: true,
          ...props,
          ...props2,
        })
      );
    },
    [setConn, props]
  );
  return [conn, connect] as [typeof conn, typeof connect];
};
