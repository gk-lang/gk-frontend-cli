import http from "@/http";
const baseURL = import.meta.env.VITE_API_BASE_PATH;
const service = http(baseURL);

export async function queryFolderList(data) {
  const resp = await service({
    url: "folder/list",
    method: "post",
    data,
  });
  return resp;
}
