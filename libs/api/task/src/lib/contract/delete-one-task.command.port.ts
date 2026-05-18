export interface IDeleteOneTaskCommand {
  delete(id: number): Promise<boolean>;
}
