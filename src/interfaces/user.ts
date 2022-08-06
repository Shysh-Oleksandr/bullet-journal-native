export default interface IUser {
  _id: string;
  uid: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  customNoteTypes?: string;
  customNoteCategories?: string;
}

export const DEFAULT_USER: IUser = {
  _id: "62b82f38a02731ee158d8ceb",
  uid: "9odnYI72QoSUyvvo95WGnfjrq1m1",
  name: "Oleksandr Shysh",
  createdAt: "",
  updatedAt: "",
};
export const DEFAULT_FIRE_TOKEN = "";
