import { LINKS } from '../../../utils/constants'
import { history } from '../../../utils/history'

export default function (StoryXMLPlayer, story, username, attemptedAll) {
  function saveToServer() { }

  function loadFromServer() { }

  var hookHandlers = {
    startMission: function (number) {
      console.log('startMission: ' + number)
      const assessmentType = story.split('-')[0] + 's'
      return history.push('/academy/' + assessmentType)
      // TODO: Reimplement redirection to actual assessment rather than the
      //       listing, after story.xml files have been changed. Currently, the
      //       story xml number points to the mission number, but the
      //       assessment id we obtain and therefore organise our assessments
      //       by refers to the database table ID
      // return history.push('/academy/' + assessmentType + '/' + number)
    },
    openTemplate: function (name) {
      switch (name) {
        case 'textbook':
          return window.open(LINKS.TEXTBOOK, '_blank');
        case 'announcements':
          return window.open(LINKS.LUMINUS);
        case 'lesson_plan':
          return history.push('/academy/missions');
        case 'students':
          return history.push(LINKS.PIAZZA);
        case 'materials':
          return window.open(LINKS.LUMINUS);
        case 'IDE':
          return history.push('/playground');
        case 'path':
          return history.push('/academy/paths');
        default:
          return window.open(LINKS.LUMINUS);
      }
    },
    pickUpCollectible: function () { },
    playSound: function (name) {
      var sound;
      if (name.substring(0, 5) === "test-") {
        if (name.substring(5, 10) === "roll-") {
          name = name + randomIntFromInterval(1,3);
        }
        console.log("Name: " + name);
        sound = new Audio(ASSETS_HOST_TEST + 'sounds/' + name + '.mp3');
      } else {
        sound = new Audio(ASSETS_HOST + 'sounds/' + name + '.mp3');
      }
      
      if (sound) {
        sound.play();
      }
    }
  };

  function randomIntFromInterval(min,max) {// min and max included
      return Math.floor(Math.random()*(max-min+1)+min);
  }

  function openWristDevice() {
    window.open(LINKS.LUMINUS);
  }

  function startGame(div, canvas, saveData) {
    saveData = saveData || loadFromServer();
    StoryXMLPlayer.init(div, canvas, {
      saveData: saveData,
      hookHandlers: hookHandlers,
      saveFunc: saveToServer,
      wristDeviceFunc: openWristDevice,
      playerName: username,
      playerImageCanvas: $('<canvas />'),
      changeLocationHook: function (newLocation) {
        if (typeof Storage !== 'undefined') {
          // Code for localStorage/sessionStorage.
          localStorage.cs1101s_source_academy_location = newLocation;
        }
      }
    });
  }

  function initialize(div, canvas) {
    startGame(div, canvas);
    var willPlayOpening = !attemptedAll;
    var savedLocation;
    console.log("Initialize's story: " + story);
    console.log("Initialize's willPlayOpening: " + willPlayOpening);
    console.log("Initialize's savedLocation: " + savedLocation);
    if (typeof Storage !== 'undefined') {
      // Code for localStorage/sessionStorage.
      console.log("localstorage thingy: " + localStorage.cs1101s_source_academy_location);
      savedLocation = localStorage.cs1101s_source_academy_location;
      console.log("Saved location: " + savedLocation)
    }
    if (story === 'contest-3.3') {
      alert('Next contest: 3D Rune')
    } else if (story === 'mission-1') {
      console.log("Initialize else if story === mission-1 in create-initializer.js");
      // spaceship followed by mission-2
      StoryXMLPlayer.loadStory('spaceship', function () { 
        console.log("test");
        StoryXMLPlayer.loadStory('mission-1', function() { })
      })
      // spaceship only
      /*
      StoryXMLPlayer.loadStory('spaceship', function() {} )
        //StoryXMLPlayer.loadStory('mission-1', function () { })
      //})
      */
    } else if (willPlayOpening) {
      console.log("Is this willPlayOpening being called");
      StoryXMLPlayer.loadStory(story, function () { }, savedLocation);
    } else {
      console.log("Or is the else block being called?");
      StoryXMLPlayer.loadStoryWithoutFirstQuest(story, function () { }, savedLocation)
    }
  }

  return initialize;
};
