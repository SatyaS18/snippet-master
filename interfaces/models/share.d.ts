export default interface IShare {
  id: string;
  snippetId: string;
  ownerId: string;
  validTill: string;
  viewedBy: Array<string>;
}
