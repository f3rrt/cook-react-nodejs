import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'src/common/dto/create-user.dto';
import { IUser } from 'src/common/interface/user.interface';
import { Model } from 'mongoose';
import { UpdateUserDto } from 'src/common/dto/update-user.dto';

@Injectable()
export class UsersService {
   constructor(@InjectModel('User') private userModel: Model<IUser>) {}

   async createUser(createUsersDto: CreateUserDto): Promise<IUser> {
      const newUsers = await new this.userModel(createUsersDto);
      return newUsers.save();
   }

   async updateUser(usersId: string, updateUsersDto: UpdateUserDto): Promise<IUser> {
      const existingUsers = await this.userModel.findByIdAndUpdate(usersId, updateUsersDto, {
         new: true,
      });
      if (!existingUsers) {
         throw new NotFoundException(`Users #${usersId} not found`);
      }
      return existingUsers;
   }

   async validateUser(email: string, password: string) {
      console.log(`[UsersService] validateUser, email: ${email}, password: ${password}`);
      const user = await this.userModel.findOne({ email: email }).exec();
      if (user) {
         console.log('[UsersService] validateUser: found user', user);
         return { ...user, password: undefined };
      }
      return undefined;
   }

   async getAllUsers(): Promise<IUser[]> {
      const usersData = await this.userModel.find();
      // if (!usersData || usersData.length == 0) {
      //   throw new NotFoundException('Userss data not found!');
      // }
      return usersData;
   }

   async getUser(usersId: string): Promise<IUser> {
      const existingUsers = await this.userModel.findById(usersId).exec();
      if (!existingUsers) {
         throw new NotFoundException(`Users #${usersId} not found`);
      }
      return existingUsers;
   }

   async getUserByEmail(email: string): Promise<IUser> {
      const existingUsers = await this.userModel.findOne({ email: email }).exec();
      if (!existingUsers) {
         return null;
      }
      return existingUsers;
   }

   async deleteUser(usersId: string): Promise<any> {
      const deletedUsers = await this.userModel.findByIdAndDelete(usersId);
      if (!deletedUsers) {
         throw new NotFoundException(`Users #${usersId} not found`);
      }
      return deletedUsers;
   }
}
