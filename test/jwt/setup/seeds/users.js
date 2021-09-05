exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          name: 'John Doe',
          email: 'johndoe@example',
          password: '$2a$12$1UBpKKPqk0/5/VQ.AjjFxOJT.NKw6udWjtPWNbfN6jfBbYqqnODOW'
        }
      ]);
    });
};