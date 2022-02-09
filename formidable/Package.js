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
          'test': './formidable/web/test',
          'resources/views': './formidable/web/views',
        }
      },
      'spa': {
        paths: {
          'public': './formidable/spa/public',
          'app/Resolvers': './formidable/spa/resolvers',
          'routes': './formidable/spa/routes',
          'test': './formidable/spa/test',
          'resources/assets': './formidable/spa/assets',
          'resources/imba': './formidable/spa/imba',
          'resources/views': './formidable/spa/views',
        }
      }
    }
  }
}