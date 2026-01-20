
import { toast } from "react-hot-toast"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useSetRecoilState } from "recoil"
import { StoryAtom , Story} from "../store/atoms/storyAtom"
import { useRouter } from "next/navigation" 





export const  UseStories = () => {

  const router  = useRouter()
  const setStory = useSetRecoilState(StoryAtom)




  // Action for creating 
const CreateStory = async (title: string, description: string,content: string, image?: File ) => {

  try {
    if (typeof window === "undefined") {
      return null;
    }

    const res = await axios.post(
      `${BACKEND_URL}/create`,

      {title,description,content,image},

      {
        headers: {
          Authorization: localStorage.getItem("token"),

          "Content-Type": "multipart/form-data",
        },
      }
    );

    const NewData = {
      StoryId: res.data.id,
      isPublic: res.data.isPublic,
      title: title,
      description: description,
      content: content,
      imageUrl: res.data.imageUrl ?? null,
    };

    setStory((prev) => [NewData, ...prev]);

    toast.success("Created storybook successfully");
    return res.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to create storybook");
    return { success: false };
  }
};

// Action for delete
const DeleteStory = async (Id:string) => {

  try {
    if(typeof window === "undefined"){
      return null
    }

    const res = await axios.delete(`${BACKEND_URL}/delete/${Id}`,
      {
      headers  : {
        Authorization : localStorage.getItem("token")
      }
    })

    setStory((prev)=> prev.filter((s)=> s.StoryId !==Id))
    toast.success("Deleted storybook successfully");
  } catch (error) {
    console.log(error)
    toast.success("Failed to delete storybook ");
  }

}

const UpdateStory = async (id:string , title : string , description : string , content : string) => {
  try {
    if(typeof window === "undefined"){
      return null
    }

    const res = await axios.put(`${BACKEND_URL}/edit/${id}`,
      {title ,description ,content},
      {
      headers  : {
        Authorization : localStorage.getItem("token")
      },
    }
  )

    setStory((prev)=> prev.map((story)=> story.StoryId ===id ? {...story,title,description,content}:story))
   toast.success("Updated storybook successfully");
    router.push("/dashboard")
  } catch (error) {
    console.log(error)
     toast.error("Failed to update storybook");
  }

}


const FeatureStory = async (Id: string) => {
  try {
    if (typeof window === "undefined") {
      return null;
    }

    const res = await axios.put(
      `${BACKEND_URL}/feature/${Id}`,
      {},
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    setStory((prev) =>
      prev.map((s) =>
        s.StoryId === Id
          ? { ...s, isPublic: true }
          : s
      )
    );
     toast.success("Your storybook  live successfully");
  } catch (error) {
    console.log(error);
     toast.success("Failed to share your storybook");
  }
};


return {CreateStory ,DeleteStory ,UpdateStory,FeatureStory}
}