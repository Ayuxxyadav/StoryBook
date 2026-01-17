


import axios from "axios"
import { BACKEND_URL } from "../config"
import { useSetRecoilState } from "recoil"
import { StoryAtom , Story} from "../store/atoms/storyAtom"
import { useRouter } from "next/navigation" 





export const  UseStories = () => {

  const router  = useRouter()
  const setStory = useSetRecoilState(StoryAtom)



const CreateStory = async (title : string , description : string ,content : string) => {
try {
    const res = await axios.post(`${BACKEND_URL}/create`,{
    title , description , content
  },{
    headers : {
      Authorization : localStorage.getItem("token")
    }
  })
  const NewData = {
    StoryId :res.data.StoryBookId,
    isPublic:res.data.isPublic,
    title : title,
    description : title,
    content : content
  }
  setStory((prev)=> [NewData , ...prev])

  alert ("creted successfully")
  router.push("/dashboard")
} catch (error) {
  console.error(error);
      return { success: false }
}
}


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
const ShareStory = async (id: string) => {
    try {
      if (typeof window === "undefined") return null;

      // Backend ko request bhej rahe hain status badalne ke liye
      const res = await axios.patch(`${BACKEND_URL}/story-place/${id}`, {}, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });

      // Recoil state ko update karna taaki UI par "Public" badge aa sake
      // Note: Iske liye aapki Story interface mein 'isPublic' property honi chahiye
      setStory((prev) => prev.map((story) => 
        story.StoryId === id ? { ...story, isPublic: true } : story
      ));

      alert("🚀 Story shared to StorySpace successfully!");
    } catch (error) {
      console.error("Error sharing story:", error);
      alert("Failed to share story. Try again!");
    }
  }
return {CreateStory ,DeleteStory ,UpdateStory ,ShareStory}
}