export type HttpResponse<TBody = null> = {
  status: number;
  body: TBody;
};
