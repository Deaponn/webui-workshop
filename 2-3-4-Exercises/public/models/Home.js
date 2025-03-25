import {Observable} from '/js/src/index.js';

export default class Home extends Observable {
  constructor(model) {
    super();

    this.username = model.session.username;
  }

  getUsername() {
    return this.username;
  }

  setUsername(newUsername) {
    this.username = newUsername;
    this.notify();
  }
}
