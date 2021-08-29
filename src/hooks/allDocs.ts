import { useEffect, useState } from "react";
import {
  EventSubscriber,
  EntitySubscriberInterface,
  Repository,
} from "typeorm";

export const useAllDocs = <T>(repo: Repository<T> | null) => {
  const [docs, setDocs] = useState<T[]>([]);
  useEffect(() => {
    let active = true;
    @EventSubscriber()
    class Subscriber implements EntitySubscriberInterface<T> {
      listenTo() {
        if (!repo) throw new Error(`repo not initialized`);
        return repo.target;
      }
      private updateDocs() {
        repo?.find().then((v) => {
          if (active) setDocs(v);
        });
      }
      afterInsert() {
        this.updateDocs();
      }
      afterUpdate() {
        this.updateDocs();
      }
      afterRemove() {
        this.updateDocs();
      }
    }
    const subscriber = new Subscriber();
    const subscribers = repo?.manager.connection.subscribers;
    subscribers?.push(subscriber);
    return () => {
      subscribers?.splice(subscribers.indexOf(subscriber));
      active = false;
    };
  }, [repo]);
  useEffect(() => {
    let active = true;
    if (repo)
      repo.find().then((v) => {
        if (active) setDocs(v);
      });
    return () => {
      active = false;
    };
  }, [repo]);
  return docs;
};
