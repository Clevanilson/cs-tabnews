export type StatusRes = {
  updatedAt: string;
  database: StatusResDatabase;
};

type StatusResDatabase = {
  version: string;
  maxConnections: number;
};
