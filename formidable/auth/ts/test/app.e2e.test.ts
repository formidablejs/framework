const formidable = require('../.formidable/build').default
const supertest = require('supertest')

describe('Application (e2e)', () => {
  let app

  beforeAll(() => {
    const application = await formidable

    app = application.fastify()

    await app.ready()
  })

  afterAll(() => {
    await app.close()
  })

  it('/ (GET: Welcome)', async () => {
    supertest(app.server)
      .get('/')
      .expect(200)
      .expect((res) => {
        expect(res.text).toContain('Your app is ready with Auth scaffolding')
      })
  })
})
