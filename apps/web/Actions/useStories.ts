


import axios from "axios"
import { BACKEND_URL } from "../config"
import { useSetRecoilState } from "recoil"
import { StoryAtom , Story} from "../store/atoms/storyAtom"
import { useRouter } from "next/navigation" 





export const  UseStories = () => {

  const router  = useRouter()
  const setStory = useSetRecoilState(StoryAtom)



const CreateStory = async (
  title: string,
  description: string,
  content: string,
  image?: File
) => {
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

    alert("Created successfully");
    return res.data;
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};


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
  } catch (error) {
    console.log(error)
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
    alert("update successfully")
    router.push("/dashboard")
  } catch (error) {
    console.log(error)
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
    alert("Your story live on StoryPlace")
  } catch (error) {
    console.log(error);
  }
};


return {CreateStory ,DeleteStory ,UpdateStory,FeatureStory}
}