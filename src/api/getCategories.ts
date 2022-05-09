import categories from "../mockData/categories";
import { wait } from "../utils/wait";

const Api = {
    getCategories: () => {
        return wait(3000).then(() => {
            return categories;
        });
    },
};

export default Api;
