import { Db } from '../services/database.service';
import { User, IUser, IUserMethods } from '../models/user.model';
import { HydratedDocument } from 'mongoose';


Db.connect().then((connection) => {
    // seed users
    const users = [
        {
            email: "test@yopmail.com",
            password: 'foobar',
            firstname: 'test',
            lastname: 'test',
            address: '7 rue de la charité',
            postcode: '13000',
            country: 'FRANCE'
        },
        {
            email: "test1@yopmail.com",
            password: 'foobar',
            firstname: 'test1',
            lastname: 'test1',
            address: '7 rue de la charité',
            postcode: '13000',
            country: 'FRANCE'
        },
        {
            email: "test2@yopmail.com",
            password: 'foobar',
            firstname: 'test2',
            lastname: 'test2',
            address: '7 rue de la charité',
            postcode: '13000',
            country: 'FRANCE'
        },
    ]

    for (const user of users) {
        User.register(user).then((_user: HydratedDocument<IUser, {}, IUserMethods>) => {
            console.log(`user registered with success, id: ${_user.id}`)
        })
    }
})


