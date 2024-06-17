export interface SharedOptions {
  out: string;
}

export interface BuildCommand extends SharedOptions {
  _command: "build";
}

export interface StartCommand extends SharedOptions {
  _command: "start";
}

export interface DevCommand extends SharedOptions {
  _command: "dev";
}

export type Options = BuildCommand | StartCommand | DevCommand;
