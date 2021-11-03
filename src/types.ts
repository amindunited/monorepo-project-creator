export type PackageConfigOptions = {
  [key: string]: string | boolean;
};
export type PackageConfig = {
  name: string;
  toggle: boolean,
  fn: (options: PackageConfigOptions) => Promise<any | void>,
  options: PackageConfigOptions;
};