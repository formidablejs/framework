exports.Package = class Package {
  publish() {
    return {
      'auth-emails': {
        paths: {
          'app/Mail': './formidable/auth-emails',
        }
      },
      'web': {
        paths: {
          'public': './formidable/web/public',
          'app/Resolvers': './formidable/web/resolvers',
          'routes': './formidable/web/routes',
          'resources/views': './formidable/web/views',
        }
      }
    }
  }
}