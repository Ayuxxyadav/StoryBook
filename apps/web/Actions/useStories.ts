
import { toast } from "react-hot-toast"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useSetRecoilState } from "recoil"
import { StoryAtom , Story, PublicStoryAtom} from "../store/atoms/storyAtom"
import { useRouter } from "next/navigation" 





export const  UseStories = () => {

  const router  = useRouter()
  const setStory = useSetRecoilState(StoryAtom)
  const publicSetStory = useSetRecoilState(PublicStoryAtom)





  // Action for creating 
const CreateStory = async (
  title: string,
  description: string,
  content: string,
  image?: File
) => {
  try {
    if (typeof window === "undefined") return null;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("content", content);
    if (image) formData.append("image", image);

    const res = await axios.post(
      `${BACKEND_URL}/create`,
      formData,
      {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      }
    );

    const NewData = {
      StoryId: res.data.StoryBookId, 
      title,
      description,
      content,
      isPublic: false,
      imageUrl: res.data.imageUrl ?? null,
    };
  

    setStory((prev) => [NewData, ...prev]);

    toast.success("Created storybook successfully");
    return res.data;

  } catch (error) {
    console.error(error);
    toast.error("Failed to create storybook");
    return null;
  }
};


// Action for delete
const DeleteStory = async (Id: string) => {
  try {
    if (typeof window === "undefined") return null;

    
    await axios.delete(`${BACKEND_URL}/delete/${Id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    
    setStory((prev) => prev.filter((s) => s.StoryId !== Id));

    publicSetStory((prev) => prev.filter((s) => s.StoryId !== Id));

    router.refresh();

    toast.success("Record burned and archives updated!");
  } catch (error) {
    console.error("Delete Error:", error);
    toast.error("Failed to delete the storybook");
  }
};

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
      await axios.put(`${BACKEND_URL}/feature/${Id}`, {}, {
        headers: { Authorization: localStorage.getItem("token") }
      });

      // Dashboard list update: isPublic ko true set karein
      setStory((prev) =>
        prev.map((s) => (s.StoryId === Id ? { ...s, isPublic: true } : s))
      );

      // Public list update: Pura object fetch karke feed mein add karein
      const res = await axios.get(`${BACKEND_URL}/story/${Id}`, {
        headers: { Authorization: localStorage.getItem("token") }
      });
      const s = res.data.story;
      const mapped = {
        StoryId: s.id,
        title: s.Title,
        description: s.Description,
        content: s.Content,
        isPublic: true,
        imageUrl: s.imageUrl
      };

      publicSetStory((prev) => [mapped, ...prev]);
      toast.success("Your story is now Live!");
    } catch (error) {
      toast.error("Failed to share story");
    }
  };


return {CreateStory ,DeleteStory ,UpdateStory,FeatureStory}
}