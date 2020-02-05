const db = require('../data/dbConfig.js');

module.exports = {
  find,
  findSteps,
  add,
  update,
  remove
};

function find() {
    return db('schemes');
}

function findById(id) {
    return db('schemes')
      .where({ id })
      .first();
}

function add(scheme) {
    db("schemes")
    .insert(scheme)
        .then(ids => {
            return findById(ids[0]);
        });
}

function update(changes, id) {
    return db("schemes")
      .where("id", id)
      .update(changes)
      .then(count => (count > 0 ? this.get(id) : null));
}

function remove(id) {
    return db("schemes")
      .where("id", id)
      .del();
}