exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('user_id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('access_token').unique();
    table.string('refresh_token').unique();
    table.string('password').notNullable();
    table.enu('user_type', ['developer', 'manager', 'qa']).notNullable();
  })
  .createTable('projects', function(table) {
    table.increments('project_id').primary();
    table.string('project_name').notNullable();
    table.integer('manager_id').unsigned().references('user_id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
  })
  .createTable('user_projects', function(table) {
    table.increments('id').primary();
    table.integer('user_id').unsigned().references('user_id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    table.integer('project_id').unsigned().references('project_id').inTable('projects').onDelete('CASCADE').onUpdate('CASCADE');
  })
  .createTable('bugs', function(table) {
    table.increments('bug_id').primary();
    table.string('bug_title').notNullable().unique();
    table.string('bug_description');
    table.string('bug_deadline');
    table.string('bug_screenshot');
    table.enu('bug_type', ['feature', 'bug']).notNullable();
    table.enu('bug_status', ['new', 'started', 'completed', 'resolved']).notNullable();
    table.integer('project_id').unsigned().references('project_id').inTable('projects').onDelete('CASCADE').onUpdate('CASCADE');
    table.integer('creator_user_id').unsigned().references('user_id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    table.integer('developer_user_id').unsigned().references('user_id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('bugs')
    .dropTable('user_projects') 
    .dropTable('projects')
    .dropTable('users');
};
