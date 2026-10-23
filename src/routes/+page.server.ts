import sql from "$lib/db";

import type { Project } from "$lib/types";
import type { Actions, PageServerLoad } from "./$types";

export const actions: Actions = {
    post: async (e) => {
        const formData = await e.request.formData();
        const title = formData.get("title") as string;
        const desc = formData.get("desc") as string;

        await sql`INSERT INTO projects(title, description) VALUES(${title}, ${desc})`;
        return { success: true };
    },
    update: async (e) => {
        const formData = await e.request.formData();
        const title = formData.get("title") as string;
        const desc = formData.get("desc") as string;
        const id = formData.get("id") as string;
        const completed = formData.get("c") as string;

        if (completed == "true") {
            await sql`UPDATE projects SET completed = true, completed_at = CURRENT_TIMESTAMP WHERE id = ${id} `;
        } else {
            await sql`UPDATE projects SET title = ${title}, description = ${desc} WHERE id = ${id} `;
        }


        return { success: true };
    }
};


export const load: PageServerLoad = async () => {
    const projects: Project[] = await sql`SELECT id, title, description, completed FROM projects`;
    // console.log(projects);
    return { projects };
};
