const formidable = require('../.formidable/build').default
const supertest = require('supertest')

describe('Application (e2e)', () => {
  let app

  beforeAll(async () => {
    const application = await formidable

    app = application.fastify()

    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('/ (GET: Welcome)', async () => {
    supertest(app.server)
      .get('/')
      .expect(200)
      .expect((res) => {
        expect(res.text).toContain('Yey! You have successfully created a new Formidable project')
      })
  })
})
