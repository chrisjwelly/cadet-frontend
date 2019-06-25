var Constants = require('../constants/constants.js');

var soundAssets = {};
var soundsToLoad = {};

export function markSoundsToLoad(story) {
  var nodes = story.getElementsByTagName('SOUND');
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    var name = node.getAttribute('name');
    if (!soundsToLoad[name]) {
      soundsToLoad[name] = true;
    }
  }
}

export function preloadSounds() {
  console.log("preloadSounds in sound-manager.js")
  var sounds = Object.keys(soundsToLoad);

  if (sounds.length > 0) {
    console.log("is sounds.length>0 ?")
    for (var i = 0; i < sounds.length; i++) {
      var soundFullPath = Constants.soundPath + sounds[i] + '.mp3';
      // TODO: Just a temporary implementation
      soundAssets[sounds[i]] = new Audio(soundFullPath);
    }
    // TODO: For real version, need to load the audios here
  }
  console.log("Sounds:" + sounds);
}

export function playAsyncSound(name) {
  if (soundAssets[name]) {
    soundAssets[name].play();
  }
}
