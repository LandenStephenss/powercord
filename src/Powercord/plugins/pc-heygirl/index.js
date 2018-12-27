// idea based on http://heygirl.io/ (+used their images)

const Plugin = require('powercord/Plugin');

module.exports = class HeyGirl extends Plugin {
  constructor () {
    super({
      dependencies: [ 'pc-commands' ]
    });

    this.URLs = [].concat(
      Array(3).fill('jpg'),
      Array(2).fill('gif'),
      Array(1).fill('png'),
      Array(4).fill('gif'),
      Array(3).fill('jpg'),
      Array(1).fill('png')
    ).map((format, id) => (
      `http://heygirl.io/img/gosling-square-${id + 1}.${format}`
    ));
  }

  getRandomURL () {
    return this.URLs[Math.floor(Math.random() * this.URLs.length)];
  }

  heygirl () {
    document.querySelectorAll('[style*="background-image"]')
      .forEach(({ style }) => (
        style.backgroundImage = `url("${this.getRandomURL()}")`
      ));

    document.querySelectorAll('img')
      .forEach(image => (
        image.src = this.getRandomURL()
      ));
  }

  start () {
    powercord
      .pluginManager
      .get('pc-commands')
      .register(
        'heygirl',
        'Replaces every image with a random image of Ryan Gosling.',
        '{c}',
        this.heygirl.bind(this)
      );
  }
};