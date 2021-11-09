import sequelize from 'sequelize';
import { Op, fn, col } from 'sequelize';
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

  getAllUsers: async () => {
    const users = await db.models.User.findAll({});
    return users;
  }
};

// fn('COUNT', col('Comments.idx'))

export default dbManager;
