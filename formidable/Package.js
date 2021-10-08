exports.Package = class Package {
  publish() {
    return {
      vendor: {
        paths: {
          'app/Mail': './install/auth-emails',
        }
      },
      config: { }
    }
  }
}