class UIStore {
  rootStore: any;

  constructor(rootStore: any) {
    this.rootStore = rootStore;
  }

  uploadedFiles = async (): Promise<void> => {};
}

export default UIStore;
