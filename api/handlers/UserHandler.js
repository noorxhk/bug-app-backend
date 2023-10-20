
const {
  Validators
} = require('../../helpers');
const db = require('../../db/db')
const AuthUtil = require('../../Utilities/AuthUtil')

class UserHandler {

  static findUserByEmail (email) {

    return db('users')
      .select('*')
      .where('email', email)
      .first();

  }

  static getUserProjects(userId) {
    return  db
    .select('projects.*')
    .from('user_projects')
    .innerJoin('projects', 'user_projects.project_id', 'projects.project_id')
    .where('user_projects.user_id', userId)
  }

  static get_developers() {
    return db('users')
    .select('user_id', 'name', 'email')
    .where('user_type', 'developer');
  }

  static async update_user(userId, data) {
    const updateFields = [
      'name',
      'email',
      'password',
      'user_type',
    ];

    const updateData = {};

    updateFields.forEach((field) => {
      if (data[field] !== undefined) {
        updateData[field] = data[field];
      }
    });
    if (updateData.password) {
      updateData.password = await AuthUtil.createHashedPassword(data.password);
    }
    return db('users')
      .where({ user_id: userId })
      .update(updateData).returning('*');
  }

  static signOut (userId) {

    return db('users')
      .where('user_id', userId)
      .update({
        access_token: null
      }).returning('*');

  }

  static getUser(userId) {
    return db('users')
      .where({ user_id: userId })
      .first();
  }

  static checkEmailUniqueness (userId, email = '') {

    return db('users')
      .select('*')
      .where('email', email)
      .whereNot({
        user_id: Validators.parseInteger(userId, -1)
      })
      .first();

  }

  static findUserByAccessToken (token) {

    return db('users')
      .select('*')
      .where('access_token', token)
      .first();

  }

  static createUser ({ email, name, password, user_type }) {

    return db('users')
      .insert({
        email,
        name,
        password,
        user_type
      }).returning('*');

  }

  static setAccessToken (userId, accessToken, refreshToken) {

    return db('users')
      .where('user_id', Validators.parseInteger(userId, -1))
      .update({
        access_token: accessToken,
        refresh_token: refreshToken,
      }).returning('*');

  }

 

  static deleteUser (email) {

    return db('users')
      .where('email', email)
      .del();

  }

  static getAuthenticateUser (userId, email = " ", authToken) {

    return db('users')
      .select('*')
      .where({
        email,
        user_id: Validators.parseInteger(userId, -1),
        access_token: authToken,
      })
      .first();
  }

  static fetchUserById (id) {

    return db('users')
      .select('*')
      .where('user_id', Validators.parseInteger(id, -1))
      .first();

  }

}

module.exports = UserHandler;
