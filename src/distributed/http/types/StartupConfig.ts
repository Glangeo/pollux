import { AppOptions } from 'src/core';

export namespace StartupConfig {
  export type Global = {
    combined: {
      services: string[];
      url: string;
    };
    detached: {
      name: string;
      url: string;
    }[];
  };

  export type App = {
    name: string;
    options: {
      app: AppOptions;
    };
  };
}
