import { Observable, QueryRouter, Loader, sessionService, WebSocketClient } from '/js/src/index.js';
import Home from "./models/Home.js";
import About from "./models/About.js";

/**
 * Root of model tree
 * Handle global events: keyboard, websocket and router location change
 */
export default class Model extends Observable {
  /**
   * Load all sub-models and bind event handlers
   */
  constructor() {
    super();

    this.session = sessionService.get();
    this.session.personid = parseInt(this.session.personid, 10);

    this.loader = new Loader(this);
    this.loader.bubbleTo(this);

    // Setup router
    this.router = new QueryRouter();
    this.router.observe(this.handleLocationChange.bind(this));
    this.router.bubbleTo(this);

    this.homeModel = new Home(this);
    this.aboutModel = new About(this);

    this.homeModel.bubbleTo(this);
    this.aboutModel.bubbleTo(this);

    this.random = -1;

    this.setupWebSocket();
    this.handleLocationChange(); // Init first page
  }

  setupWebSocket() {
    this.ws = new WebSocketClient();

    this.ws.addListener('authed', () => {
      this.ws.sendMessage({ command: 'random' });
    });

    this.ws.addListener('command', (message) => {
      if (message.command === 'random') {
        this.setRandom(message.payload.result);
      }
    });
  }

  setRandom(newRandom) {
    this.random = newRandom;
    this.notify();
  }

  /**
   * Delegates sub-model actions depending on new location of the page
   */
  handleLocationChange() {
    switch (this.router.params.page) {
      case 'about':
      case 'home':
        break;
      default:
        this.router.go('?page=home');
        break;
    }
  }
}
