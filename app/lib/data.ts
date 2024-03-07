// import User from "@/app/dashboard/users/page"; 
// import { IUsersPromise } from "@/types/users.types";

// export const fetchUsers = async (q: string, page: number): Promise<IUsersPromise | undefined> => {
//     const regex = new RegExp(q, "i");
//     const ITEMS_PER_PAGE = 2; 
//     try {
//         const count = await User.find({ username: { $regex: regex } }).countDocuments();
//         const users = await User.find({ username: { $regex: regex } }).limit(ITEMS_PER_PAGE).skip(ITEMS_PER_PAGE * (page - 1));
//         return { count, users };
//     } catch (error) {
//         console.error(error); 
//         return undefined; 
//     }
// };
