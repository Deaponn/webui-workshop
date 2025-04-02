import { Observable, Loader, RemoteData } from '/js/src/index.js';

const parseDetails = (remoteData) => remoteData.match({
  NotAsked: () => ({ message: 'Data has not been fetched from the server' }),
  Loading: () => ({ message: 'Loading, please wait' }),
  Success: (details) => details,
  Failure: (error) => error
});

export default class Home extends Observable {
  constructor(model) {
    super();

    this.details = parseDetails(RemoteData.notAsked());
    this.requestedTimes = 0;
    this.loader = new Loader();

    this.fetchDetails();
  }

  async fetchDetails() {
    await new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 1000);
    });

    this.setDetails(parseDetails(RemoteData.loading()));
    try {
      const { result, ok } = await this.loader.get("/api/app-info");
      this.setDetails(parseDetails(RemoteData.success(result)));
    } catch (error) {
      this.setDetails(parseDetails(RemoteData.failure(error)));
    }
  }

  appendDetails(key, detail) {
    this.setDetails({ ...this.details, [key]: detail });
  }

  setDetails(newDetails) {
    this.details = newDetails;
    this.notify();
  }

  getDetails() {
    this.requestedTimes++;
    return this.details;
  }

  getRequestedTimes() {
    return this.requestedTimes;
  }
}
