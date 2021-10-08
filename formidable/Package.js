exports.Package = class Package {
  publish() {
    return {
      'auth-emails': {
        paths: {
          'app/Mail': './formidable/auth-emails',
        }
      }
    }
  }

  settings() {
    return {
      'auth-emails': {
        'allow-force': true
      }
    }
  }
}