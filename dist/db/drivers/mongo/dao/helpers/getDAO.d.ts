import { Db } from 'mongodb';
import { Collection, CollectionPartials } from '../../collection/types';
import { DAO } from '../DAO';
export declare function getDAO<C extends Collection<any, any, any>>(db: Db, collection: C): DAO<CollectionPartials.Entity<C>, CollectionPartials.Record<C>, CollectionPartials.DefaultValues<C>>;
