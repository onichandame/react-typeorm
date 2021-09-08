import {
  getConnection,
  ConnectionOptions,
  Connection,
  createConnection,
} from "typeorm";
import { useCallback, useEffect, useState } from "react";
import localforage from "localforage";
// prettier-ignore
// @ts-ignore
import SQL from "sql.js/dist/sql-asm";

type Props = Omit<
  Extract<ConnectionOptions, { type: `sqljs` }>,
  "type" | "useLocalForage"
> & { name: string }; // need name to retrieve connection

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

export const useLazyConnection = (props: Props) => {
  const [conn, setConn] = useState<Connection | null>(null);
  setup();
  const connect = useCallback(
    async (props2?: Props) => {
      let con: Connection;
      try {
        con = getConnection(props.name);
      } catch (e) {
        console.debug(e);
        con = await createConnection({
          type: `sqljs`,
          useLocalForage: true,
          ...props,
          ...props2,
        });
      }
      setConn(con);
      return con;
    },
    [props]
  );
  return [conn, connect] as [typeof conn, typeof connect];
};

export const useConnection = (props: Props) => {
  setup();
  const [conn, connect] = useLazyConnection(props);
  useEffect(() => {
    connect();
  }, [connect]);

  return conn;
};
