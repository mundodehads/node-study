import IBranch from './branch';

export default interface IRepository {
    name: string;
    owner: string;
    branches?: IBranch;
}