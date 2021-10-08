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
}