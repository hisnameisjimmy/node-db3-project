const db = require('../data/dbConfig.js');

module.exports = {
  find,
  findById,
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

function findSteps(id) {
  return db("schemes")
    .select("steps.id", "scheme_name", "step_number", "instructions")
    .from("schemes")
    .join("steps", { "schemes.id": "steps.scheme_id" })
    .where({ scheme_id: id })
    .orderBy("step_number", "asc");
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