exports.Package = class Package {
  publish(language = 'imba') {
    const path = language.toLowerCase() == 'imba'
      ? 'imba' : (
        language.toLowerCase() == 'typescript' ? 'ts' : 'imba'
      )

    return {
      'auth-emails': {
        paths: {
          'app/Mail': './formidable/auth-emails',
        }
      },
      'web': {
        paths: {
          'config': `./formidable/web/config/${path}`,
          'public': './formidable/web/public',
          'app/Resolvers': `./formidable/web/resolvers/${path}`,
          'routes': `./formidable/web/routes/${path}`,
          'test': `./formidable/web/test/${path}`,
          'resources/views': './formidable/web/views',
        }
      },
      'auth': {
        paths: {
          './': `./formidable/auth/${language.toLowerCase()}`,
        }
      }
    }
  }
}