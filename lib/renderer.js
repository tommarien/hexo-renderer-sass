const sass = require('node-sass')

module.exports = (ext) => function (data) {
  const userConfig = {
    ...this.theme.config.node_sass || {},
    ...this.config.node_sass || {},
  }

  const config = {
    data: data.text,
    file: data.path,
    outputStyle: 'nested',
    sourceComments: false,
    indentedSyntax: (ext === 'sass'),
    ...userConfig,
  }

  return new Promise((resolve, reject) => {
    sass.render(config, (err, res) => {
      if (err) reject(err);
      return resolve(res.css.toString());
    });
  });
}
