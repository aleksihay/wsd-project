import { browser } from "$app/environment";
import { goto } from "$app/navigation";
import { error } from "@sveltejs/kit";

export const load = () => {
  if (browser) {
    const user = localStorage.getItem("user");
    if (!user) {
      goto("/auth/login");
      return;
    }

    const roles = JSON.parse(user).roles || [];
    if (!roles.includes("ADMIN")) {
      throw error(403, "Access denied");
    }
  }
};