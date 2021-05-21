import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from 'src/users/dtos/user.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException(`user #${id} not found`);
    }

    return user;
  }

  async update(id: string, changes: UpdateUserDto) {
    const user = this.userModel
      .findById(id, { $set: changes }, { new: true })
      .exec();

    if(!user){
      throw new NotFoundException(`user #${id} not found`);
    }

    return user
  }

  async remove(id: string) {
    const deleteUser = await this.userModel.findByIdAndRemove(id).exec();
    if (!deleteUser) {
      throw new NotFoundException(`user ${id} not found`);
    }

    return deleteUser;
  }
}
