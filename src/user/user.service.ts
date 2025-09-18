import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async onModuleInit() {
    const usersCount = await this.userModel.countDocuments().exec();
    if (usersCount < 3) {
      await this.createInitialUsers();
    }
  }

  async createInitialUsers() {


    const initialUsers = [
      {
        name: 'Luw',
        username: 'Luw',
        password: await bcrypt.hash('Luw1167', 10),
        role: 'admin',
        personagens: [],
        campanhas: [],
        anotacoes: ['Usuário administrador inicial'],
      },
      {
        name: 'Tensei',
        username: 'Tensei',
        password: await bcrypt.hash('Tensei123', 10),
        role: 'admin',
        personagens: [],
        campanhas: [],
        anotacoes: ['Usuário administrador inicial'],
    },
    {
      name: 'Niro',
      username: 'Niro',
      password: await bcrypt.hash('Niro123', 10),
      role: 'admin',
      personagens: [],
      campanhas: [],
      anotacoes: ['Usuário administrador inicial'],
    },
  ];

    await this.userModel.insertMany(initialUsers);
    console.log('Usuários iniciais criados');
  }

  async verifyPassword(
    username: string,
    password: string, 
  ): Promise<UserDocument | null> {
    const user = await this.userModel.findOne({ username }).exec();
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async findUserByUsername(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async createUser(data: any): Promise<UserDocument> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = new this.userModel({
      ...data,
      password: hashedPassword,
      role: 'user',
    });
    return newUser.save();
  }
}
