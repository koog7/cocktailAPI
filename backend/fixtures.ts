import mongoose from 'mongoose';
import User from './models/Users';
import { randomUUID } from 'crypto';
import Cocktail from './models/Cocktails';

const run = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/cocktailAPI');
    const db = mongoose.connection;

    try {
        await db.dropCollection('users')
        await db.dropCollection('cocktails')
    }catch (e){
        console.error(e);
    }

    const users = await User.create([
        {
            email: 'user1@gmail.com',
            password: 'password1',
            displayName: 'User1',
            avatar:'user.png',
            role: 'user',
            token:randomUUID(),
        },
        {
            email: 'admin2@gmail.com',
            password: 'password2',
            displayName: 'Admin2',
            avatar:'admin.png',
            role: 'admin',
            token:randomUUID(),
        }
    ])

    const [user1 , admin2] = users;

    await Cocktail.create([
        {
            userId: user1._id,
            name: "Piña Colada",
            image: "pinacolada.webp",
            recipe: "Смешайте ром, кокосовое молоко и ананасовый сок, добавьте лед.",
            isPublished: true,
            ingredients: [
                {
                    name: "White Rum",
                    amount: "60 ml"
                },
                {
                    name: "Coconut Cream",
                    amount: "30 ml"
                },
                {
                    name: "Pineapple Juice",
                    amount: "90 ml"
                },
                {
                    name: "Ice",
                    amount: "5 cubes"
                },
                {
                    name: "Pineapple Slice",
                    amount: "1 slice (for garnish)"
                }
            ]
        },
        {
            userId: admin2._id,
            name: "Mojito",
            image: "mohito.jpg",
            recipe: "Разомните листья мяты, добавьте ром, сахар и содовую, подавайте со льдом.",
            isPublished: false,
            ingredients: [
                {
                    name: "White Rum",
                    amount: "50 ml"
                },
                {
                    name: "Mint Leaves",
                    amount: "10 leaves"
                },
                {
                    name: "Soda Water",
                    amount: "100 ml"
                },
                {
                    name: "Sugar",
                    amount: "2 tsp"
                },
                {
                    name: "Ice",
                    amount: "5 cubes"
                },
                {
                    name: "Lime",
                    amount: "1 slice (for garnish)"
                }
            ]
        }
    ]);

    await db.close();

}

run().catch(console.error)