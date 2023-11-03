import httpInstance from "@/utils/http";
export function getCotegory() {
  return httpInstance({
    url: "home/category/head",
  });
}
