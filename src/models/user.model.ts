import {serializable, alias, primitive} from 'serializr';

export class User {
    @serializable(alias('email', primitive()))
    email?: string;

    @serializable(alias('password', primitive()))
    password?: string;
}
