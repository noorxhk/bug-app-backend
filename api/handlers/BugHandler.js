const db = require('../../db/db')
const fs = require('fs');
const path = require('path');


class BugHandler {
  static createBug(data, file) {
    const createdBug = db.transaction((trx) => {
      return trx('bugs')
        .insert({
          bug_title: data.bug_title,
          bug_description: data.bug_description ? data.bug_description : '',
          bug_deadline: data.bug_deadline ? data.bug_deadline : '',
          bug_type: data.bug_type,
          bug_screenshot: file ? file.path : '',
          bug_status: data.bug_status,
          project_id: data.project_id,
          creator_user_id: data.creator_user_id,
          developer_user_id: data.developer_user_id ,
        })
        .returning('*')
        .then((bug) => {
          return trx('bugs')
            .where('project_id', data.project_id)
            .select();
        });
    });
  
    return createdBug;
  }

  static async deleteBug(bugId, data) {
    await db('bugs')
      .where({ bug_id: bugId })
      .del();
   
    if (data.bug_screenshot != '') { 
      const fullPath = data.bug_screenshot;
      const fileName = path.basename(fullPath);
      const uploadDirectory = '../../uploads';
      const filePath = path.join(__dirname, uploadDirectory, fileName);

      try {
        fs.unlinkSync(filePath);
        console.log(`Deleted file: ${fileName}`);
      } catch (err) {
        console.error(`Error deleting file: ${fileName}`, err);
      }
    }
  
    const remainingBugs = await db('bugs')
      .where('project_id', data.project_id)
      .select();
  
    return remainingBugs;
  }

  static async updateBug(bugId, data, file) {
    const updateFields = [
      'bug_title',
      'bug_description',
      'bug_deadline',
      'bug_type',
      'bug_status',
      'bug_screenshot',
      'project_id',
      'creator_user_id',
      'developer_user_id',
    ];

    const updateData = {};

    updateFields.forEach((field) => {
      if (data[field] !== undefined) {
        updateData[field] = data[field];
      }
    });
    if (file) {
      updateData.bug_screenshot = file.path;
    }
    return db.transaction(async (trx) => {
      const updatedBugs = await trx('bugs')
        .where({ bug_id: bugId })
        .update(updateData)
        .returning('*');
      const projectBugs = await trx('bugs').where({ project_id: updatedBugs[0].project_id });
  
      return projectBugs;
    })
  }

  static findBugByTitle(title) {
    return db('bugs')
      .select('*')
      .where({ bug_title: title })
      .first();
  }
  
  static getBug(bugId) {
    return db('bugs')
      .where({ bug_id: bugId })
      .first();
  }
  static checkTitleUniqueness (title) {

    return db('bugs')
      .select('*')
      .where('bug_title', title)
      .first();

  }

  static getBugCreator(bugId) {
    return db
      .select('users.*')
      .from('bugs')
      .leftJoin('users', 'bugs.creator_user_id', 'users.user_id')
      .where('bugs.bug_id', bugId)
      .first();
  }

  static getBugDeveloper(bugId) {
    return db
      .select('users.*')
      .from('bugs')
      .leftJoin('users', 'bugs.developer_user_id', 'users.user_id')
      .where('bugs.bug_id', bugId)
      .first();
  }

}

module.exports = BugHandler;