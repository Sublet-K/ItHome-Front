import { Post } from "@type/Type"; // Ensure Post is correctly defined and imported
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Define the URL for fetching posts
const URL = process.env.NEXT_PUBLIC_BACKEND_URL + `/post?maxPost=6&page=`;

// Define the store using zustand with type-safe state
export const SubletPostStore = create<{
  post: Post[];
  postExist: boolean;
  page: number;
  postAll: Post[];
  postMarker: boolean;
  setPostMarker: (flag: boolean) => void;
  clearPost: () => void;
  clearPostAll: () => void;
  asyncGetPost: (page: number) => Promise<void>;
  asyncGetPostAll: () => Promise<void>;
  setPosts: (posts: Post[]) => void;
}>()(
  persist(
    (set) => ({
      post: [] as Post[], // Explicitly type as Post[]
      postExist: false,
      page: 1,
      postAll: [] as Post[], // Explicitly type as Post[]
      postMarker: false,

      // Function to set the postMarker flag
      setPostMarker: (flag) => set(() => ({ postMarker: flag })),

      // Function to clear the current posts
      clearPost: () => set(() => ({ post: [], postExist: false })),

      // Function to clear all posts
      clearPostAll: () => set(() => ({ postAll: [], postExist: false })),

      // Asynchronous function to fetch posts for a specific page
      asyncGetPost: async (page) => {
        const json = await fetch(URL + page).then((response) =>
          response.json()
        );
        set(() => ({ post: json as Post[], postExist: json.length > 0 })); // Ensure the type matches Post[]
      },

      // Asynchronous function to fetch all posts across pages
      asyncGetPostAll: async () => {
        let nowPage = 1;
        let tempPostAll: Post[] = [];
        while (true) {
          const json = await fetch(URL + nowPage).then((response) =>
            response.json()
          );

          if (json.length === 0) {
            set(() => ({
              postAll: tempPostAll,
              postExist: tempPostAll.length > 0,
            }));
            break;
          }
          tempPostAll = [...tempPostAll, ...json];
          nowPage++;
        }
      },

      // Function to set posts directly
      setPosts: (posts: Post[]) => {
        set({
          post: [...posts],
          postExist: posts.length > 0,
        });
      },
    }),
    {
      name: "subletPostStore-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
