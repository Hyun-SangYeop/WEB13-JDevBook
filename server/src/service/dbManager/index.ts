import db from '../../models';

import { toggleLikePosts, updateLikeNum } from './like';
import { getPosts, addPost, updatePost, deletePost } from './post';
import { getComments, getCommentsNum, addComment } from './comment';
import {
  getUserData,
  getAllUsers,
  getUseridx,
  getUserName,
  setUserLoginState,
  getUserLoginState,
  getUserJoinedGroups,
  getAllUsersObj,
  updateBio,
  updateProfile,
  getProfile
} from './user';
import { searchUsers } from './search';
import { getProblems, insertSolvedProblem } from './problem';
import { getGroupList, getGroup, toggleUserGroup } from './group';
import { setChatList, getChatList } from './chat';
import { setGroupChatList, getGroupChatList } from './groupchat';
import { getGroupUsers, getGroupUsersName } from './usergroup';
const problemOS = require('../../config/problem_os.json');
const group = require('../../config/initgroup.json');

const dbManager = {
  sync: async function () {
    const force: boolean = false;
    await db
      .sync({ force: force, logging: false })
      .then(async () => {
        if (force) {
          await this.createInitGroup();
        }
        console.log('Connection has been established successfully.');
      })
      .catch((error: any) => {
        console.error('Unable to connect to the database:', error);
      });
  },

  createInitGroup: async function () {
    const result = await db.models.Group.bulkCreate(group, {
      logging: false,
      returning: true
    });
    //return result.get();
  },

  getUserData,
  getAllUsers,
  getUserName,
  getUseridx,

  updateProfile,
  getProfile,
  updateBio,

  setUserLoginState,
  getUserLoginState,

  searchUsers,

  getPosts,
  addPost,
  updatePost,
  deletePost,

  setChatList,
  getChatList,

  toggleLikePosts,
  updateLikeNum,

  addComment,
  getComments,
  getCommentsNum,

  getProblems,
  insertSolvedProblem,

  getGroupList,
  getGroup,
  getUserJoinedGroups,
  toggleUserGroup,

  getGroupUsers,
  getGroupUsersName,

  setGroupChatList,
  getGroupChatList,
  getAllUsersObj
};

export default dbManager;
