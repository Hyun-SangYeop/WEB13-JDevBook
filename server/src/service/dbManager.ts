import sequelize from 'sequelize';
import { Op, fn, col } from 'sequelize';

import { PostData } from 'service/interface';

import db from '../models';

const dbManager = {
  sync: async () => {
    await db
      .sync({ force: false, logging: false })
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch((error: any) => {
        console.error('Unable to connect to the database:', error);
      });
  },

  getUserdata: async (username: string) => {
    const [user, created] = await db.models.User.findOrCreate({
      where: { nickname: username },
      defaults: { nickname: username }
    });

    return user.get();
  },

  searchUsers: async (keyword: string) => {
    const users = await db.models.User.findAll({
      where: { nickname: { [Op.like]: `%${keyword}%` } }
    });

    return users;
  },

  getPosts: async () => {
    const postsWithUser = await db.models.Post.findAll({
      include: [{ model: db.models.User, as: 'BTUseruseridx' }],
      order: [['createdAt', 'DESC']]
    });

    return postsWithUser;
  },

  addPost: async (postData: PostData) => {
    try {
      await db.models.Post.create({
        userIdx: postData.userId,
        secret: postData.secret,
        likenum: postData.likenum,
        contents: postData.contents,
        picture1: postData.picture1,
        picture2: postData.picture2,
        picture3: postData.picture3
      });
    } catch (error) {
      console.error(error);
      return false;
    }

    return true;
  },

  getAllUsers: async () => {
    const users = await db.models.User.findAll({});
    return users;
  },

  getUseridx: async function (name: string) {
    const user = await db.models.User.findOne({
      where: { nickname: name }
    });

    return user?.get().idx ? user?.get().idx : -1;
  },

  getChatList: async function (sender: string, receiver: string) {
    const senderidx: number = await this.getUseridx(sender);
    const receiveridx: number = await this.getUseridx(receiver);

    const allChats = await db.models.Chat.findAll({
      where: {
        [Op.or]: [
          { senderidx: senderidx, receiveridx: receiveridx },
          { senderidx: receiveridx, receiveridx: senderidx }
        ]
      }
    });
    const allChatsArray = allChats.map((data: any) => data.get());

    return {
      senderidx: senderidx,
      receiveridx: receiveridx,
      previousMsg: allChatsArray
    };
    //console.log(allChatsArray); // 없거나 오류여도 [] 나옴

    /*
      { senderdix: ?
        receiveridx: ?
        chat: ?}, 
        줄줄이
    */
  },

  setChatList: async function (sender: string, receiver: string, msg: string) {
    const senderidx: number = await this.getUseridx(sender);
    const receiveridx: number = await this.getUseridx(receiver);
    await db.models.Chat.create({
      senderidx: senderidx,
      receiveridx: receiveridx,
      content: msg
    });
  }
};

// fn('COUNT', col('Comments.idx'))

export default dbManager;
